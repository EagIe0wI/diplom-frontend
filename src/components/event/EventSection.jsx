import React from 'react';
import EventList from './EventList';

// Принимаем onEnterEvent сверху
function EventSection({ events, loadingEvents, onAddEvent, onEnterEvent }) {
	if (loadingEvents) return <div>Загрузка событий...</div>;

	return (
		<div className="card-events-section">
			<div className="events-header">
				<h3>События</h3>
				<button onClick={onAddEvent}>Добавить запись</button>
			</div>

			{events.length === 0 ? (
				<p className="events-empty">Здесь пока ничего не произошло.</p>
			) : (
				<EventList events={events} onEnterEvent={onEnterEvent} />
			)}
		</div>
	);
}

export default EventSection;
