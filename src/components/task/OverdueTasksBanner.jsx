import React from 'react';

function OverdueTasksBanner({
	overdueTasks,
	onEnterTodayTask,
	onCompleteTodayTask,
	onPostponeTodayTask,
}) {
	if (!overdueTasks || overdueTasks.length === 0) {
		return null;
	}

	return (
		<div className="overdue-banner-block">
			<h3>Просроченные задачи ({overdueTasks.length}):</h3>
			<ul>
				{overdueTasks.map((task) => (
					<li key={task.id} className="task-list-item">
						<span
							className="task-list-link"
							onClick={() => onEnterTodayTask(task)}
							style={{ cursor: 'pointer' }}
						>
							{task.title} ...
						</span>
						{task.start_date && ` (Срок: ${task.start_date})`}
						{' | '}
						<button onClick={() => onCompleteTodayTask(task)}>
							Выполнено
						</button>
						<button onClick={() => onPostponeTodayTask(task)}>
							Перенести на завтра
						</button>
					</li>
				))}
			</ul>
			<hr />
		</div>
	);
}

export default OverdueTasksBanner;
