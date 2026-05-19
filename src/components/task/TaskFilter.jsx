import React from 'react';

function TaskFilter({ onSearchChange }) {
  return (
    <input 
      type="text" 
      placeholder="Поиск по названию..." 
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default TaskFilter;
