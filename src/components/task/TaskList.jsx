import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEnterTask, onCompleteTask, onPostponeTask }) {
	return (
		<ul className="tasks-list-container">
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onEnterTask={onEnterTask}
					onCompleteTask={onCompleteTask}
					onPostponeTask={onPostponeTask}
				/>
			))}
		</ul>
	);
}

export default TaskList;
