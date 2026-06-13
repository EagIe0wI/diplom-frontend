import React from 'react';
import TaskList from './TaskList';

function TasksTodayView({
	todayTasks,
	onEnterTodayTask,
	onCompleteTodayTask,
	onPostponeTodayTask,
}) {
	if (!todayTasks || todayTasks.length === 0) {
		return (
			<p className="tasks-empty">На сегодня ничего не запланировано.</p>
		);
	}

	const sortedTasks = [...todayTasks].sort((a, b) => {
		if (a.status === 'done' && b.status !== 'done') return 1;
		if (a.status !== 'done' && b.status === 'done') return -1;
		return 0;
	});

	return (
		<div className="tasks-list-container">
			<h3 className="section-subtitle">
				Необходимо выполнить сегодня ({todayTasks.length}):
			</h3>

			<TaskList
				tasks={sortedTasks}
				onEnterTask={onEnterTodayTask}
				onCompleteTask={onCompleteTodayTask}
				onPostponeTask={onPostponeTodayTask}
			/>
		</div>
	);
}

export default TasksTodayView;
