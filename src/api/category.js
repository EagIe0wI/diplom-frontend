import api from './axios';

export const categoryAPI = {
	getAll: async (search = '') => {
		let url = '/categories/categories/';
		if (search) {
			url += `?search=${encodeURIComponent(search)}`;
		}
		const response = await api.get(url);
		return response.data;
	},

	create: async (title, description = '') => {
		const response = await api.post('/categories/create/', {
			title,
			description,
		});
		return response.data;
	},

	update: async (id, title, description = '') => {
		const response = await api.put(`/categories/${id}/update/`, {
			title,
			description,
		});
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/categories/${id}/delete/`);
		return response.data;
	},
};
