import api from './axios';

export const taskAPI = {
  getAll: async () => {
    const response = await api.get('/tasks/tasks');
    return response.data;
  },

  create: async (taskData) => {
    const response = await api.post('/tasks/create', taskData);
    return response.data;
  },

  update: async (id, updatedData) => {
    const response = await api.put(`/tasks/${id}/update`, updatedData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}/delete`);
    return response.data;
  }
};
