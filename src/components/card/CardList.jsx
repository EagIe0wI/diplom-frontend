import React from 'react';

function CardList({ cards, onEnterCard }) {
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <span 
            onClick={() => onEnterCard(card)}
          >
            {card.title || card.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CardList;
