import React, { useState } from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import EventList from './EventList';
import EventDetail from './EventDetail';

function EventSection() {
	const { events, loadingEvents, setFormConfig, activeCard } =
		useTaskManager();
	const [selectedEvent, setSelectedEvent] = useState(null);

	if (loadingEvents) return <div>Загрузка...</div>;

	return (
		<div className="card-events-section">
			<div className="events-header">
				<h3>События</h3>
				<button
					onClick={() =>
						setFormConfig({
							type: 'event',
							mode: 'create',
							cardId: activeCard.id,
						})
					}
				>
					+ Добавить
				</button>
			</div>

			{events.length === 0 ? (
				<p className="events-empty">Здесь пока ничего не произошло.</p>
			) : (
				<EventList
					events={events}
					onEnterEvent={(event) => setSelectedEvent(event)}
				/>
			)}

			{selectedEvent && (
				<EventDetail
					event={selectedEvent}
					onClose={() => setSelectedEvent(null)}
				/>
			)}
		</div>
	);
}

export default EventSection;
