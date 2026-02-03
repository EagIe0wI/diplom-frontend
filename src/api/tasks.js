const url = "http://127.0.0.1:8000/tasks/addTask/";

const addTaskApi = async (data) => {
	const { taskName, deadline } = data;
	const response = await fetch(url, {
		method: "POST",
		// credentials: "include",
		body: JSON.stringify({
			task_name: taskName,
			deadline: deadline,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(response);
};

export default addTaskApi;
