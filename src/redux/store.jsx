import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ingredientsReducer from "./ingredientsSlice";
import orderReducer from "./orderSlice"
export const store = configureStore({
	reducer:{
		ingredients: ingredientsReducer,
		cart: cartReducer,
		order: orderReducer,
	}
});
