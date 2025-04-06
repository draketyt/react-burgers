// @ts-ignore
import  {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
// @ts-ignore
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import OrderModal from "../modal/OrderModal";
import {useState,useMemo} from "react";
import IngredientModal from "../modal/ingredient-modal";
export const AppMain = () => {
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [selectedIngredientId, setSelectedIngredientId] = useState(null);
	const orderId = useMemo(() => Math.floor(Math.random() * 99999 + 1431), []);

	const onIngredientClick = (id) => {
		setSelectedIngredientId(id);
	};

		return (
			<main className="main">
				{isOrderModalOpen && (
					<OrderModal
						orderId={orderId}
						onClose={() => setIsOrderModalOpen(false)}
					/>
				)}

				{selectedIngredientId && (
					<IngredientModal
						ingredientId={selectedIngredientId}
						onClose={() => setSelectedIngredientId(null)}
					/>
				)}

				<IngredientsGroup onIngredientClick={onIngredientClick} />
				<BurgerComposition setIsModalOpen={setIsOrderModalOpen} />
			</main>
	);
};
