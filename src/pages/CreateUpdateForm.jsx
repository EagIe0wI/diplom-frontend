import React, { useState } from 'react';
import { cardAPI, taskAPI, categoryAPI } from '../api';

const CUForm = ({
	type: initialType,
	mode = 'create',
	initialData = null,
	categories = [],
	activeCard = null,
	onSuccess,
	onCancel,
}) => {
	const [type, setType] = useState(initialType || '');
	const [error, setError] = useState(null);

	// Стейты полей
	const [title, setTitle] = useState(
		mode === 'update' && initialData ? initialData.title || '' : '',
	);
	const [description, setDescription] = useState(
		mode === 'update' && initialData ? initialData.description || '' : '',
	);
	const [categoryId, setCategoryId] = useState(
		mode === 'update' && initialData ? initialData.category || '' : '',
	);
	const [startDate, setStartDate] = useState(
		mode === 'update' && initialData ? initialData.start_date || '' : '',
	);
	const [status, setStatus] = useState(
		mode === 'update' && initialData
			? initialData.status || 'todo'
			: 'todo',
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!title.trim()) {
			setError('Название обязательно для заполнения!');
			return;
		}

		try {
			// --- КАРТОЧКИ ---
			if (type === 'card') {
				if (mode === 'create') {
					if (!categoryId || categoryId === '') {
						setError(
							'Ошибка: Выберите категорию! Карточка не может быть создана без нее.',
						);
						return;
					}
					const cleanCategoryId = Number(categoryId);
					const newCard = await cardAPI.create(
						title,
						description,
						cleanCategoryId,
					);
					onSuccess({ action: 'createCard', data: newCard });
				} else if (mode === 'update') {
					const updatedCard = await cardAPI.update(
						initialData.id,
						title,
					);
					onSuccess({ action: 'updateCard', data: updatedCard });
				}
			}

			// --- КАТЕГОРИИ ---
			else if (type === 'category') {
				if (mode === 'create') {
					const newCategory = await categoryAPI.create(
						title,
						description,
					);
					onSuccess({ action: 'createCategory', data: newCategory });
				}
			}

			// --- ЗАДАЧИ (ТАСКИ) ---
			else if (type === 'task') {
				const formattedDate = startDate === '' ? null : startDate;

				if (mode === 'create') {
					if (!activeCard?.id) {
						setError('Ошибка: Не выбрана активная карточка!');
						return;
					}
					const newTask = await taskAPI.create(
						activeCard.id,
						title,
						formattedDate,
						description,
					);
					onSuccess({ action: 'createTask', data: newTask });
				} else if (mode === 'update') {
					const updatedTask = await taskAPI.update(
						initialData.id,
						title,
						formattedDate,
						status,
						activeCard.id,
						description,
					);
					onSuccess({ action: 'updateTask', data: updatedTask });
				}
			}
		} catch (err) {
			console.error(`Ошибка API (${type} | ${mode}):`, err);

			if (err.response && err.response.data) {
				const serverError = err.response.data;
				setError(
					typeof serverError === 'object'
						? JSON.stringify(serverError)
						: serverError,
				);
			} else {
				setError('Произошла сетевая ошибка при сохранении данных.');
			}
		}
	};

	const renderCardFields = () => (
		<div>
			<div>
				<label>Описание карточки: </label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			{mode === 'create' && (
				<div>
					<label>Категория (Обязательно): </label>
					<select
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						required
					>
						<option value="">-- Выберите --</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.title}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);

	const renderTaskFields = () => (
		<div>
			<div>
				<label>Описание задачи: </label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
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
			{mode === 'update' && (
				<div>
					<label>Статус: </label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="todo">Todo</option>
						<option value="in_progress">In Progress</option>
						<option value="done">Done</option>
					</select>
				</div>
			)}
		</div>
	);

	return (
		<div>
			{!type && mode === 'create' && (
				<div>
					<h3>Что создать?</h3>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value="">-- Выберите --</option>
						<option value="card">Карточку</option>
						<option value="category">Категорию</option>
						{activeCard && <option value="task">Задачу</option>}
					</select>
					<button type="button" onClick={onCancel}>
						Отмена
					</button>
				</div>
			)}

			{type && (
				<form onSubmit={handleSubmit}>
					<h3>{mode === 'create' ? 'Создание' : 'Редактирование'}</h3>

					{error && <div className="form-error">{error}</div>}

					<div>
						<label>Название: </label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					{type === 'card' && renderCardFields()}
					{type === 'task' && renderTaskFields()}

					<div>
						<button type="submit">Сохранить</button>
						<button type="button" onClick={onCancel}>
							Отмена
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CUForm;
