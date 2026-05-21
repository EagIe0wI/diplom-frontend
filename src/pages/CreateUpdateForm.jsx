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

		if (!title.trim()) {
			alert('Название обязательно!');
			return;
		}

		try {
			if (type === 'card') {
				if (mode === 'create') {
					if (!categoryId || categoryId === '') {
						alert('Ошибка: Выберите категорию!');
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
			} else if (type === 'category') {
				if (mode === 'create') {
					const newCategory = await categoryAPI.create(
						title,
						description,
					);
					onSuccess({ action: 'createCategory', data: newCategory });
				}
			} else if (type === 'task') {
				const formattedDate = startDate === '' ? null : startDate;

				if (mode === 'create') {
					if (!activeCard?.id) {
						alert('Ошибка: Не выбрана активная карточка!');
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
			console.error('Ошибка API:', err);
			alert('Произошла ошибка при сохранении данных.');
		}
	};

	// const modeText = mode === 'create' ? 'Создание' : 'Редактирование';
	// const typeText =
	// 	type === 'card'
	// 		? 'карточки'
	// 		: type === 'category'
	// 			? 'категории'
	// 			: 'задачи';

	return (
		<div>
			{!type && mode === 'create' && (
				<div>
					<h3>Что вы хотите создать?</h3>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value="">-- Выберите тип сущности --</option>
						<option value="card">Карточку</option>
						<option value="category">Категорию</option>
						{activeCard && (
							<option value="task">
								Задачу в текущей карточке
							</option>
						)}
					</select>
					<button type="button" onClick={onCancel}>
						Отмена
					</button>
				</div>
			)}

			{type && (
				<>
					<h3>
						{mode === 'create' ? 'Создание' : 'Редактирование'}{' '}
						{type === 'card'
							? 'карточки'
							: type === 'category'
								? 'категории'
								: 'задачи'}
					</h3>

					<form onSubmit={handleSubmit}>
						<div>
							<label>Название: </label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>

						{type !== 'category' && (
							<div>
								<label>Описание: </label>
								<textarea
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
						)}

						{type === 'card' && mode === 'create' && (
							<div>
								<label>Категория (Обязательно): </label>
								<select
									value={categoryId}
									onChange={(e) =>
										setCategoryId(e.target.value)
									}
									required
								>
									<option value="">
										-- Выберите категорию --
									</option>
									{categories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.title}
										</option>
									))}
								</select>
							</div>
						)}

						{type === 'task' && (
							<div>
								<div>
									<label>Дата начала: </label>
									<input
										type="date"
										value={startDate}
										onChange={(e) =>
											setStartDate(e.target.value)
										}
									/>
								</div>
								{mode === 'update' && (
									<div>
										<label>Статус: </label>
										<select
											value={status}
											onChange={(e) =>
												setStatus(e.target.value)
											}
										>
											<option value="todo">
												Порядок (Todo)
											</option>
											<option value="in_progress">
												В процессе
											</option>
											<option value="done">Готово</option>
										</select>
									</div>
								)}
							</div>
						)}

						<div>
							<button type="submit">Сохранить</button>
							<button type="button" onClick={onCancel}>
								Отмена
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default CUForm;
