import api from './axios'; 

const loginApi = async (data) => {
	const { username, password } = data;

	const response = await api.post('/accounts/login/', {
		username: username,
		password: password,
	});

	return response.data;
};

export default loginApi;
