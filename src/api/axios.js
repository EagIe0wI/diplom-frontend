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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			if (originalRequest.url.includes('/accounts/token/refresh/')) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				window.location.href = '/login/';
				return Promise.reject(error);
			}

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				try {
					const response = await api.post(
						'/accounts/token/refresh/',
						{
							refresh: refreshToken,
						},
					);

					const newAccessToken = response.data.access;
					localStorage.setItem('access_token', newAccessToken);

					if (response.data.refresh) {
						localStorage.setItem(
							'refresh_token',
							response.data.refresh,
						);
					}

					api.defaults.headers.common['Authorization'] =
						`Bearer ${newAccessToken}`;
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

					processQueue(null, newAccessToken);
					return api(originalRequest);
				} catch (refreshError) {
					processQueue(refreshError, null);
					console.error(
						'Не удалось обновить токен сессии:',
						refreshError,
					);
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh_token');
					window.location.href = '/login/';
					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			}
		}

		return Promise.reject(error);
	},
);

export default api;
