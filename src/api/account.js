import api from './axios';

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	const isAuthRequest =
		config.url.includes('/accounts/register/') ||
		config.url.includes('/login/');
	if (token && !isAuthRequest) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const loginAPI = async (data) => {
	const { username, password } = data;
	const response = await api.post('/accounts/login/', {
		username,
		password,
	});
	if (response.data && response.data.access) {
		localStorage.setItem('access_token', response.data.access);
		localStorage.setItem('refresh_token', response.data.refresh);
	}

	return response.data;
};

export const registerAPI = async (data) => {
	const { username, password } = data;
	const response = await api.post('/accounts/register/', {
		username,
		password,
	});
	if (response.data && response.data.access) {
		localStorage.setItem('access_token', response.data.access);
		localStorage.setItem('refresh_token', response.data.refresh);
	}
	return response.data;
};

export const getUserMeAPI = async () => {
	const response = await api.get('/accounts/me/');
	return response.data;
};

export const logoutAPI = async () => {
	try {
		const refreshToken = localStorage.getItem('refresh_token');
		await api.post('/accounts/logout/', {
			refresh: refreshToken,
		});
	} catch (err) {
		console.error(
			'Ошибка при бане токена на сервере:',
			err.response?.data || err.message,
		);
	} finally {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}
};
