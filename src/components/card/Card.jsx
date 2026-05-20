import React, { useState } from 'react';
import TaskList from '../task/TaskList';
import TaskForm from '../task/TaskForm';
import TaskFilter from '../task/TaskFilter';
import TaskDetail from '../task/TaskDetail';
import CardForm from './CardForm';

function Card({
	tasks,
	loadingTasks,
	onAddTask,
	onSearchTasks,
	onDeleteTask,
	onUpdateTask,
	activeCard,
	onUpdateCard,
	onDeleteCard,
	onLeave,
}) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [activeTask, setActiveTask] = useState(null);
	const [isEditingCard, setIsEditingCard] = useState(false);

	const handleSaveTask = async (title, description, startDate) => {
		await onAddTask(activeCard.id, title, description, startDate);
		setIsFormOpen(false);
	};

	const handleDeleteCardClick = () => {
		const isConfirmed = window.confirm(
			`Вы уверены, что хотите удалить карточку "${activeCard.title || activeCard.name}"?
      Все задания внутри так же будут удалены.`,
		);

		if (isConfirmed) {
			onDeleteCard(activeCard.id);
		}
	};

	const handleCardUpdateSave = async (newTitle) => {
		await onUpdateCard(activeCard.id, newTitle);
		setIsEditingCard(false);
	};

	if (activeTask) {
		return (
			<TaskDetail
				task={activeTask}
				onLeaveTask={() => setActiveTask(null)}
				onDeleteTask={async (taskId) => {
					await onDeleteTask(taskId);
					setActiveTask(null);
				}}
				onUpdateTask={async (
					taskId,
					title,
					description,
					startDate,
					status,
				) => {
					const updated = await onUpdateTask(
						taskId,
						title,
						description,
						startDate,
						status,
					);
					setActiveTask(updated);
				}}
			/>
		);
	}

	if (isEditingCard) {
		return (
			<CardForm
				card={activeCard}
				onSave={handleCardUpdateSave}
				onCancel={() => setIsEditingCard(false)}
			/>
		);
	}

	return (
		<div>
			<button onClick={onLeave}>вернуться к карточкам</button>
			<h2>{activeCard.title || activeCard.name}</h2>

			<div>
				<TaskFilter onSearchChange={onSearchTasks} />
				{!isFormOpen && (
					<button onClick={() => setIsFormOpen(true)}>+</button>
				)}
			</div>

			{isFormOpen && (
				<TaskForm
					onSave={handleSaveTask}
					onCancel={() => setIsFormOpen(false)}
				/>
			)}

			<h3>Задачи:</h3>
			{loadingTasks && <p>Загрузка задач...</p>}

			{tasks.length > 0 ? (
				<TaskList
					tasks={tasks}
					onEnterTask={(task) => setActiveTask(task)}
				/>
			) : (
				!loadingTasks && <p>Задач нет</p>
			)}

			<button onClick={() => setIsEditingCard(true)}>
				редактировать эту карточку
			</button>
			<button onClick={handleDeleteCardClick}>
				удалить эту карточку
			</button>
		</div>
	);
}

export default Card;
