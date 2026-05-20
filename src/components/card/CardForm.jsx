import React, { useState } from 'react';

function CardForm({ onSave, onCancel, card }) {
  const [title, setTitle] = useState(card ? (card.title || card.name) : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Название карточки не может быть пустым");
      return;
    }
    onSave(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>{card ? 'Редактировать карточку' : 'Новая карточка'}</h4>
      <div>
        <label>Название: </label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Название карточки"
        />
      </div>
      <br />
      <button type="submit">{card ? 'обновить' : 'сохранить'}</button>
      <button type="button" onClick={onCancel}>отменить</button>
    </form>
  );
}

export default CardForm;
