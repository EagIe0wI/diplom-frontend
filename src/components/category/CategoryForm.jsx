import React, { useState } from 'react';

export default function CategoryForm({ onSave, onCancel }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return alert('Введите название категории');
		onSave(title, description);
		setTitle('');
		setDescription('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Новая категория"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="textarea"
				placeholder="Описание"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit">Сохранить категорию</button>
			<button type="button" onClick={onCancel}>
				Отмена
			</button>
		</form>
	);
}
