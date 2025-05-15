import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";

export const  IngredientsTabs:FC<IngredientsProps> = ({ activeTab, setActiveTab }) => {
	return (
		<div className="tabs mb-4">
			<Tab value="one" active={activeTab === "one"} onClick={():any => setActiveTab("one")}>
				Булки
			</Tab>
			<Tab value="two" active={activeTab === "two"} onClick={():any => setActiveTab("two")}>
				Соусы
			</Tab>
			<Tab value="three" active={activeTab === "three"} onClick={():any => setActiveTab("three")}>
				Начинки
			</Tab>
		</div>
	);
};
