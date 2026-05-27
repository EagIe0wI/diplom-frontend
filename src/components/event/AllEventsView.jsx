import React from 'react';
import EventList from './EventList';

function AllEventsView({ allEvents, cards, onEnterEvent }) {
	const groupedEvents = allEvents.reduce((acc, event) => {
		const cardId = event.card;
		if (!acc[cardId]) acc[cardId] = [];
		acc[cardId].push(event);
		return acc;
	}, {});

	return (
		<div className="all-events-tab-view">
			{Object.keys(groupedEvents).map((cardId) => {
				const parentCard = cards.find((c) => c.id === Number(cardId));
				const cardTitle = parentCard
					? parentCard.title
					: `Карточка (ID: ${cardId})`;
				return (
					<div key={cardId} className="card-events-group">
						<h3>{cardTitle}</h3>
						<EventList
							events={groupedEvents[cardId]}
							onEnterEvent={onEnterEvent}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default AllEventsView;
