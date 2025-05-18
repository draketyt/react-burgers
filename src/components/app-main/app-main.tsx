import  {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import OrderModal from "../modal/OrderModal";
import { useEffect, useState} from "react";
import IngredientModal from "../modal/ingredient-modal";
import {fetchIngredients} from "../../redux/ingredientsSlice";
import {createOrder} from "../../redux/orderSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
export const AppMain:any = ():any => {
	const dispatch = useAppDispatch();
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [selectedIngredientId, setSelectedIngredientId] = useState(null);
	const orderId:any = useAppSelector((state):any => state.order.orderId);
	const isAuthenticated:boolean = useAppSelector((state) :any=> state.auth.isAuthenticated);
	useEffect(():void => {
		dispatch(fetchIngredients());
	}, [dispatch]);
	const handleOrderClick = (ingredientIds: string[]) => {
		dispatch(createOrder(ingredientIds));
	};
	const onIngredientClick:any = (id:any):void => {
		setSelectedIngredientId(id);
	};
		return (

			<main className="main">
				{isOrderModalOpen && (
					<OrderModal
						orderId={orderId}
						onClose={() => setIsOrderModalOpen(false)} order={null} isLoading={false}					/>
				)}

				{selectedIngredientId && (
					<IngredientModal
						key={selectedIngredientId}
						ingredientId={selectedIngredientId}
						onClose={():void => setSelectedIngredientId(null)}
					/>
				)}

				<IngredientsGroup onIngredientClick={onIngredientClick} activeTab setActiveTab={undefined} />
				<BurgerComposition setIsModalOpen={setIsOrderModalOpen} isAuthenticated={isAuthenticated}
								   createOrder={handleOrderClick} i={null}				/>

			</main>

	);
};
