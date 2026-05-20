import api from './axios';

export const cardAPI = {
	getAll: async (search = '') => {
		let url = '/cards/cards/';
		if (search) {
			url += `?search=${encodeURIComponent(search)}`;
		}
		const response = await api.get(url);
		return response.data;
	},

	create: async (title, description = '') => {
		const response = await api.post('/cards/create/', {
			title,
			description,
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
