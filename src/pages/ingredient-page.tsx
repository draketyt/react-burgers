import { FC } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/modal/ingredient-details";
import { useAppSelector} from "../redux/hooks";

export const IngredientDetailsPage: FC = () => {
	const { id } = useParams<{ id: string }>();

	const items:any[] = useAppSelector((state) => state.ingredients.items);
	const loading:boolean = useAppSelector((state) => state.ingredients.isLoading);
	const error :boolean= useAppSelector((state) => state.ingredients.hasError);



	const ingredient:any = items.find((item:{_id:string}) => item._id === id);

	if (loading) return <div className={'loader'}></div>;
	if (error) return <p className="text_type_main-large">Ошибка загрузки ингредиентов</p>;
	if (!ingredient) return <p className="text_type_main-large">Ингредиент не найден</p>;

	return (
		<div className="p-5">
			<IngredientDetails ingredient={ingredient} />
		</div>
	);
};
