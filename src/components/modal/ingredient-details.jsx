import styles from "./modal.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const IngredientDetails = ({ ingredientId }) => {
	const ingredients = useSelector((state) => state.ingredients.items);
	const ingredient = ingredients.find((item) => item._id === ingredientId);

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

IngredientDetails.propTypes = {
	ingredientId: PropTypes.string.isRequired,
};
