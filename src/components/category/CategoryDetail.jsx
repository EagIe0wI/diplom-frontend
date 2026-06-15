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
				<button className="back-btn" onClick={onLeaveCategory}>
					Назад к категориям
				</button>

				<div className="options-buttons">
					<button onClick={() => onUpdateCategory(category)}>
						Редактировать
					</button>
					<button
						className="danger-btn"
						onClick={() => onDeleteCategory(category.id)}
					>
						Удалить категорию
					</button>
				</div>
			</header>

			<div className="card-info-block" />

			<h2 className="card-detail-title">{category.title}</h2>

			<div className="card-meta">
				<p className="card-description">
					<strong>Описание категории: </strong>
					{category.description || 'Описание отсутствует.'}
				</p>
			</div>
		</div>
	);
}

export default CategoryDetail;
