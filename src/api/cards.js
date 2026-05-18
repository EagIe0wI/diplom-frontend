import api from './axios';

export const cardAPI = {
	getAll: async () => {
		const response = await api.get('/cards/cards/');
		return response.data;
	},

	create: async (cardData) => {
		const response = await api.post('/cards/create/', cardData);
		return response.data;
	},

	update: async (id, updatedData) => {
		const response = await api.put(`/cards/${id}/update/`, updatedData);
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/cards/${id}/delete/`);
		return response.data;
	}
};
