import React from 'react';
import CardFilter from '../components/card/CardFilter';
import CategoryFilter from '../components/category/CategoryFilter';
import CardList from '../components/card/CardList';
import CardDetail from '../components/card/CardDetail';
import TaskDetail from '../components/task/TaskDetail'; // ИСПРАВЛЕНИЕ: Добавили пропущенный импорт!
import CUForm from './CreateUpdateForm';
import { useTaskManager } from '../hooks/useTaskManager';

const TaskManager = () => {
	const {
		cards,
		categories,
		tasks,
		activeCard,
		activeTask,
		setActiveTask, // Теперь хук железно отдаст эту функцию
		loadingCards,
		loadingTasks,
		username,
		formConfig,
		setFormConfig,
		handleLogout,
		handleSearchCards,
		handleCategoryChange,
		handleDeleteCard,
		handleEnterCard,
		handleLeaveCard,
		handleSearchTasks,
		handleDeleteTask,
		handleFormSuccess,
	} = useTaskManager();

	if (formConfig) {
		return (
			<div>
				<button onClick={() => setFormConfig(null)}>← Отмена</button>
				<CUForm
					key={`${formConfig.type}-${formConfig.mode}-${formConfig.initialData?.id || 'new'}`}
					type={formConfig.type}
					mode={formConfig.mode}
					initialData={formConfig.initialData}
					categories={categories}
					activeCard={activeCard}
					onSuccess={handleFormSuccess}
					onCancel={() => setFormConfig(null)}
				/>
			</div>
		);
	}

	if (activeCard && activeTask) {
		return (
			<div>
				<TaskDetail
					task={activeTask}
					onLeaveTask={() => setActiveTask(null)}
					onDeleteTask={async (taskId) => {
						await handleDeleteTask(taskId);
						setActiveTask(null);
					}}
					onUpdateTask={(taskObj) =>
						setFormConfig({
							type: 'task',
							mode: 'update',
							initialData: taskObj,
						})
					}
				/>
			</div>
		);
	}

	if (activeCard) {
		return (
			<div>
				<CardDetail
					tasks={tasks}
					loadingTasks={loadingTasks}
					categories={categories}
					activeCard={activeCard}
					onLeave={handleLeaveCard}
					onSearchTasks={handleSearchTasks}
					onDeleteTask={handleDeleteTask}
					onDeleteCard={handleDeleteCard}
					onAddTask={() =>
						setFormConfig({ type: 'task', mode: 'create' })
					}
					onUpdateCard={() =>
						setFormConfig({
							type: 'card',
							mode: 'update',
							initialData: activeCard,
						})
					}
					onEnterTask={(taskObj) => setActiveTask(taskObj)}
				/>
			</div>
		);
	}

	return (
		<div>
			<header>
				<span>
					Пользователь: <strong>{username}</strong>
				</span>
				<button onClick={handleLogout}>Выйти</button>
			</header>

			<h2>Все карточки</h2>

			<div>
				<CardFilter onSearchChange={handleSearchCards} />
				<CategoryFilter
					categories={categories}
					onCategoryChange={handleCategoryChange}
				/>
				<button
					onClick={() =>
						setFormConfig({ type: null, mode: 'create' })
					}
				>
					+ Создать...
				</button>
			</div>

			{loadingCards && <p>Загрузка карточек...</p>}
			<CardList cards={cards} onEnterCard={handleEnterCard} />
		</div>
	);
};

export default TaskManager;
