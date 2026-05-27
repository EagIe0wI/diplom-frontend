import React from 'react';
import CardFilter from '../components/card/CardFilter';
import CategoryFilter from '../components/category/CategoryFilter';
import CardList from '../components/card/CardList';
import CardDetail from '../components/card/CardDetail';
import CardSection from '../components/card/CardSection';
import TaskList from '../components/task/TaskList';
import TaskDetail from '../components/task/TaskDetail';
import TodayTasksbanner from '../components/task/TodayTasksBanner';
import OverdueTasksBanner from '../components/task/OverdueTasksBanner';
import CategoryList from '../components/category/CategoryList';
import EventDetail from '../components/event/EventDetail';
import CUForm from './CreateUpdateForm';
import BaseLayout from '../components/BaseLayout';
import { useTaskManager } from '../hooks/useTaskManager';

const TaskManager = () => {
	const {
		cards,
		categories,
		tasks,
		allTasks,
		currentTab,
		setCurrentTab,
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
		handleDeleteCategory,
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
		overdueTasks,
		events,
		activeEvent,
		setActiveEvent,
		handleDeleteEvent,
		loadingEvents,
	} = useTaskManager();

	const groupedTasks = allTasks.reduce((acc, task) => {
		const cardId = task.card;
		if (!acc[cardId]) acc[cardId] = [];
		acc[cardId].push(task);
		return acc;
	}, {});

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

		if (activeCard && activeEvent) {
			return (
				<EventDetail
					event={activeEvent}
					onLeaveEvent={() => setActiveEvent(null)}
					onDeleteEvent={async (eventId) => {
						await handleDeleteEvent(eventId);
						setActiveEvent(null);
					}}
					onUpdateEvent={(eventObj) =>
						setFormConfig({
							type: 'event',
							mode: 'update',
							initialData: eventObj,
						})
					}
				/>
			);
		}

		if (activeCard) {
			return (
				<CardDetail
					activeCard={activeCard}
					categories={categories}
					onLeave={handleLeaveCard}
					onDeleteCard={handleDeleteCard}
					onUpdateCard={() =>
						setFormConfig({
							type: 'card',
							mode: 'update',
							initialData: activeCard,
						})
					}
					tasks={tasks}
					loadingTasks={loadingTasks}
					onSearchTasks={handleSearchTasks}
					onAddTask={() =>
						setFormConfig({ type: 'task', mode: 'create' })
					}
					onEnterTask={(taskObj) => setActiveTask(taskObj)}
					// События
					events={events}
					loadingEvents={loadingEvents}
					onAddEvent={() =>
						setFormConfig({ type: 'event', mode: 'create' })
					}
					onEnterEvent={(eventObj) => setActiveEvent(eventObj)}
				/>
			);
		}

		return (
			<div>
				<nav>
					<button
						onClick={() => setCurrentTab('cards')}
						disabled={currentTab === 'cards'}
					>
						Карточки
					</button>
					<button
						onClick={() => setCurrentTab('tasks')}
						disabled={currentTab === 'tasks'}
					>
						Все задачи
					</button>
					<button
						onClick={() => setCurrentTab('categories')}
						disabled={currentTab === 'categories'}
					>
						Категории
					</button>
				</nav>
				<hr />

				<TodayTasksbanner
					todayTasks={todayTasks}
					onEnterTodayTask={handleEnterTodayTask}
					onCompleteTodayTask={handleCompleteTodayTask}
					onPostponeTodayTask={handlePostponeTodayTask}
				/>

				<OverdueTasksBanner
					overdueTasks={overdueTasks}
					onEnterTodayTask={handleEnterTodayTask}
					onCompleteTodayTask={handleCompleteTodayTask}
					onPostponeTodayTask={handlePostponeTodayTask}
				/>

				{currentTab === 'cards' && (
					<CardSection
						cards={cards}
						categories={categories}
						loadingCards={loadingCards}
						onSearchCards={handleSearchCards}
						onCategoryChange={handleCategoryChange}
						onCreateCardClick={() =>
							setFormConfig({ type: null, mode: 'create' })
						}
						onEnterCard={handleEnterCard}
					/>
				)}

				{currentTab === 'tasks' && (
					<div>
						{Object.keys(groupedTasks).map((cardId) => {
							const parentCard = cards.find(
								(c) => c.id === Number(cardId),
							);
							const cardTitle = parentCard
								? parentCard.title
								: `Карточка (ID: ${cardId})`;
							return (
								<div key={cardId}>
									<h3>{cardTitle}</h3>
									<TaskList
										tasks={groupedTasks[cardId]}
										onEnterTask={handleEnterTodayTask}
									/>
								</div>
							);
						})}
					</div>
				)}

				{currentTab === 'categories' && (
					<CategoryList
						categories={categories}
						setFormConfig={setFormConfig}
						onDeleteCategory={handleDeleteCategory}
					/>
				)}
			</div>
		);
	};

	return (
		<BaseLayout username={username} handleLogout={handleLogout}>
			{renderCurrentScreen()}
		</BaseLayout>
	);
};

export default TaskManager;
