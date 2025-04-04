import React, { useEffect, useState } from "react";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// @ts-ignore
import DraggableIngredientItem from './draggable-ingredient-item'
import { useDispatch, useSelector } from "react-redux";
import { SET_BUN,ADD_INGREDIENT} from '../../../../redux/actions/ingredientActions'
import axios from "axios";
const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export const BurgerComposition = () => {
	const dispatch = useDispatch();
	const selectedBun = useSelector((state) => state.cart.selectedBun);
	const selectedIngredients = useSelector((state) => state.cart.selectedIngredients);

	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		axios
			.get(API_URL)
			.then((response) => {
				setIngredients(response.data.data);
			})
			.catch((error) => {
				console.error(`Ошибка: ${error.response ? error.response.status : error.message}`);
			});
	}, []);

	const totalPrice =
		(selectedBun ? selectedBun.price * 2 : 0) +
		selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

	const handleDragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const ingredientId = e.dataTransfer.getData("ingredientId");
		const ingredient = ingredients.find((item) => item._id === ingredientId);

		if (!ingredient) return;

		if (ingredient.type === "bun") {
			console.log(ingredient)
			dispatch(SET_BUN(ingredient));
		}
		else if(ingredient.type==="main"||"sauces"){
			console.log(ingredient)
			dispatch(ADD_INGREDIENT(ingredient));
		}
	};
	const moveIngredient = (fromIndex, toIndex) => {
		dispatch({ type: "MOVE_INGREDIENT",  payload: {fromIndex, toIndex} });
	};



	return (
		<section className="right__panel mt-15 pt-15">
			<div
				className="bunSticky-сontainer custom-scroll"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{selectedBun ? (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${selectedBun.name} (Верх)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image}
					/>
				) : (
					<div className="bunStub top">
            <span className="text_type_main-small">
              <p>Выберите булку</p>
            </span>
					</div>
				)}
			</div>

			<div className="ingredient-container" onDragOver={handleDragOver}
				 onDrop={handleDrop}
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
					<div className="ingredientsStub">
            <span className="text_type_main-small">
              <p>Выберите ингредиенты</p>
            </span>
					</div>
				)}
			</div>

			<div className="bottomBun-container" onDragOver={handleDragOver}
				 onDrop={handleDrop}>
				{selectedBun ? (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${selectedBun.name} (Низ)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image}
					/>
				) : (
					<div className="bunStub bottom">
            <span className="text_type_main-small">
              <p>Выберите булку</p>
            </span>
					</div>
				)}
			</div>

			<div className="order__summary pt-4">
				<div className="price__container mr-10">
					<span className="text text_type_digits-medium pr-2">{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="medium" disabled={totalPrice === 0 ||
					selectedBun=== null || undefined || ''
				}>
					Оформить заказ
				</Button>
			</div>


		</section>
	);
};

export default BurgerComposition;
