import React from 'react';
import Task from './Task';
import '/src/styles/TaskList.css';

function TaskList({ tasks, onEnterTask }) {
	return (
		<ul style={{ paddingLeft: 0 }}>
			{tasks.map((task) => (
				<Task key={task.id} task={task} onEnterTask={onEnterTask} />
			))}
		</ul>
	);
}

export default TaskList;
