import api from './axios';

export const eventAPI = {
	getAll: async (cardId) => {
		let url = '/events/events/';
		if (cardId) {
			url += `?card=${cardId}`;
		}
		const response = await api.get(url);
		return response.data;
	},

	create: async (cardId, title, eventDate, description = '') => {
		const response = await api.post('/events/create/', {
			title,
			event_date: eventDate,
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
