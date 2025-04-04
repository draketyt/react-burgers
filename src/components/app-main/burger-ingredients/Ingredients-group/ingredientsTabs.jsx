import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export const  IngredientsTabs = ({ activeTab, setActiveTab }) => {
	return (
		<div className="tabs mb-4">
			<Tab value="one" active={activeTab === "one"} onClick={() => setActiveTab("one")}>
				Булки
			</Tab>
			<Tab value="two" active={activeTab === "two"} onClick={() => setActiveTab("two")}>
				Соусы
			</Tab>
			<Tab value="three" active={activeTab === "three"} onClick={() => setActiveTab("three")}>
				Начинки
			</Tab>
		</div>
	);
};
