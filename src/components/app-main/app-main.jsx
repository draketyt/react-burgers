// @ts-ignore
import  {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
// @ts-ignore
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import OrderModal from "../modal/OrderModal";
import {useEffect, useState} from "react";
import IngredientModal from "../modal/ingredient-modal";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../redux/ingredientsSlice";
export const AppMain = () => {
	const dispatch = useDispatch();
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [selectedIngredientId, setSelectedIngredientId] = useState(null);
	const orderId = useSelector((state) => state.order.orderId);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

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
						key={selectedIngredientId}
						ingredientId={selectedIngredientId}
						onClose={() => setSelectedIngredientId(null)}
					/>
				)}

				<IngredientsGroup onIngredientClick={onIngredientClick} />
				<BurgerComposition setIsModalOpen={setIsOrderModalOpen}
				/>
			</main>
	);
};
