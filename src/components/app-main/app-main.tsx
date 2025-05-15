import  {IngredientsGroup} from "./burger-ingredients/Ingredients-group/Ingredients-group";
import {BurgerComposition} from "./burger-ingredients/burger-composition/burger-composition";
import OrderModal from "../modal/OrderModal";
import {Dispatch, useEffect, useState} from "react";
import IngredientModal from "../modal/ingredient-modal";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../redux/ingredientsSlice";
import {createOrder} from "../../redux/orderSlice";
export const AppMain:any = ():any => {
	const dispatch:Dispatch<any> = useDispatch();
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [selectedIngredientId, setSelectedIngredientId] = useState(null);
	const orderId:any = useSelector((state:any):any => state.order.orderId);
	const isAuthenticated:boolean = useSelector((state:any) :any=> state.auth.isAuthenticated);
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
