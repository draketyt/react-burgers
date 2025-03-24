import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export const BurgerComposition=()=>{
	const [ingredients,setIngredients] = useState([]);

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
	return(

		<section className="right__panel mt-15">
		<div className="bunSticky-сontainer custom-scroll">
			{ingredients.slice(0,1).map((ingredient) => (
				<ConstructorElement
					type="top"
					key={ingredient.id}
					isLocked={true}
					text='Краторная булка N-200i(верх)'
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			))}
		</div>

			<div className="ingredient-container">
				<ul className="order__list">
					{ingredients.filter((ingredients)=> ingredients.type!=='bun').map((ingredient) => (
						<li key={ingredient._id} className="order__item">
							<DragIcon type="primary" />
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</li>
					))}
				</ul>
			</div>

		<div className="bottomBun-container">
			{ingredients.slice(0,1).map((ingredient) => (
				<ConstructorElement
					type="bottom"
					key={ingredient.id}
					isLocked={true}
					text='Краторная булка N-200i(низ)'
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			))}
			{/*order summary*/}
			<div className="order__summary pt-4">
				<div className="price__container mr-10">
					<span className="text text_type_digits-medium pr-2">610</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="medium">
					Оформить заказ
				</Button>
			</div>
		</div>
	</section>)
}