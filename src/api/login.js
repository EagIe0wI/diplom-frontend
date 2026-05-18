// const loginApi = async (data) => {
// 	const { username, password } = data;
// 	const response = await fetch(url, {
// 		method: "POST",
// 		body: JSON.stringify({
// 			username: username,
// 			password: password,
// 		}),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	console.log(response);
// };

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
