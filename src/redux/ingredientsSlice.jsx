import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchIngredients = () => (dispatch) => {
	dispatch(fetchIngredientsRequest());
	axios
		.get("https://norma.nomoreparties.space/api/ingredients")
		.then((res) => {
			dispatch(fetchIngredientsSuccess(res.data.data));
		})
		.catch((err) => {
			dispatch(fetchIngredientsFailed());
			console.error("Ошибка загрузки ингредиентов", err);
		});
};

export default ingredientsSlice.reducer;
