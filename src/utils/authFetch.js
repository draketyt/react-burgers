export const authFetch = async (url, options = {}) => {
	let token = localStorage.getItem("accessToken");

	let res = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization:  token,
			'Content-Type': 'application/json'
		}
	});

	if (res.status === 403 || res.status === 401) {
		const refreshToken = localStorage.getItem("refreshToken");

		const refreshRes = await fetch("https://norma.nomoreparties.space/api/auth/token", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: refreshToken })
		});

		const refreshData = await refreshRes.json();

		if (!refreshData.success) throw new Error("Не удалось обновить токен");

		localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);

		localStorage.setItem("refreshToken", refreshData.refreshToken);
		if (!token) {
			throw new Error("Токен не найден");
		}
		res = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`
			,
				'Content-Type': 'application/json'
			}
		});
	}

	return res;
};
