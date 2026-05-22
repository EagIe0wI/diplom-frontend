import React from 'react';
import TaskItem from './TaskItem';
import '/src/styles/TaskList.css';

function TaskList({ tasks, onEnterTask }) {
	return (
		<ul>
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} onEnterTask={onEnterTask} />
			))}
		</ul>
	);
}

export default TaskList;
