import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wsOpen, wsError, wsMessage, wsClosed } from '../redux/actions/ws-actions';

interface Order {
    slice(arg0: number, arg1: number): unknown;
	_id: string;
	status: string;
	ingredients: string[];
	createdAt: string;
	updatedAt: string;
	name: string;
	number: number;
}

interface WsOrdersState {
	connected: boolean;
	orders: Order[];
	total: number;
	totalToday: number;
	error: string | null;
}

const initialState: WsOrdersState = {
	connected: false,
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const wsOrdersSlice = createSlice({
	name: 'wsOrders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(wsOpen, (state) => {
				state.connected = true;
				state.error = null;
			})
			.addCase(wsError, (state, action: PayloadAction<Event>) => {
				state.connected = false;
				state.error = 'WebSocket error';
				console.error('WS Error:', action.payload);
			})
			.addCase(wsMessage, (state, action) => {
				const { orders, total, totalToday } = action.payload;
				state.orders = orders;
				state.total = total;
				state.totalToday = totalToday;
			})
			.addCase(wsClosed, (state) => {
				state.connected = false;
			});
	},
});

export const wsOrdersReducer = wsOrdersSlice.reducer;