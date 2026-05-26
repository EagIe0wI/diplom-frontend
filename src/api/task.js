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

	getTodayTasks: () => api.get('tasks/tasks/today/').then((res) => res.data),

	getOverdueTasks: () =>
		api.get('tasks/tasks/overdue/').then((res) => res.data),

	create: async (card, title, startDate, description) => {
		const response = await api.post('/tasks/create/', {
			title,
			start_date: startDate,
			description,
			card: card,
		});
		return response.data;
	},

	update: async (id, title, start_date, status, card, description) => {
		const response = await api.put(`/tasks/${id}/update/`, {
			title,
			start_date,
			status,
			description,
			card: card,
		});
		return response.data;
	},

	delete: async (id) => {
		const response = await api.delete(`/tasks/${id}/delete/`);
		return response.data;
	},
};
