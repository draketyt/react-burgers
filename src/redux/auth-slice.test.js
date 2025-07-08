import authReducer, {
	login,
	logout,
	registerUser,
	verifyUser,
	fetchUserData,
	logoutUser,
} from './auth-slice';

describe('authSlice reducer', () => {
	const user = { name: 'John', email: 'john@mail.com' };

	beforeEach(() => localStorage.clear());

	it('должен вернуть initialState', () => {
		expect(authReducer(undefined, { type: '@@INIT' })).toEqual({
			isAuthenticated: null,
			isAuthLoading: false,
			isResetLoading: false,
			user: null,
			error: null,
			authChecked: false,
		});
	});

	it('обрабатывает login()', () => {
		const state = authReducer(undefined, login(user));
		expect(state).toMatchObject({
			isAuthenticated: true,
			user,
			error: null,
		});
	});

	it('обрабатывает logout()', () => {
		const loggedIn = authReducer(undefined, login(user));
		const state = authReducer(loggedIn, logout());
		expect(state).toMatchObject({
			isAuthenticated: false,
			user: null,
			error: null,
		});
	});

	it('обрабатывает registerUser.pending', () => {
		const state = authReducer(undefined, { type: registerUser.pending.type });
		expect(state.isAuthLoading).toBe(true);
	});

	it('обрабатывает registerUser.fulfilled', () => {
		const payload = { user, accessToken: 'a', refreshToken: 'r' };
		const state = authReducer(
			undefined,
			{ type: registerUser.fulfilled.type, payload }
		);
		expect(state).toMatchObject({
			isAuthLoading: false,
			isAuthenticated: true,
			user,
			error: null,
		});
	});

	it('обрабатывает registerUser.rejected', () => {
		const state = authReducer(
			undefined,
			{ type: registerUser.rejected.type, payload: 'Ошибка' }
		);
		expect(state).toMatchObject({
			isAuthLoading: false,
			error: 'Ошибка',
		});
	});

	it('обрабатывает fetchUserData.fulfilled', () => {
		const payload = { user };
		const state = authReducer(
			undefined,
			{ type: fetchUserData.fulfilled.type, payload }
		);
		expect(state).toMatchObject({
			isAuthLoading: false,
			authChecked: true,
			isAuthenticated: true,
			user,
		});
	});

	it('обрабатывает logoutUser.fulfilled', () => {
		const loggedIn = authReducer(undefined, login(user));
		const state = authReducer(
			loggedIn,
			{ type: logoutUser.fulfilled.type }
		);
		expect(state.isAuthenticated).toBe(false);
		expect(state.user).toBeNull();
	});
});
