import styles from "./modal.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {FC} from "react";
export const IngredientDetails:FC<IngredientDetails>= ({ ingredient: propIngredient }:IngredientDetails) => {
	const { id } = useParams();
	const ingredients: IngredientDetailsTypes["ingredients"] = useSelector((state:IngredientDetailsTypes['state']):any => state.ingredients.items);

	const ingredient:IngredientDetailsTypes['ingredient'] = propIngredient || ingredients.find((item:IngredientDetailsTypes['item']):boolean => item._id === id);

	if (!ingredient) {
		return <p className="text text_type_main-default">Загрузка...</p>;
	}

	return (
		<>
			<img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
			<h2 className="text text_type_main-medium mb-4">{ingredient.name}</h2>
			<div className={styles.nutrients}>
				<div>
					<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Белки, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
				</div>
			</div>
		</>
	);
};

