import React from 'react';
import EventItem from './EventItem';

function EventList({ events, onEnterEvent }) {
	return (
		<ul className="event-list">
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
