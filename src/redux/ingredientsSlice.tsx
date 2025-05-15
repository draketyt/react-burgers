import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from './auth-slice'
import {Dispatch} from "react";

const initialState = {
	items: [],
	isLoading: false,
	hasError: false,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		fetchIngredientsRequest: (state) => {
			state.isLoading = true;
			state.hasError = false;
		},
		fetchIngredientsSuccess: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		fetchIngredientsFailed: (state) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
});

export const {
	fetchIngredientsRequest,
	fetchIngredientsSuccess,
	fetchIngredientsFailed,
} = ingredientsSlice.actions;

export const fetchIngredients = () => (dispatch:Dispatch<any>) => {
	dispatch(fetchIngredientsRequest());
	axios
		.get(`${BASE_URL}/api/ingredients`)
		.then((res) => {
			dispatch(fetchIngredientsSuccess(res.data.data));
		})
		.catch((err) => {
			dispatch(fetchIngredientsFailed());
			console.error("Ошибка загрузки ингредиентов", err);
		});
};

export default ingredientsSlice.reducer;
