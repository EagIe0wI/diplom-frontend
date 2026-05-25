import React from 'react';
import CardItem from './CardItem';

function CardList({ cards, onEnterCard }) {
	return (
		<ul className="card-list">
			{cards.map((card) => (
				<CardItem key={card.id} card={card} onEnterCard={onEnterCard} />
			))}
		</ul>
	);
}

export default CardList;
