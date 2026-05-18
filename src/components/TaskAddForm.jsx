import { useState } from "react";
import { taskAPI } from '../api/tasks';

const TaskAddForm = ({ cardId, onTaskCreated }) => {
	const [userInput, setUserInput] = useState("");
	const [deadline, setDeadline] = useState("");
	const [hasDeadline, setHasDeadline] = useState(false);
	const [hasErrors, setErrors] = useState({
		input: false,
		date: false,
	});

	const handleInput = (e) => setUserInput(e.target.value);
	const handleData = (e) => setDeadline(e.target.value);
	const handleCheckbox = () => setHasDeadline(!hasDeadline);

	const validateErrors = () => {
		const newErrors = { input: false, date: false };
		if (userInput.trim().length === 0) newErrors.input = true;
		if (hasDeadline && deadline.length === 0) newErrors.date = true;
		setErrors(newErrors);
		return !newErrors.input && !newErrors.date;
	};

	const submitForm = async (e) => {
		e.preventDefault();
		if (!validateErrors()) return;

		try {
			const newTask = await taskAPI.create(
				cardId, 
				userInput, 
				hasDeadline ? deadline : null
			);

			if (onTaskCreated) {
				onTaskCreated(newTask);
			}

			setUserInput("");
			setDeadline("");
			setHasDeadline(false);
		} catch (err) {
			console.error("Ошибка при создании задачи:", err);
			alert("Не удалось сохранить задачу на сервере");
		}
	};

	return (
		<form onSubmit={submitForm}>
			<input
				type="text"
				value={userInput}
				placeholder="Введите задачу"
				onChange={handleInput}
				className={hasErrors.input ? "error" : ""}
			/>
			<input type="checkbox" id="deadline" checked={hasDeadline} onChange={handleCheckbox} />
			{hasDeadline ? (
				<input
					type="date"
					value={deadline}
					onChange={handleData}
					className={hasErrors.date ? "error" : ""}
				/>
			) : (
				<label htmlFor="deadline">Добавить дедлайн </label>
			)}
			<input type="submit" value="Добавить" />
		</form>
	);
};

export default TaskAddForm;
