import React, { useState } from 'react';
import { cardAPI, taskAPI, categoryAPI, eventAPI } from '../api';

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
		mode === 'update' && initialData
			? initialData.start_date || initialData.event_date || ''
			: initialType === 'event'
				? new Date().toISOString().split('T')[0]
				: '',
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
			if (type === 'card') {
				if (mode === 'create') {
					const cleanCategoryId =
						categoryId !== '' ? Number(categoryId) : null;
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
			} else if (type === 'category') {
				if (mode === 'create') {
					const newCategory = await categoryAPI.create(
						title,
						description,
					);
					onSuccess({ action: 'createCategory', data: newCategory });
				} else if (mode === 'update') {
					const updatedCategory = await categoryAPI.update(
						initialData.id,
						title,
						description,
					);
					onSuccess({
						action: 'updateCategory',
						data: updatedCategory,
					});
				}
			} else if (type === 'task') {
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
			} else if (type === 'event') {
				const eventDate =
					startDate === ''
						? new Date().toISOString().split('T')[0]
						: startDate;
				if (mode === 'create') {
					if (!activeCard?.id) {
						setError(
							'Ошибка: Не выбрана активная карточка для события!',
						);
						return;
					}
					const newEvent = await eventAPI.create(
						activeCard.id,
						title,
						eventDate,
						description,
					);
					onSuccess({ action: 'createEvent', data: newEvent });
				} else if (mode === 'update') {
					const updatedEvent = await eventAPI.update(
						initialData.id,
						activeCard.id,
						title,
						eventDate,
						description,
					);
					onSuccess({ action: 'updateEvent', data: updatedEvent });
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
					<label>Категория (Опционально): </label>
					<select
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
					>
						<option value="">-- Без категории --</option>
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
					<label>Статус задачи: </label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="todo">Запланировано</option>
						<option value="in_progress">В процессе</option>
						<option value="done">Выполнено</option>
					</select>
				</div>
			)}
		</div>
	);

	const renderEventFields = () => (
		<div>
			<div>
				<label>Описание события: </label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div>
				<label>Дата события: </label>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
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
						{activeCard && activeCard.id && (
							<option value="task">Задачу</option>
						)}
						{activeCard && activeCard.id && (
							<option value="event">Запись в дневник</option>
						)}
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
					{type === 'event' && renderEventFields()}{' '}
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
