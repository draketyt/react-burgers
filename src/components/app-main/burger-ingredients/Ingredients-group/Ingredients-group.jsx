import {ConstructorElement, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";

 export const IngredientsGroup= () =>{
	 const [current, setCurrent] = useState("one");
	 return(
		 <section className="left__panel">
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
			<p className="text_type_main-large title">Булки</p>
			<div className="grid pt-6">
				<ConstructorElement text="Краторная булка N-200i" price={20} />

				<ConstructorElement text="Краторная булка N-200i" price={20} />
			</div>

			<p className="text_type_main-large title pt-10">Соусы</p>
			<div className="grid pt-6">
				<ConstructorElement text="Соус Spicy-X" price={30} />
			</div>
			<p className="text_type_main-large title pt-10">Начинки</p>
			<div className="grid pt-6">
				<ConstructorElement text="Соус Spicy-X" price={30} />
			</div>
		</div>
	</section>)
}

export default {IngredientsGroup};
