import React, { useState } from 'react';

function CategoryList({ categories, setFormConfig, onDeleteCategory }) {
	const [activeMenuId, setActiveMenuId] = useState(null);

	const toggleMenu = (id) => {
		setActiveMenuId(activeMenuId === id ? null : id);
	};

	return (
		<div>
			<h2>Управление категориями</h2>

			<button
				onClick={() =>
					setFormConfig({ type: 'category', mode: 'create' })
				}
			>
				+ Создать категорию
			</button>

			{categories.length === 0 ? (
				<p>Категорий пока нет.</p>
			) : (
				<ul>
					{categories.map((cat) => (
						<li key={cat.id} className="card-list-item">
							<strong className="card-list-link">
								{cat.title}
							</strong>
							{cat.description && ` — ${cat.description}`}
							{' | '}
							<button onClick={() => toggleMenu(cat.id)}>
								{activeMenuId === cat.id ? '✕' : '⚙️'}
							</button>

							{activeMenuId === cat.id && (
								<span className="card-options-block">
									<button
										onClick={() =>
											setFormConfig({
												type: 'category',
												mode: 'update',
												initialData: cat,
											})
										}
									>
										Редактировать
									</button>
									<button
										onClick={() => onDeleteCategory(cat.id)}
									>
										Удалить
									</button>
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default CategoryList;
