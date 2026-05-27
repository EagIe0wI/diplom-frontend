import React from 'react';
import CardFilter from '../components/card/CardFilter';
import CardList from '../components/card/CardList';
import CardDetail from '../components/card/CardDetail';
import CardView from '../components/card/CardView';
import CategoryList from '../components/category/CategoryList';
import CategoryFilter from '../components/category/CategorySelect';
import CategoryView from '../components/category/CategoryView';
import CategoryDetail from '../components/category/CategoryDetail';
import TaskList from '../components/task/TaskList';
import TaskDetail from '../components/task/TaskDetail';
import TodayTasksbanner from '../components/task/TodayTasksBanner';
import OverdueTasksBanner from '../components/task/OverdueTasksBanner';
import AllTasksView from '../components/task/AllTasksView';
import EventDetail from '../components/event/EventDetail';
import AllEventsView from '../components/event/AllEventsView';
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
		handleSearchEvents,
		todayTasks,
		handleCompleteTodayTask,
		handlePostponeTodayTask,
		handleEnterTodayTask,
		overdueTasks,
		events,
		allEvents,
		activeEvent,
		setActiveEvent,
		handleDeleteEvent,
		loadingEvents,
		activeCategory,
		setActiveCategory,
		handleSearchCategory,
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

		if (activeCategory) {
			return (
				<CategoryDetail
					category={activeCategory}
					onLeaveCategory={() => setActiveCategory(null)}
					onDeleteCategory={async (catId) => {
						await handleDeleteCategory(catId);
						setActiveCategory(null);
					}}
					onUpdateCategory={(catObj) =>
						setFormConfig({
							type: 'category',
							mode: 'update',
							initialData: catObj,
						})
					}
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

		if (activeEvent) {
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
						onClick={() => setCurrentTab('events')}
						disabled={currentTab === 'events'}
					>
						Все события
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
					<CardView
						cards={cards}
						categories={categories}
						loadingCards={loadingCards}
						onSearchCards={handleSearchCards}
						onCategoryChange={handleCategoryChange}
						onCreateCardClick={() =>
							setFormConfig({ type: 'card', mode: 'create' })
						}
						onEnterCard={handleEnterCard}
					/>
				)}

				{currentTab === 'tasks' && (
					<AllTasksView
						allTasks={allTasks}
						cards={cards}
						onSearchTasks={handleSearchTasks}
						onEnterTask={handleEnterTodayTask}
					/>
				)}

				{currentTab === 'events' && (
					<AllEventsView
						allEvents={allEvents}
						cards={cards}
						onSearchEvents={handleSearchEvents}
						onEnterEvent={(eventObj) => setActiveEvent(eventObj)}
					/>
				)}

				{currentTab === 'categories' && (
					<CategoryView
						categories={categories}
						handleSearchCategory={handleSearchCategory}
						onCreateCategoryClick={() =>
							setFormConfig({ type: 'category', mode: 'create' })
						}
						onEnterCategory={(catObj) => setActiveCategory(catObj)}
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
