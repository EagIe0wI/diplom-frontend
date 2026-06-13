import React from 'react';
import TaskList from './TaskList';

function TasksOverdueView({
	overdueTasks,
	onEnterTodayTask,
	onCompleteTodayTask,
	onPostponeTodayTask,
}) {
	return (
		<div className="tasks-list-container">
			<h3 className="section-subtitle overdue-title">
				Просроченные задачи ({overdueTasks.length}):
			</h3>

			<TaskList
				tasks={overdueTasks}
				onEnterTask={onEnterTodayTask}
				onCompleteTask={onCompleteTodayTask}
				onPostponeTask={onPostponeTodayTask}
			/>
		</div>
	);
}

export default TasksOverdueView;
