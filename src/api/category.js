import api from './axios';

export const categoryAPI = {
    getAll: async () => {
        const response = await api.get('/categories/categories/');
        return response.data;
    }
};
