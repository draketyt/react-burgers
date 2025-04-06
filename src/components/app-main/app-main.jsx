// @ts-ignore
import  {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
// @ts-ignore
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import OrderModal from "../modal/OrderModal";
import {useState,useMemo} from "react";
import IngredientModal from "../modal/ingredient-modal";
export const AppMain = () => {
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
	const [selectedIngredientId, setSelectedIngredientId] = useState(null);

	const onIngredientClick = (id) => {
		setSelectedIngredientId(id);
		setIsIngredientModalOpen(true);
	};

		return (
		<main className="main">
			<OrderModal
				orderId={ useMemo(() => {
				return Math.floor(Math.random() * 99999 + 1431);}, [])}
						isOpen={isOrderModalOpen}
						onClose={() => setIsOrderModalOpen(false)} />
			{selectedIngredientId && (
				<IngredientModal
					ingredientId={selectedIngredientId}
					isOpen={isIngredientModalOpen}
					onClose={() => setIsIngredientModalOpen(false)}
				/>
			)}
			<IngredientsGroup onIngredientClick={onIngredientClick} />
			<BurgerComposition setIsModalOpen={setIsOrderModalOpen} />
		</main>
	);
};
