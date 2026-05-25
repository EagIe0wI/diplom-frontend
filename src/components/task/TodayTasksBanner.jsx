import React from 'react';

function TodayTaskBanner({
	todayTasks,
	onEnterTodayTask,
	onCompleteTodayTask,
	onPostponeTodayTask,
}) {
	if (!todayTasks || todayTasks.length === 0) {
		return null;
	}

	return (
		<div className="today-options-block">
			<h3>Необходимо выполнить сегодня ({todayTasks.length}):</h3>
			<ul>
				{todayTasks.map((task) => (
					<li key={task.id} className="task-list-item">
						<span
							className="task-list-link"
							onClick={() => onEnterTodayTask(task)}
							style={{ cursor: 'pointer' }}
						>
							{task.title} ...
						</span>
						{task.description && ` (${task.description})`}
						{' | '}
						<button onClick={() => onCompleteTodayTask(task)}>
							Выполнено
						</button>
						<button onClick={() => onPostponeTodayTask(task)}>
							Отложить
						</button>
					</li>
				))}
			</ul>
			<hr />
		</div>
	);
}

export default TodayTaskBanner;
