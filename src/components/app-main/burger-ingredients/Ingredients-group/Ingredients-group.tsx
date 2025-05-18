
import {IngredientsList} from "./ingridients-list";
import {FC} from "react";

export const IngredientsGroup:FC<IngredientsProps> = ({onIngredientClick }) => {

	return (
		<>
		<section className="left__panel">
			<h1 className="text text_type_main-large mb-5 mt-10 left-panel-title">Соберите бургер</h1>
			<IngredientsList onIngredientClick={onIngredientClick}></IngredientsList>
		</section>
		</>
	);
};

export default {IngredientsGroup};
