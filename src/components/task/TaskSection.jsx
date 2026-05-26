import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function TaskSection() {
	const {
		tasks,
		loadingTasks,
		handleSearchTasks,
		setFormConfig,
		setActiveTask,
	} = useTaskManager();

	return (
		<div className="card-tasks-section">
			<div>
				<span>Поиск задач: </span>
				<TaskFilter onSearchChange={handleSearchTasks} />
				<button
					onClick={() =>
						setFormConfig({ type: 'task', mode: 'create' })
					}
				>
					+ Новая задача
				</button>
			</div>

			<h3>Задачи:</h3>
			{loadingTasks && <p>Загрузка задач...</p>}

			{tasks.length > 0 ? (
				<TaskList
					tasks={tasks}
					onEnterTask={(taskObj) => setActiveTask(taskObj)}
				/>
			) : (
				!loadingTasks && <p>Задач в этой карточке пока нет</p>
			)}
		</div>
	);
}

export default TaskSection;
