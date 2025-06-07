import {createSlice, createAsyncThunk, AsyncThunk, GetThunkAPI, ActionReducerMapBuilder, Slice} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from './auth-slice'
export const createOrder:AsyncThunk<any, any, any> = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds:any, thunkAPI:GetThunkAPI<any>):Promise<any> => {
		try {
			const response:AxiosResponse<any,any> = await axios.post(
				`${BASE_URL}/api/orders`,
				{ ingredients: ingredientIds },
			);
			return response.data.order.number;
		} catch (error:any) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);


const orderSlice:Slice = createSlice({
	name: 'order',
	initialState: {
		orderId: null,
		loading: false,
		error: null,
		orderData: null,
	},
	reducers: {
		clearOrder: (state:any):void => {
			state.orderId = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder:ActionReducerMapBuilder<any>):void => {
		builder
			.addCase(createOrder.pending, (state:any):void => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state:any, action:any):void => {
				state.loading = false;
				state.orderId = action.payload;
			})
			.addCase(createOrder.rejected, (state:any, action:any):void => {
				state.loading = false;
				state.error = action.payload;
			})

	},
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
