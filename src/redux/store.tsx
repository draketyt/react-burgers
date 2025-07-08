import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ingredientsReducer from "./ingredientsSlice";
import orderReducer from "./orderSlice";
import authReducer from "./auth-slice";
import {socketMiddleware} from "../websockets/socketMiddleware";
import {wsActionsAll, wsActionsProfile} from "./actions/ws-actions";
import {wsOrdersReducer} from '../websockets/wsOrderSlice';
import {wsProfileOrdersReducer} from "../websockets/wsProfileSlice";
const wsUrl ='wss://norma.nomoreparties.space/orders/all'
const wsUrlPrivate = 'wss://norma.nomoreparties.space/orders';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		cart: cartReducer,
		order: orderReducer,
		auth: authReducer,
		wsOrders: wsOrdersReducer,
		wsOrdersProfile: wsProfileOrdersReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
			.concat(socketMiddleware({ wsUrl, wsActions: wsActionsAll }))
			.concat(socketMiddleware({ wsUrl: wsUrlPrivate, wsActions: wsActionsProfile })),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;