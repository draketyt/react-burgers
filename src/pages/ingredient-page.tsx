import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../redux/ingredientsSlice";
import { IngredientDetails } from "../components/modal/ingredient-details";
import { AppDispatch, RootState } from "../redux/store";

export const IngredientDetailsPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();

	const items:any[] = useSelector((state: RootState) => state.ingredients.items);
	const loading:boolean = useSelector((state: RootState) => state.ingredients.isLoading);
	const error :boolean= useSelector((state: RootState) => state.ingredients.hasError);

	useEffect(() => {
		if (items.length === 0) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, items.length]);

	const ingredient:any = items.find((item:{_id:string}) => item._id === id);

	if (loading) return <p className="text_type_main-large">Загрузка...</p>;
	if (error) return <p className="text_type_main-large">Ошибка загрузки ингредиентов</p>;
	if (!ingredient) return <p className="text_type_main-large">Ингредиент не найден</p>;

	return (
		<div className="p-5">
			<IngredientDetails ingredient={ingredient} />
		</div>
	);
};
