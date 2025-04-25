import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clear} from "core-js/internals/task";
import {authFetch} from "@utils/authFetch";
const BASE_URL = 'https://norma.nomoreparties.space'
const initialState = {
	isAuthenticated: false,
	isAuthLoading:false,
	user: null,
	isResetLoading: false,

};
export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, thunkAPI) => {
		const refreshToken = localStorage.getItem('refreshToken');

		if (!refreshToken) {
			return thunkAPI.rejectWithValue("No refresh token");
		}

		try {
			const response = await fetch(`${BASE_URL}/api/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: refreshToken })
			});

			const data = await response.json();

			if (!response.ok || !data.success) {
				return thunkAPI.rejectWithValue(data.message || 'Ошибка при выходе');
			}

			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || 'Ошибка выхода из системы');
		}
	}
);


export const verifyUser = createAsyncThunk(
	'auth/verifyUser',
	async ({ email, password }, thunkAPI) => {
		try {

			const response = await fetch(`${BASE_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',

				},
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
export const getUser = createAsyncThunk(
	'auth/getUser',
	async (_, thunkAPI) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await fetch(`${BASE_URL}/api/auth/user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message);
			return data.user;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);


export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async ({ name, email, password }, thunkAPI) => {
		try {
			const response = await authFetch("https://norma.nomoreparties.space/api/auth/user", {
				method: 'PATCH',
				body: JSON.stringify({ name, email, password })
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.message);
			return data.user;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const refreshToken = createAsyncThunk(
	'auth/refreshToken',
	async (_, thunkAPI) => {
		const refreshToken = localStorage.getItem('refreshToken');
		try {
			const response = await fetch(`${BASE_URL}/api/auth/token`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: refreshToken }),
			});
			const data = await response.json();
			if (!response.ok) return thunkAPI.rejectWithValue(data.message || 'Ошибка обновления токена');

			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);

			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue("Не удалось обновить токен");
		}
	}
);
export const fetchUserData = createAsyncThunk(
	'auth/fetchUserData',
	async (_, thunkAPI) => {
		let accessToken = localStorage.getItem('accessToken');
		try {
			let response = await fetch(`${BASE_URL}/api/auth/user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			});

			if (!response.ok && (response.status === 401 || response.status === 403)) {
				const refresh = await thunkAPI.dispatch(refreshToken()).unwrap();
				accessToken = refresh.accessToken;

				response = await fetch(`${BASE_URL}/api/auth/user`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`
					}
				});
			}

			const data = await response.json();
			if (!response.ok) return thunkAPI.rejectWithValue(data.message || 'Ошибка получения данных пользователя');

			localStorage.setItem('user', JSON.stringify(data.user));
			return { user: data.user };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || 'Ошибка получения данных');
		}
	}
);


export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async (email, thunkAPI) => {
		try {
			const response = await fetch(`${BASE_URL}/api/password-reset`, {
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
export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async ({ password, token }, thunkAPI) => {
		try {

			const response = await fetch(`${BASE_URL}/api/password-reset`, {
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
			const response = await fetch(`${BASE_URL}/api/auth/register`,{
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
);
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.error = null;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.user = null;
			state.error = null;
			localStorage.clear();
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, state => { state.isAuthLoading = true; })
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
				localStorage.setItem('user', JSON.stringify(action.payload.user));
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.error = action.payload;
			})

			.addCase(verifyUser.pending, state => { state.isAuthLoading = true; })
			.addCase(verifyUser.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
				localStorage.setItem('user', JSON.stringify(action.payload.user));
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(verifyUser.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.error = action.payload;
			})

			.addCase(fetchUserData.pending, state => { state.isAuthLoading = true; })
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.isAuthenticated = false;
				state.user = null;
				state.error = action.payload;
			})

			.addCase(refreshToken.rejected, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				state.error = 'Сессия истекла';
				localStorage.clear();
			})

			.addCase(forgotPassword.pending, (state) => { state.isAuthLoading = true; })
			.addCase(forgotPassword.fulfilled, (state) => { state.isAuthLoading = false; })
			.addCase(forgotPassword.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.error = action.payload;
			})

			.addCase(resetPassword.pending, (state) => { state.isAuthLoading = true; })
			.addCase(resetPassword.fulfilled, (state) => { state.isAuthLoading = false; })
			.addCase(resetPassword.rejected, (state, action) => {
				state.isAuthLoading = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				localStorage.clear();
			})
			.addCase(logoutUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				localStorage.clear();
			});
	}
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
