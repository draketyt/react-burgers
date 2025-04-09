// @ts-ignore
import {IngredientsList} from "./ingridients-list";
import PropTypes from "prop-types";

export const IngredientsGroup = ({onIngredientClick }) => {


	return (<>
		<section className="left__panel">
			<h1 className="text text_type_main-large mb-5 mt-10 left-panel-title">Соберите бургер</h1>
			<IngredientsList onIngredientClick={onIngredientClick}></IngredientsList>
		</section>
		</>
	);
};
IngredientsGroup.propTypes = {
	onIngredientClick: PropTypes.func.isRequired,
};
export default {IngredientsGroup};
