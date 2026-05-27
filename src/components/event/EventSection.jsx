import React from 'react';
import EventList from './EventList';
import EventFilter from './EventFilter';

function EventSection({
	events,
	loadingEvents,
	onAddEvent,
	onSearchEvents,
	onEnterEvent,
}) {
	if (loadingEvents) return <div>Загрузка событий...</div>;

	return (
		<div className="card-events-section">
			<div>
				<span>Поиск задач: </span>
				<EventFilter onSearchChange={onSearchEvents} />
				<button onClick={onAddEvent}>Добавить запись</button>
			</div>

			<h3>События:</h3>

			{events.length === 0 ? (
				<p className="events-empty">Здесь пока ничего не произошло.</p>
			) : (
				<EventList events={events} onEnterEvent={onEnterEvent} />
			)}
		</div>
	);
}

export default EventSection;
