import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
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
export const IngredientsGroup = () => {
	const [current, setCurrent] = useState("one");
	const [ingredients, setIngredients]= useState([])
 	const buns = ingredients.filter((item) => item.type === "bun");
	const sauces = ingredients.filter((item) => item.type === "sauce");
	const mains = ingredients.filter((item) => item.type === "main");
	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				setIngredients(data.data);
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка ${res.status}`);
			})
	}, []);
	return (
		<section className="left__panel">
			<p className="text text_type_main-large mb-5 mt-10 left-panel-title">Соберите бургер</p>

			<div className={`tabs mb-4`}>
				<Tab value="one" active={current === "one"} onClick={() => setCurrent("one")}>
					Булки
				</Tab>
				<Tab value="two" active={current === "two"} onClick={() => setCurrent("two")}>
					Соусы
				</Tab>
				<Tab value="three" active={current === "three"} onClick={() => setCurrent("three")}>
					Начинки
				</Tab>
			</div>

			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Булки</p>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll">
						{buns.map((item) => (
							<IngredientItem key={item._id} type="bun" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>

			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Соусы</p>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll" >
						{sauces.map((item) => (
							<IngredientItem key={item._id} type="sauce" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>

			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Начинки</p>
				<div className="grid pt-6">
					<ul className="ingredient-items custom-scroll">
						{mains.map((item) => (
							<IngredientItem key={item._id} type="main" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default {IngredientsGroup};
