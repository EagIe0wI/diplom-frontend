import React from 'react';

function CardFilter({ onSearchChange }) {
  return (
    <input 
      type="text" 
      placeholder="Поиск карточек..." 
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default CardFilter;
