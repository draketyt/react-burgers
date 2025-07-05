import {BASE_URL} from "../redux/auth-slice";
export const authFetch = async (url:any, options:any = {}) => {

	let token = localStorage.getItem("accessToken");

	let res = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: ` ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (res.status === 403 || res.status === 401) {
		const refreshToken = localStorage.getItem("refreshToken");

		const refreshRes = await fetch(`${BASE_URL}/api/auth/token`, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: refreshToken }),
		});

		const refreshData = await refreshRes.json();

		if (!refreshData.success) throw new Error("Не удалось обновить токен");

		 localStorage.setItem("accessToken", refreshData.accessToken);
		localStorage.setItem("refreshToken", refreshData.refreshToken);

		token = localStorage.getItem("accessToken");

		res = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: ` ${token}`,
				'Content-Type': 'application/json',
			},
		});
	}

	return res;
};