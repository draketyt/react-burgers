import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ingredientsReducer from "./ingredientsSlice";
import orderReducer from "./orderSlice";
import authReducer from "./auth-slice";
import {socketMiddleware} from "../websockets/socketMiddleware";
import {wsActionsAll} from "./actions/ws-actions";
import {wsOrdersReducer} from '../websockets/wsOrderSlice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		cart: cartReducer,
		order: orderReducer,
		auth: authReducer,
		wsOrders: wsOrdersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(socketMiddleware({
			wsUrl: 'wss://norma.nomoreparties.space/orders/all',
			wsActions: wsActionsAll
		})),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;