import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// @ts-ignore
import { IngredientsTabs } from "./IngredientsTabs";
import {useSelector} from "react-redux";
const API_URL = "https://norma.nomoreparties.space/api/ingredients";

const handleDragStart = (e, ingredient) => {
	if (!ingredient || !ingredient._id) {
		console.error("Ошибка: ingredient не определен", ingredient);
		return;
	}
	e.dataTransfer.setData("ingredientId", ingredient._id);
	e.dataTransfer.effectAllowed = "move";
};

export const IngredientItem = ({ image, price, name, ingredient }) => {
	const selectedBun = useSelector((state) => state.cart.selectedBun);
	const selectedIngredients = useSelector((state) => state.cart.selectedIngredients);
	const count = selectedIngredients.filter((item) => item._id === ingredient._id).length;
	const isBunSelected = selectedBun && selectedBun._id === ingredient._id;
	const bunCount = isBunSelected ? 2 : 0;


	return (
		<>
		<div
			className="ingredient-item ml-5 p-4"
			draggable
			onDragStart={(e) => handleDragStart(e, ingredient)}
		>
			<div>
				{(count > 0 || bunCount > 0) && (
					<Counter count={count + bunCount} size="default" extraClass="m-1 counter" />
				)}
				<img className="ingredient-image" src={image} alt={name} />
			</div>
			<div className="ingredient-price">
				<span className="text text_type_digits-medium pt-4">{price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text_type_main-medium title-name">{name}</p>
		</div>
		</>
	);

};
export const IngredientsList = () => {
	const [ingredients, setIngredients] = useState([]);
	const [activeTab, setActiveTab] = useState("one");

	const containerRef = useRef(null);
	const sectionRefs = {
		one: useRef(null),
		two: useRef(null),
		three: useRef(null),
	};
	const onScroll = () => {
		if (!containerRef.current) return;

		const containerTop = containerRef.current.getBoundingClientRect().top + 100;

		let closestTab = "one";
		let minDistance = Infinity;
		for (const tab in sectionRefs) {
			const ref = sectionRefs[tab];
			if (!ref.current) continue;

			const distance = Math.abs(ref.current.getBoundingClientRect().top - containerTop);
			if (distance < minDistance) {
				minDistance= distance
				closestTab = tab
			}
		}

		setActiveTab(closestTab);
	};
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


	const buns = ingredients.filter((item) => item.type === "bun");
	const sauces = ingredients.filter((item) => item.type === "sauce");
	const mains = ingredients.filter((item) => item.type === "main");

	return (
		<>
			<IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="ingredients custom-scroll" ref={containerRef} onScroll={onScroll}>
				<div id="buns" ref={sectionRefs.one} className="ingredients pt-10">
					<h1 className="text_type_main-large title">Булки</h1>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{buns.map((item) => (
								<IngredientItem key={item._id} image={item.image_large} price={item.price} name={item.name}
												ingredient={item}
								/>
							))}
						</ul>
					</div>
				</div>

				<div id="sauces" ref={sectionRefs.two} className="ingredients pt-10">
					<h1 className="text_type_main-large title">Соусы</h1>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{sauces.map((item) => (
								<IngredientItem key={item._id} image={item.image_large} price={item.price} name={item.name} ingredient={item}
								/>
							))}
						</ul>
					</div>
				</div>

				<div id="mains" ref={sectionRefs.three} className="ingredients pt-10">
					<h1 className="text_type_main-large title">Начинки</h1>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{mains.map((item) => (
								<IngredientItem key={item._id} image={item.image_large} price={item.price} name={item.name}      ingredient={item}
								/>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

