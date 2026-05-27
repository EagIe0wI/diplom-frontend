import api from './axios';

export const eventAPI = {
	getAll: async (cardId = null, search = '') => {
		let url = '/events/events/';
		const params = [];
		if (cardId) params.push(`card=${cardId}`);
		if (search) params.push(`search=${encodeURIComponent(search)}`);
		if (params.length > 0) {
			url += `?${params.join('&')}`;
		}
		const response = await api.get(url);
		return response.data;
	},

	create: async (cardId, title, eventDate, description = '') => {
		const response = await api.post('/events/create/', {
			title,
			date_happened: eventDate,
			description,
			card: cardId,
		});
		return response.data;
	},

	update: async (id, cardId, title, eventDate, description = '') => {
		const response = await api.put(`/events/${id}/update/`, {
			title,
			date_happened: eventDate,
			description,
			card: cardId,
		});
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/events/${id}/delete/`);
		return response.data;
	},
};
