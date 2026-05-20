import React, { useState } from 'react';

function TaskForm({ onSave, onCancel, task }) {
	const [title, setTitle] = useState(task ? task.title : '');
	const [description, setDescription] = useState(
		task ? task.description || '' : '',
	);
	const [startDate, setStartDate] = useState(
		task ? task.start_date || '' : '',
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) {
			alert('Название задачи не может быть пустым');
			return;
		}
		onSave(title, description, startDate);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4>{task ? 'Редактировать задачу' : 'Новая задача'}</h4>

			<div>
				<label>Название: </label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Введите название"
				/>
			</div>

			<div>
				<label>Описание: </label>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Введите описание"
				/>
			</div>

			<div>
				<label>Дата начала: </label>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>

			<br />
			<button type="submit">{task ? 'обновить' : 'сохранить'}</button>
			<button type="button" onClick={onCancel}>
				отменить
			</button>
		</form>
	);
}

export default TaskForm;
