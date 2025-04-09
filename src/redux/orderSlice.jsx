import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds, thunkAPI) => {
		try {
			const response = await axios.post(
				'https://norma.nomoreparties.space/api/orders',
				{ ingredients: ingredientIds },
			);
			return response.data.order.number;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		orderId: null,
		loading: false,
		error: null,
	},
	reducers: {
		clearOrder: (state) => {
			state.orderId = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.orderId = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
