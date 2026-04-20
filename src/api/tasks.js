const url = "http://127.0.0.1:8000/tasks/addTask/";

const addTaskApi = async (data) => {
	const { taskNameData, deadlineData } = data;
	const response = await fetch(url, {
		method: "POST",
		// credentials: "include",
		body: JSON.stringify({
			task_name: taskNameData,
			deadline: deadlineData,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(response);
};

export default addTaskApi;
