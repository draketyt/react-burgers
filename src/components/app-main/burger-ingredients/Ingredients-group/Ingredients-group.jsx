import { CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";

function IngredientItemBun({ image }) {
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
	const type = {type:'bun'};

	return (

		<div className="ingredient-item">
				<><div>
					<div className="ingredient-image" style={{ backgroundImage: `url(${image})` }} />
				</div>
					<div className="ingredient-price">
						<span className="text text_type_digits-medium  pt-4">1321</span>
						<CurrencyIcon type="primary" />
					</div>
				</>
			<p className="text_type_main-medium title" style={{}}> Краторная булка N-200i</p>
		</div>

	);


}


export const IngredientsGroup= () =>{
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
				__v: 0
			}
		],
	};

	const [current, setCurrent] = useState("one");

	 return(
		 <section className="left__panel ">
		<p className="text text_type_main-large mb-5 mt-10 title">Соберите бургер</p>
		<tabs className={`tabs mb-4`} >
			<Tab value="one" active={current === "one"} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="two" active={current === "two"} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="three" active={current === "three"} onClick={setCurrent}>
				Начинки
			</Tab>
		</tabs>

		<div className="ingredients pt-10 custom-scroll" >
			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Булки</p>
				<div className="grid pt-6">
					<ul className="ingredient-items">
						{ingredients.data.map((item) => (
							<IngredientItemBun key={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>
			{/* создать компонент IngredientItemSauce*/}
			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Cоусы</p>
				<div className="grid pt-6">
					<ul className="ingredient-items">
						{ingredients.data.map((item) => (
							<IngredientItemBun key={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
						))}
					</ul>
				</div>
			</div>
			<div className="ingredients pt-10 custom-scroll">
				<p className="text_type_main-large title">Начинки</p>
				<div className="grid pt-6">
					<ul className="ingredient-items">
						{ingredients.data.map((item) => (
							<IngredientItemBun key={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
						))}

					</ul>
				</div>
			</div>
		</div>
	</section>)
}

export default {IngredientsGroup};
