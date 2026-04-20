import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import Calendar from "../components/Calendar";
import TaskAddForm from "../components/TaskAddForm";
import TaskList from "../components/TaskList";

// проблема с CSRF токеном

const TaskManager = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		if (!loading) {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}, [tasks]);

	useEffect(() => {
		const data = localStorage.getItem("tasks");
		if (data == "undefined") return;
		setTasks(JSON.parse(data));
		setLoading(false);
	}, []);

	return (
		<>
			<TaskAddForm addTask={addTask}></TaskAddForm>
			<TaskList list={tasks} removeTask={removeTask} changeTask={changeTask}></TaskList>
			<Calendar></Calendar>
		</>
	);
};

export default TaskManager;
