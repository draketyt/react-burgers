import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ingredientsReducer from "./ingredientsSlice";
import orderReducer from "./orderSlice";
import authReducer from "./auth-slice";

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		cart: cartReducer,
		order: orderReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;