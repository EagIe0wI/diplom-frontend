import { useState } from "react";
import addTaskApi from "../api/tasks";

const TaskAddForm = ({ addTask }) => {
	const [userInput, setUserInput] = useState("");
	const [deadline, setDeadline] = useState("");
	const [hasDeadline, setHasDeadline] = useState(false);
	const [hasErrors, setErrors] = useState({
		input: false,
		date: false,
	});

	const handleInput = (e) => {
		setUserInput(e.target.value);
	};

	const handleData = (e) => {
		setDeadline(e.target.value);
	};

	const handleCheckbox = () => {
		setHasDeadline(!hasDeadline);
	};

	const validateErrors = () => {
		const newErrors = {
			input: false,
			date: false,
		};

		if (userInput.length == 0) {
			newErrors.input = true;
		}
		if (hasDeadline && deadline.length == 0) {
			newErrors.date = true;
		}
		setErrors(newErrors);
		return !newErrors.input && !newErrors.date;
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (!validateErrors()) return;

		// здесь отправка данных
		addTaskApi({
			taskname: userInput,
			deadline: deadline,
		});

		addTask(userInput, deadline);
		setUserInput("");
		setDeadline("");
		setHasDeadline(false);
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
