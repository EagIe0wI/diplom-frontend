import React, { useState } from 'react';
import TaskForm from './TaskForm';

function TaskDetail({ task, onLeaveTask, onDeleteTask, onUpdateTask }) {
    const [isEditing, setIsEditing] = useState(false);

    const statusLabels = {
        todo: "К выполнению (Todo)",
        in_progress: "В процессе",
        done: "Готово",
    };

    const handleDeleteClick = () => {
        const isConfirmed = window.confirm(`Вы уверены, что хотите удалить задачу "${task.title}"?`);
        if (isConfirmed) {
            onDeleteTask(task.id);
        }
    };

    const handleUpdateSave = async (title, description, startDate) => {
        await onUpdateTask(task.id, title, description, startDate, task.status);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
        <TaskForm 
            task={task} 
            onSave={handleUpdateSave} 
            onCancel={() => setIsEditing(false)} 
        />
        );
    }

    return (
        <div>
        <button onClick={onLeaveTask}>вернуться к задачам</button>
        
        <h1>{task.title}</h1>
        
        <button onClick={() => setIsEditing(true)}>редактировать задачу</button>
        <button onClick={handleDeleteClick}>удалить задачу</button>
        
        <p>
            <strong>Описание:</strong> {task.description || 'Нет описания'}
        </p>
        <p>
            <strong>Статус:</strong> {statusLabels[task.status] || task.status || 'Не указан'}
        </p>
        <p>
            <strong>Дата начала:</strong> {task.start_date || 'Не задана'}
        </p>

        {task.rrule_rule && (
            <p>
                <strong>Повторение (RRule):</strong> {task.rrule_rule}
            </p>
        )}
        </div>
    );
}

export default TaskDetail;
