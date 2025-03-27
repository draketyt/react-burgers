import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
const API_URL = 'https://norma.nomoreparties.space/api/ingredients'
function IngredientItem({ image, price, name }) {
	return (

		<div className="ingredient-item ml-5 p-4">
			<><div>
				<Counter count={1} size="default" extraClass="m-1 counter" />
				<img className="ingredient-image" src={image}  alt={'image'}/>
			</div>
				<div className="ingredient-price">

					<span className="text text_type_digits-medium  pt-4">{price}</span>
					<CurrencyIcon type="primary" />
				</div>
			</>
			<p className="text_type_main-medium title-name">{name}</p>
		</div>

	);

}
export const IngredientsList = ()=>{
	const ingredientsRef = useRef(null);
	const [ingredients, setIngredients]= useState([]);
	const buns = ingredients.filter((item) => item.type === "bun");
	const sauces = ingredients.filter((item) => item.type === "sauce");
	const mains = ingredients.filter((item) => item.type === "main");
	useEffect(() => {
		axios.get(API_URL)
			.then((response) => {
				setIngredients(response.data.data);
			})
			.catch((error) => {
				console.error(`Ошибка: ${error.response ? error.response.status : error.message}`);
			});
	}, []);
	return(
		<>
			<div className="ingredients pt-10 custom-scroll" ref={ingredientsRef}>
				<h1 className="text_type_main-large title">Булки</h1>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll">
						{buns.map((item) => (
							<IngredientItem key={item._id} type="bun" image={item.image_large} price={item.price}
											name={item.name}/>
						))}
					</ul>
				</div>
			</div>
			<div className="ingredients pt-10 custom-scroll" ref={ingredientsRef}>
				<h1 className="text_type_main-large title">Соусы</h1>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll">
						{sauces.map((item) => (
							<IngredientItem key={item._id} type="sauce" image={item.image_large} price={item.price}
											name={item.name}/>
						))}
					</ul>
				</div>
			</div>
			<div className="ingredients pt-10 custom-scroll" ref={ingredientsRef}>
				<h1 className="text_type_main-large title">Начинки</h1>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll">
						{mains.map((item) => (
							<IngredientItem key={item._id} type="main" image={item.image_large} price={item.price}
											name={item.name}/>
						))}
					</ul>
				</div>
			</div>
		</>
);
}