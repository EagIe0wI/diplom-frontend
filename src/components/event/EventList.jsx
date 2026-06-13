import React from 'react';
import EventItem from './EventItem';

function EventList({ events, onEnterEvent }) {
	return (
		<ul className="events-list-container">
			{events.map((event) => (
				<EventItem
					key={event.id}
					event={event}
					onEnterEvent={onEnterEvent}
				/>
			))}
		</ul>
	);
}

export default EventList;
