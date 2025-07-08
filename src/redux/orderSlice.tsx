import {createSlice, createAsyncThunk, AsyncThunk, GetThunkAPI, ActionReducerMapBuilder, Slice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from './auth-slice'
export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds, thunkAPI) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/orders`,
				{ ingredients: ingredientIds },
				{
					headers: {
						Authorization: localStorage.getItem('accessToken'),
					},
				}
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
