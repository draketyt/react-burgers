import PropTypes from "prop-types";
import { IngredientDetails } from "./ingredient-details";
import Modal from "./modal";

const IngredientModal = ({ ingredientId, onClose }) => {
	if (!ingredientId) return null;

	return (
		<Modal title="Детали ингредиента" onClose={onClose}>
			<IngredientDetails ingredientId={ingredientId} />
		</Modal>
	);
};

IngredientModal.propTypes = {
	ingredientId: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default IngredientModal;
