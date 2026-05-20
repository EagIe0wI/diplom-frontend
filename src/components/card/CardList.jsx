import React from 'react';
import '/src/styles/CardList.css';

function CardList({ cards, onEnterCard }) {
	return (
		<ul>
			{cards.map((card) => (
				<li
					key={card.id}
					className="card-list-item"
					onClick={() => onEnterCard(card)}
				>
					<span className="card-list-link">
						{card.title || card.name} ➔
					</span>

					<div>
						Задач внутри:{' '}
						{card.tasks_count !== undefined ? card.tasks_count : 0}
					</div>
				</li>
			))}
		</ul>
	);
}

export default CardList;
