import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import Calendar from "../components/Calendar";
import TaskAddForm from "../components/TaskAddForm";
import TaskList from "../components/TaskList";
import { taskAPI } from "../api/tasks";

// const TaskManager = () => {
// 	const [tasks, setTasks] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	const addTask = (text, deadline) => {
// 		const newTask = {
// 			id: uuid4(),
// 			status: "active",
// 			text,
// 			deadline,
// 			tags: [],
// 		};
// 		setTasks([newTask, ...tasks]);
// 	};

// 	const removeTask = (id) => () => {
// 		setTasks(tasks.filter((task) => id !== task.id));
// 	};

// 	const changeTask = (id) => (text, deadline) => {
// 		let changed = false;
// 		const newTasks = tasks.map((task) => {
// 			const newTask = { ...task };
// 			if (id == task.id) {
// 				changed = true;
// 				newTask.text = text;
// 				newTask.deadline = deadline;
// 			}
// 			return newTask;
// 		});
// 		if (changed) setTasks(newTasks);
// 	};

// 	useEffect(() => {
// 		if (!loading) {
// 			localStorage.setItem("tasks", JSON.stringify(tasks));
// 		}
// 	}, [tasks]);

// 	useEffect(() => {
// 		const data = localStorage.getItem("tasks");
// 		if (data == "undefined") return;
// 		setTasks(JSON.parse(data));
// 		setLoading(false);
// 	}, []);

// 	return (
// 		<>
// 			<TaskAddForm addTask={addTask}></TaskAddForm>
// 			<TaskList list={tasks} removeTask={removeTask} changeTask={changeTask}></TaskList>
// 			<Calendar></Calendar>
// 		</>
// 	);
// };

const TaskManager = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		taskAPI.getAll()
			.then((data) => {
				const actualTasks = data.results || data;
				
				if (Array.isArray(actualTasks)) {
					setTasks(actualTasks);
				} else {
					console.error("Бэкенд вернул не массив:", data);
				}
			})
			.catch((err) => {
				console.error("Ошибка при получении задач:", err);
				setError("Не удалось загрузить задачи. Проверьте авторизацию.");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const addTask = (text, deadline) => {
		const newTask = {
			id: uuid4(),
			status: "active",
			text,
			deadline,
			tags: [],
		};
		setTasks([newTask, ...tasks]);
	};

	const removeTask = (id) => () => {
		setTasks(tasks.filter((task) => id !== task.id));
	};

	const changeTask = (id) => (text, deadline) => {
		let changed = false;
		const newTasks = tasks.map((task) => {
			const newTask = { ...task };
			if (id == task.id) {
				changed = true;
				newTask.text = text;
				newTask.deadline = deadline;
			}
			return newTask;
		});
		if (changed) setTasks(newTasks);
	};

	if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Загрузка ваших задач...</div>;

	return (
		<>
			{error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}
			<TaskAddForm addTask={addTask}></TaskAddForm>
			<TaskList list={tasks} removeTask={removeTask} changeTask={changeTask}></TaskList>
			<Calendar></Calendar>
		</>
	);
};

export default TaskManager;
