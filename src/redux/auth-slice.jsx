import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	isAuthLoading:false,
	user: null,
	isResetLoading: false,

};

export const verifyUser = createAsyncThunk(
	'auth/verifyUser',
	async ({ email, password }, thunkAPI) => {
		try {

			const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				return thunkAPI.rejectWithValue(data.message || "Ошибка верификации");
			}

			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message || "Ошибка сети");
		}
	}
);
export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, thunkAPI) => {
		try {
			const token = localStorage.getItem('accessToken');
			const user = localStorage.getItem('user');

			if (token && user) {
				return { user: JSON.parse(user), token };
			} else {
				return thunkAPI.rejectWithValue("No token or user found");
			}
		} catch (e) {
			return thunkAPI.rejectWithValue("Failed to parse user");
		}
	}
);


export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async (email, thunkAPI) => {
		try {
			console.log('aeleal')
			const response = await fetch("https://norma.nomoreparties.space/api/password-reset", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			if (!response.ok) {
				const errorData = await response.json();
				return thunkAPI.rejectWithValue(errorData.message || "Ошибка запроса");
			}
			console.log(response.ok?'aele31al':'zalupa')

			return await response.json();
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || "Ошибка сети");
		}
	}
);
export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async ({ password, token }, thunkAPI) => {
		try {

			const response = await fetch('https://norma.nomoreparties.space/api/password-reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password, token })
			});

			const data = await response.json();

			if (!response.ok) {
				return thunkAPI.rejectWithValue(data.message || "Ошибка запроса");
			}

			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || "Ошибка сети");
		}
	}
);
export const registerUser = createAsyncThunk(
	'auth/register',
	async ([email, password, name],thunkAPI)=>{
		try{
			const response = await fetch('https://norma.nomoreparties.space/api/auth/register',{
				method:'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email,password, name }),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return thunkAPI.rejectWithValue(errorData.message || "Ошибка запроса");
			}

			return  await response.json();
		}

		catch (e){
			return thunkAPI.rejectWithValue(e.message || "Ошибка сети");
		}

	}
); //3h  31m.

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
			.addCase(registerUser.pending, (state) => {
				state.isAuthLoading = true;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isAuthLoading = false;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				localStorage.setItem('user', JSON.stringify(action.payload.user));
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload.user));
				localStorage.setItem('accessToken', action.payload.token);
				localStorage.setItem('refreshToken', action.payload.token);
			})
			.addCase(checkAuth.pending, (state) => {
				state.isAuthLoading = true;
			})
			.addCase(verifyUser.pending, (state) => {
				state.isAuthLoading = true;
				state.error = null;
			})
			.addCase(verifyUser.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.error = action.payload;
			})
			.addCase(verifyUser.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
				localStorage.setItem('user', JSON.stringify(action.payload.user));
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})



			.addCase(checkAuth.rejected, (state) => {
				state.isAuthLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})

			.addCase(resetPassword.pending, (state) => {
				state.isAuthLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isAuthLoading = false;
			})
			.addCase(resetPassword.rejected, (state) => {
				state.isAuthLoading = false;
			})
			.addCase(forgotPassword.pending, (state) => {
				state.isAuthLoading = true;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isAuthLoading = false;
			})
			.addCase(forgotPassword.rejected, (state) => {
				state.isAuthLoading = false;
			})


	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
