import React from 'react';

function EventDetail({ event, onLeaveEvent, onUpdateEvent, onDeleteEvent }) {
	const formattedDate = new Date(event.event_date).toLocaleDateString(
		'ru-RU',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		},
	);

	return (
		<div className="event-detail-container">
			<header className="event-navigation-header">
				<button onClick={onLeaveEvent}>← Назад к карточке</button>
				{' | '}
				<button onClick={() => onUpdateEvent(event)}>
					Редактировать
				</button>
				<button onClick={() => onDeleteEvent(event.id)}>
					Удалить запись
				</button>
			</header>

			<hr />
			<h2>{event.title}</h2>
			<p>
				<strong>Дата события:</strong> {formattedDate}
			</p>
			<p>
				<strong>Описание:</strong>{' '}
				{event.description || 'Описание отсутствует.'}
			</p>
		</div>
	);
}

export default EventDetail;
