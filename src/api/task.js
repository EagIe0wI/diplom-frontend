import api from './axios';

export const taskAPI = {
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

	getToday: async (date) => {
		const response = await api.get(`/tasks/tasks/today/?date=${date}`);
		return response.data;
	},

	getOverdue: async (date) => {
		const response = await api.get(`/tasks/tasks/overdue/?date=${date}`);
		return response.data;
	},

	create: async (
		cardId,
		title,
		startDate,
		description = '',
		rruleRule = null,
	) => {
		const response = await api.post('/tasks/create/', {
			title,
			start_date: startDate,
			description,
			card: cardId,
			rrule_rule: rruleRule,
		});
		return response.data;
	},

	update: async (
		id,
		title,
		startDate,
		status,
		cardId,
		description = '',
		rruleRule = null,
	) => {
		const response = await api.put(`/tasks/${id}/update/`, {
			title,
			start_date: startDate,
			status,
			card: cardId,
			description,
			rrule_rule: rruleRule,
		});
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/tasks/${id}/delete/`);
		return response.data;
	},
};
