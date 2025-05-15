import React, {Dispatch, FC, useMemo} from "react";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredientItem from './draggable-ingredient-item';
import { useDispatch, useSelector } from "react-redux";
import {SET_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT} from '../../../../redux/actions/ingredientActions';
import { useDrop } from "react-dnd";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {UnknownAction} from "redux";


export const BurgerComposition:FC<BurgerCompProps> = ({setIsModalOpen ,isAuthenticated,createOrder}) => {
	const dispatch:Dispatch<UnknownAction> = useDispatch();
	const selectedBun:any = useSelector((state:any):any => state.cart.selectedBun);
	const selectedIngredients:any = useSelector((state:any):any => state.cart.selectedIngredients);
	const ingredients:any = useSelector((state:any):any => state.ingredients.items);
	const navigate:NavigateFunction = useNavigate();

	const deleteIng:any = (index:any):void => {
		dispatch(REMOVE_INGREDIENT(index));
	};

	const handleOrderClick:any = ():void => {
		if (isAuthenticated) {
			setIsModalOpen(true);

			const ingredientIds:any = [
				selectedBun._id,
				...selectedIngredients.map((item:any) => item._id),
				selectedBun._id,
			];

			 createOrder(ingredientIds);
		} else {
			navigate("/login");
		}
	};
	const totalPrice:number = useMemo(():any => {
		return (
			(selectedBun ? selectedBun.price * 2 : 0) +
			selectedIngredients.reduce((sum:number, ingredient:any):any => sum + ingredient.price, 0)
		);
	}, [selectedBun, selectedIngredients]);

	const [{ isOver: isOverTop }, topBunDropRef] = useDrop({
		accept: "ingredient",
		drop: (item:any):void => {
			const ingredient:any = ingredients.find((i: { _id: any; }):boolean => i._id === item.id);
			if (ingredient && ingredient.type === "bun") {
				dispatch(SET_BUN(ingredient));
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver() && monitor.getItem()?.type !== "main",
		}),
	});

	const [{ isOverMiddle }, middleDropRef] = useDrop({
		accept: "ingredient",
		drop: (item:any):void => {
			if (item.fromConstructor) return;

			const ingredient:any = ingredients.find((i:{_id:any}) => i._id === item.id);
			if (ingredient && (ingredient.type === "main" || ingredient.type === "sauce")) {
				dispatch(ADD_INGREDIENT(ingredient));
			}
		},
		collect: monitor => ({
			isOverMiddle: monitor.isOver(),
		})
	});

	const [{ isOver: isOverBottom }, bottomBunDropRef] = useDrop({
		accept: "ingredient",
		drop: (item:any) => {
			const ingredient = ingredients.find((i:{_id:any}) => i._id === item.id);
			if (ingredient && ingredient.type === "bun") {
				dispatch(SET_BUN(ingredient));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver() && monitor.getItem()?.type !== "main",
		}),
	});

	const moveIngredient:any = (fromIndex:any, toIndex:any):void=> {
			dispatch({ type: "MOVE_INGREDIENT", payload: { fromIndex, toIndex } });
	};

	return (
		<section className="right__panel mt-15 pt-15">

			<div ref={topBunDropRef} className={`bunSticky-сontainer custom-scroll ${isOverTop ? 'hovered' : ''}`}>
				{selectedBun ? (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${selectedBun.name} (Верх)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image}

					/>
				) : (
					<div className={`bunStub top ${isOverTop ? 'hovered' : ''}`}>
						<p className="text_type_main-small">Выберите булку</p>
					</div>
				)}
			</div>

			<div
				ref={middleDropRef}
				className={`ingredient-container ${isOverMiddle ? "hovered" : ""}`}
			>
				{selectedIngredients.length > 0 ? (
					<ul className="order__list">
						{selectedIngredients.map((ingredient:any, index:any) => (
							<DraggableIngredientItem
								key={ingredient._id + index}
								ingredient={ingredient}
								index={index}
								moveIngredient={moveIngredient}
								deleteIng={deleteIng}

							/>
						))}
					</ul>
				) : (
					<div className={`ingredientsStub ${isOverMiddle ? "hovered" : ""}`}>
						<p className="text_type_main-small">Выберите ингредиенты</p>
					</div>
				)}
			</div>

			<div ref={bottomBunDropRef} className={`bottomBun-container ${isOverBottom ? 'hovered' : ''}`}>
				{selectedBun ? (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${selectedBun.name} (Низ)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image}
					/>
				) : (
					<div className={`bunStub bottom ${isOverBottom ? 'hovered' : ''}`}>
						<p className="text_type_main-small">Выберите булку</p>
					</div>
				)}
			</div>

			<div className="order__summary pt-4">
				<div className="price__container mr-10">
					<span className="text text_type_digits-medium pr-2">{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button
					htmlType="button"
					onClick={handleOrderClick}
					type="primary"
					size="medium"
					disabled={ totalPrice=== 0 || !selectedBun||ingredients.length === 0 }
				>{isAuthenticated ? 'Оформить заказ': 'Авторизуйтесь для оформления заказа'}

				</Button>
			</div>



		</section>
	);
};

export default BurgerComposition;
