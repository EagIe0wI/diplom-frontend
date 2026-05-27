import React from 'react';

function CategoryDetail({
	category,
	onLeaveCategory,
	onUpdateCategory,
	onDeleteCategory,
}) {
	return (
		<div className="category-detail-container">
			<header className="category-navigation-header">
				<button onClick={onLeaveCategory}>← Назад к категориям</button>
				{' | '}
				<button onClick={() => onUpdateCategory(category)}>
					Редактировать
				</button>
				<button onClick={() => onDeleteCategory(category.id)}>
					Удалить категорию
				</button>
			</header>

			<hr />
			<h2>{category.title}</h2>
			<p>
				<strong>Описание категории:</strong>{' '}
				{category.description || 'Описание отсутствует.'}
			</p>
		</div>
	);
}

export default CategoryDetail;
