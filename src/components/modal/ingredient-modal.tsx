import { IngredientDetails } from "./ingredient-details";
import Modal from "./modal";
import {FC} from "react";

const IngredientModal:FC<IngredientModalProps> = ({ ingredientId, onClose }:IngredientModalProps) => {
	if (!ingredientId) return null;

	return (
		<Modal title="Детали ингредиента" onClose={onClose}>
			<IngredientDetails ingredientId={ingredientId}/>
		</Modal>
	);
};
export default IngredientModal;
