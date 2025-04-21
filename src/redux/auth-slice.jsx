
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
	isAuthenticated: false,
	isAuthLoading:false,
	user: null,
	isResetLoading: false,

};


export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (email, thunkAPI) => {
		try {
			const response = await fetch(' https://norma.nomoreparties.space/api/password-reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			if (!response.ok) {
				const errorData = await response.json();
				return thunkAPI.rejectWithValue(errorData.message || "Ошибка запроса");
			}

			return await response.json();
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || "Ошибка сети");
		}
	}
);


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(resetPassword.pending, (state) => {
				state.isResetLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isResetLoading = false;
			})
			.addCase(resetPassword.rejected, (state) => {
				state.isResetLoading = false;
			})

	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
