import api from './axios';

export const categoryAPI = {
	getAll: async () => {
		const response = await api.get('/categories/categories/');
		return response.data;
	},

	create: async (title, description = '') => {
		const response = await api.post('/categories/create/', {
			title,
			description,
		});
		return response.data;
	},
};
