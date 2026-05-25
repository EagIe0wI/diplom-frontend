import React from 'react';
import CardDetail from '../components/card/CardDetail';
import TaskDetail from '../components/task/TaskDetail';
import CardDashboard from '../components/card/CardDashboard';
import CUForm from './CreateUpdateForm';
import BaseLayout from '../components/BaseLayout';
import { useTaskManager } from '../hooks/useTaskManager';

const TaskManager = () => {
	const {
		cards,
		categories,
		tasks,
		activeCard,
		activeTask,
		setActiveTask,
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
		todayTasks,
		handleCompleteTodayTask,
		handlePostponeTodayTask,
		handleEnterTodayTask,
	} = useTaskManager();

	const renderCurrentScreen = () => {
		if (formConfig) {
			return (
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
			);
		}

		if (activeCard && activeTask) {
			return (
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
			);
		}

		if (activeCard) {
			return (
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
					todayTasks={todayTasks}
					onCompleteTodayTask={handleCompleteTodayTask}
					onPostponeTodayTask={handlePostponeTodayTask}
				/>
			);
		}

		return (
			<CardDashboard
				key={`dashboard-${todayTasks.length}`}
				categories={categories}
				cards={cards}
				loadingCards={loadingCards}
				handleSearchCards={handleSearchCards}
				handleCategoryChange={handleCategoryChange}
				setFormConfig={setFormConfig}
				handleEnterCard={handleEnterCard}
				todayTasks={todayTasks}
				onCompleteTodayTask={handleCompleteTodayTask}
				onPostponeTodayTask={handlePostponeTodayTask}
				onEnterTodayTask={handleEnterTodayTask}
			/>
		);
	};

	return (
		<BaseLayout username={username} handleLogout={handleLogout}>
			{renderCurrentScreen()}
		</BaseLayout>
	);
};

export default TaskManager;
