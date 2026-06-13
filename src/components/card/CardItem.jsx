import React from 'react';

function CardItem({ card, onEnterCard }) {
	const tasksCount = card.tasks_count || 0;
	const eventsCount = card.events_count || 0;

	return (
		<li className="card-list-item" onClick={() => onEnterCard(card)}>
			<span className="card-list-link">{card.title} ...</span>
			<div className="card-item-counters">
				Задач: {tasksCount} &middot; событий: {eventsCount}
			</div>
		</li>
	);
}

export default CardItem;
