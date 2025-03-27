import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";

export const IngredientsTabs = ()=>{
	const [current, setCurrent] = useState("one")
	const tabsRef = useRef(null)
	return(
	<div className={`tabs mb-4`} ref={tabsRef}>
		<Tab value="one" active={current === "one"} onClick={() => setCurrent("one")}>
			Булки
		</Tab>
		<Tab value="two" active={current === "two"} onClick={() => setCurrent("two")}>
			Соусы
		</Tab>
		<Tab value="three" active={current === "three"} onClick={() => setCurrent("three")}>
			Начинки
		</Tab>
	</div>);
};