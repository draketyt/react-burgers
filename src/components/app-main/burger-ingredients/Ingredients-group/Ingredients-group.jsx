import { CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";

function IngredientItemBun({ image, price, name }) {
	const ingredients = {
		success: true,
		data: [
			{
				_id: "643d69a5c3f7b9001cfa093c",
				name: "Краторная булка N-200i",
				type: "bun",
				price: 988,
				image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
			},
			{
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0,
			},
			{
				_id: "643d69a5c3f7b9001cfa0941",
				name: "Биокотлета из марсианской Магнолии",
				type: "main",
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: "https://code.s3.yandex.net/react/code/meat-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
				__v: 0,
			},
			{
				_id: "643d69a5c3f7b9001cfa093e",
				name: "Филе Люминесцентного тетраодонтимформа",
				type: "main",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/meat-03.png",
				image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
				__v: 0,
			},
			{
				_id: "643d69a5c3f7b9001cfa0942",
				name: "Соус Spicy-X",
				type: "sauce",
				proteins: 30,
				fat: 20,
				carbohydrates: 40,
				calories: 30,
				price: 90,
				image: "https://code.s3.yandex.net/react/code/sauce-02.png",
				image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
				__v: 0,
			},
		],
	};
	return (

		<div className="ingredient-item">
				<><div>
					<div className="ingredient-image" style={{ backgroundImage: `url(${image})` }} />
				</div>
					<div className="ingredient-price">
						<span className="text text_type_digits-medium  pt-4">{price}</span>
						<CurrencyIcon type="primary" />
					</div>
				</>
			<p className="text_type_main-medium title">{name}</p>
		</div>

	);


}


export const IngredientsGroup = () => {
	const [current, setCurrent] = useState("one");

	const ingredients = [
		{
			_id: "643d69a5c3f7b9001cfa093c",
			name: "Краторная булка N-200i",
			type: "bun",
			price: 988,
			image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
		},
		{
			_id: "643d69a5c3f7b9001cfa093d",
			name: "Флюоресцентная булка R2-D3",
			type: "bun",
			price: 988,
			image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
		},
		{
			_id: "643d69a5c3f7b9001cfa0942",
			name: "Соус Spicy-X",
			type: "sauce",
			price: 90,
			image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
		},
		{
			_id: "643d69a5c3f7b9001cfa0941",
			name: "Биокотлета из марсианской Магнолии",
			type: "main",
			price: 424,
			image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
		},{
			"_id": "643d69a5c3f7b9001cfa0947",
			"name": "Плоды Фалленианского дерева",
			"type": "main",
			"proteins": 20,
			"fat": 5,
			"carbohydrates": 55,
			"calories": 77,
			"price": 874,
			"image": "https://code.s3.yandex.net/react/code/sp_1.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
			"__v": 0
		},  {
			"_id": "643d69a5c3f7b9001cfa0945",
			"name": "Соус с шипами Антарианского плоскоходца",
			"type": "sauce",
			"proteins": 101,
			"fat": 99,
			"carbohydrates": 100,
			"calories": 100,
			"price": 88,
			"image": "https://code.s3.yandex.net/react/code/sauce-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
			"__v": 0
		},
	];

	const buns = ingredients.filter((item) => item.type === "bun");
	const sauces = ingredients.filter((item) => item.type === "sauce");
	const mains = ingredients.filter((item) => item.type === "main");

	return (
		<section className="left__panel">
			<p className="text text_type_main-large mb-5 mt-10 title">Соберите бургер</p>

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
					<ul className="ingredient-items">
						{buns.map((item) => (
							<IngredientItemBun key={item._id} type="bun" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>

			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Соусы</p>
				<div className="grid pt-6">
					<ul className="ingredient-items">
						{sauces.map((item) => (
							<IngredientItemBun key={item._id} type="sauce" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>

			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Начинки</p>
				<div className="grid pt-6">
					<ul className="ingredient-items">
						{mains.map((item) => (
							<IngredientItemBun key={item._id} type="main" image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default {IngredientsGroup};
