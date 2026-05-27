import React, { useState } from 'react';

function TaskDetail({ task, onLeaveTask, onDeleteTask, onUpdateTask }) {
	const [showTaskOptions, setShowTaskOptions] = useState(false);

	const formattedDate = task.start_date
		? new Date(task.start_date).toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		: 'Дата не указана';

	const statusLabels = {
		todo: 'Запланировано',
		in_progress: 'В процессе',
		done: 'Выполнено',
	};

	return (
		<div>
			<header className="task-navigation-header">
				<button onClick={onLeaveTask}>Назад к задачам</button>
				{' | '}
				<button onClick={() => setShowTaskOptions(!showTaskOptions)}>
					{showTaskOptions ? 'Закрыть меню' : 'Управление задачей'}
				</button>
			</header>
			{showTaskOptions && (
				<div className="task-options-block">
					<span>Действия с задачей: </span>
					<button onClick={() => onUpdateTask(task)}>
						Редактировать задачу
					</button>
					<button onClick={() => onDeleteTask(task.id)}>
						Удалить задачу
					</button>
				</div>
			)}
			<hr />
			<h1>{task.title}</h1>
			<p>
				<strong>Описание:</strong> {task.description || 'Нет описания'}
			</p>
			<p>
				<strong>Статус:</strong>{' '}
				{statusLabels[task.status] || task.status || 'Не указан'}
			</p>
			<p>
				<strong>Дата выполнения:</strong> {formattedDate}
			</p>
			{task.rrule_rule && (
				<p>
					<strong>Повторение (RRule):</strong> {task.rrule_rule}
				</p>
			)}
		</div>
	);
}

export default TaskDetail;
