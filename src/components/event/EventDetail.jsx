import React from 'react';

function EventDetail({ event, onLeaveEvent, onUpdateEvent, onDeleteEvent }) {
	const formattedDate = event.date_happened
		? new Date(event.date_happened).toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		: 'Дата не указана';

	return (
		<div className="event-detail-container">
			<header className="task-navigation-header">
				<button onClick={onLeaveEvent} className="back-btn">
					Назад к карточке
				</button>

				<div className="options-buttons">
					<button onClick={() => onUpdateEvent(event)}>
						Редактировать
					</button>
					<button
						onClick={() => onDeleteEvent(event.id)}
						className="danger-btn"
					>
						Удалить запись
					</button>
				</div>
			</header>

			<div className="card-info-block" />

			<h2 className="card-detail-title">{event.title}</h2>

			<div className="card-meta">
				<p>
					<strong>Дата события:</strong> {formattedDate}
				</p>
				<p className="card-description">
					<strong>Описание:</strong>{' '}
					{event.description || 'Описание отсутствует.'}
				</p>
			</div>
		</div>
	);
}

export default EventDetail;
