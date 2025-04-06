// @ts-ignore
import {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
// @ts-ignore
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import PropTypes from "prop-types";
import OrderModal from "../modal/OrderModal";
import {useState} from "react";
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
	};	const [isModalOpen, setIsModalOpen] = useState(false);

	return (

		<main className="main">
			{/*Ingridients*/}
			<OrderModal orderId={51531} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<IngredientsGroup></IngredientsGroup>
			{/*burger composition*/}
			<BurgerComposition setIsModalOpen={setIsModalOpen}></BurgerComposition>
		</main>
	);
};

