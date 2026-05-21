import api from './axios';

export const cardAPI = {
	getAll: async (search = '', categoryId = '') => {
		const response = await api.get('/cards/cards/', {
			params: {
				search: search || undefined,
				category: categoryId || undefined,
			},
		});
		return response.data;
	},

	create: async (title, description = '', categoryId = null) => {
		const response = await api.post('/cards/create/', {
			title,
			description,
			category: categoryId === '' ? null : categoryId,
		});
		return response.data;
	},

	update: async (id, title) => {
		const response = await api.put(`/cards/${id}/update/`, { title });
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/cards/${id}/delete/`);
		return response.data;
	},
};
