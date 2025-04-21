export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const registerUserApi = async ({ name, email, password }) => {
	const res = await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, password })
	});
	return await res.json();
};

export const loginUserApi = async ({ email, password }) => {
	const res = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	});
	return await res.json();
};
