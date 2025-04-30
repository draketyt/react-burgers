import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../redux/ingredientsSlice";
import { IngredientDetails } from "../components/modal/ingredient-details";

export const IngredientDetailsPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const items = useSelector(state => state.ingredients.items);
	const loading = useSelector(state => state.ingredients.isLoading);
	const error = useSelector(state => state.ingredients.hasError);

	useEffect(() => {
		if (items.length === 0) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, items.length]);

	const ingredient = items.find(item => item._id === id);

	if (loading) return <p className="text_type_main-large">Загрузка...</p>;
	if (error) return <p className="text_type_main-large">Ошибка загрузки ингредиентов</p>;
	if (!ingredient) return <p className="text_type_main-large">Ингредиент не найден</p>;

	return (
		<div className="p-5">
			<IngredientDetails ingredient={ingredient} />
		</div>
	);
};
