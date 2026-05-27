import React from 'react';

function TaskItem({ task, onEnterTask }) {
	return (
		<li className="task-list-item" onClick={() => onEnterTask(task)}>
			<span className="task-list-link">{task.title} ...</span>
		</li>
	);
}

export default TaskItem;
