// @ts-ignore
import {IngredientsList} from "./ingridients-list";

export const IngredientsGroup = () => {


	return (<>
		<section className="left__panel">
			<h1 className="text text_type_main-large mb-5 mt-10 left-panel-title">Соберите бургер</h1>
			<IngredientsList></IngredientsList>
		</section>
		</>
	);
};

export default {IngredientsGroup};
