import React from 'react';
import { translateRRule } from '../../utils/dateHelpers';

function TaskDetail({ task, onLeaveTask, onDeleteTask, onUpdateTask }) {
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

	const recurrenceText = translateRRule(task.rrule_rule);

	return (
		<div className="card-detail-container">
			<header className="task-navigation-header">
				<button onClick={onLeaveTask} className="back-btn">
					Назад к задачам
				</button>

				<div className="options-buttons">
					<button onClick={() => onUpdateTask(task)}>
						Редактировать задачу
					</button>
					<button
						onClick={() => onDeleteTask(task.id)}
						className="danger-btn"
					>
						Удалить задачу
					</button>
				</div>
			</header>

			<div className="card-info-block" />

			<h2 className="card-detail-title">{task.title}</h2>

			<div className="card-meta">
				<p className="card-description">
					<strong>Описание:</strong>{' '}
					{task.description || 'Нет описания'}
				</p>
				<p>
					<strong>Статус:</strong>{' '}
					{statusLabels[task.status] || task.status || 'Не указан'}
				</p>
				<p>
					<strong>Дата выполнения:</strong> {formattedDate}
				</p>
				<p>
					<strong>Периодичность:</strong> {recurrenceText}
				</p>
			</div>
		</div>
	);
}

export default TaskDetail;
