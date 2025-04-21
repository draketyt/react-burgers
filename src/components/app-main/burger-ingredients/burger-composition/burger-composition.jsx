import React, { useMemo } from "react";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// @ts-ignore
import DraggableIngredientItem from './draggable-ingredient-item';
import { useDispatch, useSelector } from "react-redux";
import { SET_BUN, ADD_INGREDIENT } from '../../../../redux/actions/ingredientActions';
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { createOrder } from "../../../../redux/orderSlice";


export const BurgerComposition = ({setIsModalOpen }) => {
	const dispatch = useDispatch();
	const selectedBun = useSelector((state) => state.cart.selectedBun);
	const selectedIngredients = useSelector((state) => state.cart.selectedIngredients);
	const ingredients = useSelector((state) => state.ingredients.items);

	const handleOrderClick = () => {
		const ingredientIds = [
			selectedBun._id,
			...selectedIngredients.map((item) => item._id),
			selectedBun._id,
		];
		dispatch(createOrder(ingredientIds));
		setIsModalOpen(true);
	};
	const totalPrice = useMemo(() => {
		return (
			(selectedBun ? selectedBun.price * 2 : 0) +
			selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
		);
	}, [selectedBun, selectedIngredients]);

	const [{ isOver: isOverTop }, topBunDropRef] = useDrop({
		accept: "ingredient",
		drop: (item) => {
			const ingredient = ingredients.find(i => i._id === item.id);
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
		drop: (item) => {
			if (item.fromConstructor) return;

			const ingredient = ingredients.find(i => i._id === item.id);
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
		drop: (item) => {
			const ingredient = ingredients.find(i => i._id === item.id);
			if (ingredient && ingredient.type === "bun") {
				dispatch(SET_BUN(ingredient));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver() && monitor.getItem()?.type !== "main",
		}),
	});

	const moveIngredient = (fromIndex, toIndex) => {
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
						{selectedIngredients.map((ingredient, index) => (
							<DraggableIngredientItem
								key={ingredient._id + index}
								ingredient={ingredient}
								index={index}
								moveIngredient={moveIngredient}
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
					disabled={totalPrice === 0 || !selectedBun|| selectedIngredients.length < 0}
				>
					Оформить заказ
				</Button>
			</div>



		</section>
	);
};
BurgerComposition.propTypes = {
	setIsModalOpen: PropTypes.func.isRequired
};
export default BurgerComposition;
