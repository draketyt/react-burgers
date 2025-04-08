import React, { useMemo, useRef, useState} from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// @ts-ignore
import { IngredientsTabs } from "./IngredientsTabs";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";



export const IngredientItem = ({ image, price, name, ingredient,onIngredientClick }) => {
	const selectedBun = useSelector((state) => state.cart.selectedBun);
	const selectedIngredients = useSelector((state) => state.cart.selectedIngredients);
	const count = selectedIngredients.filter((item) => item._id === ingredient._id).length;
	const isBunSelected = selectedBun && selectedBun._id === ingredient._id;
	const bunCount = isBunSelected ? 2 : 0;

	const [{ isDragging }, drag] = useDrag({
		type: "ingredient",
		item: { id: ingredient._id ,type: ingredient.type},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return (
		<>
		<div
			ref={drag}
			className={`ingredient-item ml-5 p-4 ${isDragging ? "dragging" : ""}`}
			draggable
			onClick={() => onIngredientClick(ingredient._id)}

		>
			<div>
				{(count > 0 || bunCount > 0) && (
					<Counter count={count + bunCount} size={count<10?"default":'small'} extraClass="m-1 counter" />
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
export const IngredientsList = ({onIngredientClick }) => {
	const { items: ingredients, isLoading, hasError } = useSelector((state) => state.ingredients);
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


	const buns =  useMemo(()=>ingredients.filter((item) => item.type === "bun"),[ingredients]);
	const sauces = useMemo(()=>ingredients.filter((item) => item.type === "sauce"),[ingredients]);
	const mains = useMemo(()=>ingredients.filter((item) => item.type === "main"),[ingredients])
	if (isLoading) {
		return <div className="loader" />;
	}

	if (hasError) {
		return <p className="text text_type_main-medium mt-10">Ошибка загрузки. Попробуйте позже.</p>;
	}
	return (

		<>
			<IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="ingredients custom-scroll" ref={containerRef} onScroll={onScroll}>
				<div id="buns" ref={sectionRefs.one} className="ingredients pt-10">
					<p className="text_type_main-large title">Булки</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{buns.map((item) => (
								<li key={item._id}>
								<IngredientItem image={item.image_large} price={item.price} name={item.name}
												ingredient={item} 		onIngredientClick={onIngredientClick}

								/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div id="sauces" ref={sectionRefs.two} className="ingredients pt-10">
					<p className="text_type_main-large title">Соусы</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{sauces.map((item) => (
								<li key={item._id}>
									<IngredientItem image={item.image_large} price={item.price} name={item.name}
													ingredient={item} 		onIngredientClick={onIngredientClick}

									/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div id="mains" ref={sectionRefs.three} className="ingredients pt-10">
					<p className="text_type_main-large title">Начинки</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{mains.map((item) => (
								<li key={item._id}>
									<IngredientItem image={item.image_large} price={item.price} name={item.name}
													ingredient={item} 		onIngredientClick={onIngredientClick}

									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

IngredientItem.propTypes = {
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	ingredient: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		calories: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
	}).isRequired,
	onIngredientClick: PropTypes.func.isRequired,
};