import React, { useState } from "react";
import { ConstructorElement, Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const AppMain = () => {
	const [current, setCurrent] = useState("one");
	const [ingredients, setIngredients] = useState([
		{ id: 2, text: "Соус традиционный галактический", price: 300 },
		{ id: 3, text: "Мясо бессмертных моллюсков Protostomia", price: 300 },
		{ id: 4, text: "Плоды Фалленианского дерева", price: 80 },
		{ id: 5, text: "Хрустящие минеральные кольца", price: 80 },
		{ id: 6, text: "Хрустящие минеральные кольца", price: 80 },
		{ id: 7, text: "Хрустящие минеральные кольца", price: 80 },
		{ id: 8, text: "Хрустящие минеральные кольца", price: 80 },
	]);

	return (
		<main className="main">
			<div className="left__panel">
				<p className="text text_type_main-large mb-5 mt-10 title">Соберите бургер</p>
				<div className="tabs mb-4">
					<Tab value="one" active={current === "one"} onClick={setCurrent}>
						Булки
					</Tab>
					<Tab value="two" active={current === "two"} onClick={setCurrent}>
						Соусы
					</Tab>
					<Tab value="three" active={current === "three"} onClick={setCurrent}>
						Начинки
					</Tab>
				</div>

				<div className="ingredients pt-10">
					<p className="text_type_main-large title">Булки</p>
					<div className="grid pt-6">
						<ConstructorElement text="Краторная булка N-200i" price={20} />
						<ConstructorElement text="Флуоресцентная булка R2-D3" price={20} />
					</div>

					<p className="text_type_main-large title pt-10">Соусы</p>
					<div className="grid pt-6">
						<ConstructorElement text="Соус Spicy-X" price={30} />
						<ConstructorElement text="Соус фирменный Space Sauce" price={30} />
					</div>
				</div>
			</div>

			<div className="right__panel mt-15">
				<div className="sticky__container">
					<ConstructorElement
						type="top"
						isLocked={true}
						text="Краторная булка N-200i (верх)"
						price={20}
					/>
				</div>

				<div className="ingredient-container">
					<ul className="order__list">
						{ingredients.map((ingredient) => (
							<ConstructorElement
								key={ingredient.id}
								type={ingredient.type}
								text={ingredient.text}
								price={ingredient.price}
							/>
						))}
					</ul>
				</div>

				<div className="bottom__sticky-container">
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text="Краторная булка N-200i (низ)"
						price={20}
					/>

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
			</div>
		</main>
	);
};
