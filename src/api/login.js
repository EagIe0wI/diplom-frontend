const url = "http://127.0.0.1:8000/login/";

const loginApi = async (data) => {
	const { username, password } = data;
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			username: username,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(response);
};

export default loginApi;
