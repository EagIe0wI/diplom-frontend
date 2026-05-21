import React, { useState } from 'react';

function CardForm({ onSave, onCancel, card, categories = [] }) {
	const [title, setTitle] = useState(card ? card.title : '');
	const [description, setDescription] = useState(
		card ? card.description : '',
	);
	const [categoryId, setCategoryId] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return alert('Заполните название карточки');
		onSave(title, description, categoryId);
		setTitle('');
		setDescription('');
		setCategoryId('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4>{card ? 'Редактировать карточку' : 'Новая карточка'}</h4>
			<div>
				<label>Название: </label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Название карточки"
				/>
				<input
					type="textarea"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Описание"
				/>
				<select
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option value="">Выберите категорию</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.title}
						</option>
					))}
				</select>
			</div>
			<br />
			<button type="submit">{card ? 'обновить' : 'сохранить'}</button>
			<button type="button" onClick={onCancel}>
				отменить
			</button>
		</form>
	);
}

export default CardForm;
