import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		const isAuthRequest =
			config.url.includes('/accounts/register/') ||
			config.url.includes('/accounts/login/');
		if (token && !isAuthRequest) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			console.warn(
				'Сессия устарела (401). Очистка токенов и редирект...',
			);
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

export default api;
