import React from 'react';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function TaskSection({
	tasks,
	loadingTasks,
	onSearchTasks,
	onAddTask,
	onEnterTask,
}) {
	return (
		<div className="card-tasks-section">
			<div>
				<span>Поиск задач: </span>
				<TaskFilter onSearchChange={onSearchTasks} />

				<button onClick={onAddTask}>Новая задача</button>
			</div>

			<h3>Задачи:</h3>
			{loadingTasks && <p>Загрузка задач...</p>}

			{tasks.length > 0 ? (
				<TaskList tasks={tasks} onEnterTask={onEnterTask} />
			) : (
				!loadingTasks && <p>Задач в этой карточке пока нет</p>
			)}
		</div>
	);
}

export default TaskSection;
