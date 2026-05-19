import api from './axios';

export const taskAPI = {
	// getAll: async (cardId = null) => {
	// 	let url = '/tasks/tasks/';
	// 	if (cardId) {
	// 		url += `?card=${cardId}`;
	// 	}
	// 	const response = await api.get(url);
	// 	return response.data;
	// },
	getAll: async (cardId = null, search = '') => {
		let url = '/tasks/tasks/';
		const params = [];
		if (cardId) params.push(`card=${cardId}`);
		if (search) params.push(`search=${encodeURIComponent(search)}`);
		
		if (params.length > 0) {
			url += `?${params.join('&')}`;
		}
		const response = await api.get(url);
		return response.data;
	},

	create: async (card, title, deadline) => {
		const response = await api.post('/tasks/create/', {
			title,
			deadline,
			card: card
		});
		return response.data;
	},

	update: async (id, title, deadline, status, card) => {
		const response = await api.put(`/tasks/${id}/update/`, {
			title,
			deadline,
			status,
			card: card
		});
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/tasks/${id}/delete/`);
		return response.data;
	}
};
