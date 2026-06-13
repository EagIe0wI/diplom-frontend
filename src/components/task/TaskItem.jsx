import React from 'react';

function TaskItem({ task, onEnterTask, onCompleteTask, onPostponeTask }) {
	const isDone = task.status === 'done';

	return (
		<li
			className={`task-list-item ${isDone ? 'task-done' : ''}`}
			onClick={() => onEnterTask(task)}
		>
			<span className="task-list-link">{task.title} ...</span>

			{(onCompleteTask || onPostponeTask) && (
				<div className="options-buttons">
					{onCompleteTask && !isDone && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onCompleteTask(task);
							}}
						>
							Выполнено
						</button>
					)}
					{onPostponeTask && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onPostponeTask(task);
							}}
						>
							{task.status === 'overdue' || !onCompleteTask
								? 'Перенести на завтра'
								: 'Отложить'}
						</button>
					)}
				</div>
			)}
		</li>
	);
}

export default TaskItem;
