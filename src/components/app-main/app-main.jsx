// @ts-ignore
import {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
// @ts-ignore
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import PropTypes from "prop-types";
export const AppMain = () => {
	AppMain.propTypes = {
		ingredients: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				text: PropTypes.string.isRequired,
				price: PropTypes.number.isRequired,
				thumbnail: PropTypes.string.isRequired,
			})
		),
	};
	return (
		<main className="main">
			{/*Ingridients*/}
			<IngredientsGroup></IngredientsGroup>
			{/*burger composition*/}
			<BurgerComposition></BurgerComposition>
		</main>
	);
};

