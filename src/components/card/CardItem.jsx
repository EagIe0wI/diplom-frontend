import React from 'react';

function CardItem({ card, onEnterCard }) {
	return (
		<li className="card-list-item" onClick={() => onEnterCard(card)}>
			<span className="card-list-link">{card.title} ...</span>
		</li>
	);
}

export default CardItem;
