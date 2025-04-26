
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {IngredientDetails} from "../components/modal/ingredient-details";
import  styles from '../utils/ingregients-page.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
export const IngredientPage = () => {
	const navigate = useNavigate();
	const handleCancel= e=>{
		e.preventDefault();
		navigate(-1);
	}
	const { id } = useParams();
	const ingredients = useSelector((state) => state.ingredients.items);

	const ingredient = ingredients.find((item) => item._id === id);

	if (!ingredient) {
		return <p className="text text_type_main-large mt-10">Ингредиент не найден...</p>;
	}

	return (
		<div className={styles.main}>
			<h1 className="text text_type_main-large">Детали ингредиента</h1>
			<IngredientDetails ingredientId={id} />
			<Button htmlType={"button"} type="secondary" size="large" onClick={handleCancel}>← Назад</Button>

		</div>
	);
};
