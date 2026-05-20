import React from 'react';
import '/src/styles/CardList.css';

function CardList({ cards, onEnterCard }) {
  return (
    <ul style={{ paddingLeft: 0 }}> {/* Очищаем дефолтный отступ списка */}
      {cards.map((card) => (
        <li 
          key={card.id}
          className="card-list-item"
          onClick={() => onEnterCard(card)} 
        >
          <span className="card-list-link">
            {card.title || card.name} ➔
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CardList;
