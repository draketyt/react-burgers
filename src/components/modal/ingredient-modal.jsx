import React, { useEffect, useState } from 'react';
import styles from './ingredient-modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import axios from "axios";

const IngredientModal = ({ ingredientId, isOpen, onClose }) => {
	const [ingredient, setIngredient] = useState(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (isOpen && ingredientId) {
			axios.get(`https://norma.nomoreparties.space/api/ingredients`)
				.then((res) => {
					const found = res.data.data.find((item) => item._id === ingredientId);
					setIngredient(found);
					setVisible(true);
				})
				.catch((err) => console.error("Ошибка при загрузке ингредиента:", err));
		} else {

			setVisible(false);
		}
	}, [ingredientId, isOpen]);


	if (!isOpen && !visible) return null;

	const handleClose = () => {
		setVisible(false);
		setTimeout(onClose, 300);
	};

	return (
		<div className={`${styles.overlay} ${visible ? styles.open : styles.closed}`} onClick={handleClose}>
			<div className={`${styles.modal} ${visible ? styles.open : styles.closed}`} onClick={(e) => e.stopPropagation()}>
				<button className={styles.modal__close} onClick={handleClose}>
					<CloseIcon type="primary" />
				</button>
				{ingredient && (
					<>
						<h2 className="text text_type_main-large mb-4">{ingredient.name}</h2>
						<img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
						<div className={styles.nutrients}>
							<div>
								<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
								<p className="text text_type_digits-default">{ingredient.calories}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Белки, г</p>
								<p className="text text_type_digits-default">{ingredient.proteins}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
								<p className="text text_type_digits-default">{ingredient.fat}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
								<p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default IngredientModal;
