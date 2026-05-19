import React, { useState } from 'react';
import TaskList from '../task/TaskList';
import TaskForm from '../task/TaskForm';
import TaskFilter from '../task/TaskFilter';

function Card({ activeCard, tasks, loadingTasks, onLeave, onAddTask, onSearchTasks }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveTask = async (title, deadline) => {
    await onAddTask(activeCard.id, title, deadline);
    setIsFormOpen(false);
  };

  return (
    <div>
      <button onClick={onLeave}>вернуться к карточкам</button>
      
      <h2>{activeCard.title || activeCard.name}</h2>
      
      <div>
        <TaskFilter onSearchChange={onSearchTasks} />
        
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)}>+</button>
        )}
      </div>

      {/* Форма создания, если открыта */}
      {isFormOpen && (
        <TaskForm 
          onSave={handleSaveTask} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      <h3>Задачи:</h3>
      {loadingTasks && <p>Загрузка задач...</p>}
      
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        !loadingTasks && <p>Задач нет</p>
      )}
    </div>
  );
}

export default Card;
