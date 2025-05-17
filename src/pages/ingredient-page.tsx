import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../redux/ingredientsSlice";
import { IngredientDetails } from "../components/modal/ingredient-details";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export const IngredientDetailsPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();

	const items:any[] = useAppSelector((state) => state.ingredients.items);
	const loading:boolean = useAppSelector((state) => state.ingredients.isLoading);
	const error :boolean= useAppSelector((state) => state.ingredients.hasError);

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
