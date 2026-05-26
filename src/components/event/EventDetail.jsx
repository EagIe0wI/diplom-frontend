import React from 'react';

function EventDetail({ event, onClose }) {
	if (!event) return null;

	const formattedDate = new Date(event.event_date).toLocaleDateString(
		'ru-RU',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		},
	);

	return (
		<div className="event-detail-modal">
			<div className="event-detail-box">
				<div className="event-detail-header">
					<h3>Просмотр события</h3>
					<button className="btn-close-detail" onClick={onClose}>
						×
					</button>
				</div>
				<div className="event-detail-body">
					<p className="event-detail-date">
						<strong>Дата:</strong> {formattedDate}
					</p>
					<p className="event-detail-title">
						<strong>Название:</strong> {event.title}
					</p>
					<p className="event-detail-desc">
						<strong>Описание:</strong>
					</p>
					<div className="event-detail-desc-text">
						{event.description || 'Описание отсутствует.'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventDetail;
