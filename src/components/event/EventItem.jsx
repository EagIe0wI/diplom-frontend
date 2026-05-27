import React from 'react';

function EventItem({ event, onEnterEvent }) {
	return (
		<li className="event-list-item" onClick={() => onEnterEvent(event)}>
			<span className="event-list-link">{event.title} ...</span>
		</li>
	);
}

export default EventItem;
