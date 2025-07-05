
import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	WS_ORDERS_ON_OPEN,
	WS_ORDERS_ON_CLOSE,
	WS_ORDERS_ON_ERROR,
	WS_ORDERS_ON_MESSAGE
} from '../redux/actions/ws-actions';

interface Order {
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

export const wsProfileOrdersSlice = createSlice({
	name: 'wsProfileOrders',
	initialState,
	reducers: {},
	extraReducers: (builder:ActionReducerMapBuilder<WsOrdersState>|any) => {
		builder
			.addCase(WS_ORDERS_ON_OPEN, (state:any) => {
				state.connected = true;
				state.error = null;
			})
			.addCase(WS_ORDERS_ON_ERROR, (state:any, action: PayloadAction<any>) => {
				state.connected = false;
				state.error = typeof action.payload === 'string' ? action.payload : 'WebSocket error';
			})
			.addCase(WS_ORDERS_ON_MESSAGE, (state:any, action: PayloadAction<any>) => {
				const { orders, total, totalToday } = action.payload;
				state.orders = orders;
				state.total = total;
				state.totalToday = totalToday;
			})
			.addCase(WS_ORDERS_ON_CLOSE, (state:any) => {
				state.connected = false;
			});
	},
});

export const wsProfileOrdersReducer = wsProfileOrdersSlice.reducer;
