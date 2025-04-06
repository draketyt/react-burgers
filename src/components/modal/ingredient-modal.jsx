import React, { useEffect, useState } from 'react';
import Modal from "./modal";
import PropTypes from "prop-types";
import axios from "axios";
import styles from './modal.module.css';

const IngredientModal = ({ ingredientId, onClose }) => {
	const [ingredient, setIngredient] = useState(null);

	useEffect(() => {
		if (ingredientId) {
			axios.get(`https://norma.nomoreparties.space/api/ingredients`)
				.then((res) => {
					const found = res.data.data.find((item) => item._id === ingredientId);
					setIngredient(found);
				})
				.catch((err) => console.error("Ошибка при загрузке ингредиента:", err));
		}
	}, [ingredientId]);

	if (!ingredient) return null;

	return (
		<Modal title="Детали ингредиента" onClose={onClose}>
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
		</Modal>
	);
};

IngredientModal.propTypes = {
	ingredientId: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};

export default IngredientModal;
