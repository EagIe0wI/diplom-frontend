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
import TasksTodayView from '../components/task/TasksTodayView';
import TasksOverdueView from '../components/task/TasksOverdueView';
import TasksView from '../components/task/TasksView';
import EventDetail from '../components/event/EventDetail';
import AllEventsView from '../components/event/AllEventsView';
import CUForm from '../components/CreateUpdateForm';
import BaseLayout from '../components/BaseLayout';
import { useTaskManager } from '../hooks/useTaskManager';

const TaskManager = () => {
	const {
		// --- КАРТОЧКИ ---
		cards,
		activeCard,
		loadingCards,
		handleSearchCards,
		handleDeleteCard,
		handleEnterCard,
		handleLeaveCard,

		// --- ЗАДАЧИ ---
		tasks,
		allTasks,
		todayTasks,
		overdueTasks,
		activeTask,
		setActiveTask,
		loadingTasks,
		handleSearchTasks,
		handleSearchCardTasks,
		handleDeleteTask,
		handleCompleteTodayTask,
		handlePostponeTodayTask,
		handleEnterTodayTask,

		// --- СОБЫТИЯ ---
		events,
		allEvents,
		activeEvent,
		setActiveEvent,
		loadingEvents,
		handleSearchCardEvents,
		handleSearchEvents,
		handleDeleteEvent,

		// --- КАТЕГОРИИ ---
		categories,
		activeCategory,
		setActiveCategory,
		handleDeleteCategory,
		handleSearchCategory,
		handleCategoryChange,

		// --- СИСТЕМНОЕ И UI ---
		username,
		currentTab,
		setCurrentTab,
		formConfig,
		setFormConfig,
		handleFormSuccess,
		handleLogout,
	} = useTaskManager();

	const renderMainContent = () => {
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
					onSearchTasks={handleSearchCardTasks}
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
					onSearchEvents={handleSearchCardEvents}
				/>
			);
		}

		return (
			<div className="task-manager-container">
				<nav className="tab-navigation">
					<button
						className={currentTab === 'cards' ? 'active' : ''}
						onClick={() => setCurrentTab('cards')}
						disabled={currentTab === 'cards'}
					>
						Все карточки
					</button>

					<button
						className={currentTab === 'today' ? 'active' : ''}
						onClick={() => setCurrentTab('today')}
						disabled={currentTab === 'today'}
					>
						Задачи на сегодня
					</button>

					{overdueTasks && overdueTasks.length > 0 && (
						<button
							className={currentTab === 'overdue' ? 'active' : ''}
							onClick={() => setCurrentTab('overdue')}
							disabled={currentTab === 'overdue'}
						>
							Просроченные задачи
						</button>
					)}

					<button
						className={currentTab === 'tasks' ? 'active' : ''}
						onClick={() => setCurrentTab('tasks')}
						disabled={currentTab === 'tasks'}
					>
						Все задачи
					</button>
					<button
						className={currentTab === 'events' ? 'active' : ''}
						onClick={() => setCurrentTab('events')}
						disabled={currentTab === 'events'}
					>
						Все события
					</button>
					<button
						className={currentTab === 'categories' ? 'active' : ''}
						onClick={() => setCurrentTab('categories')}
						disabled={currentTab === 'categories'}
					>
						Все категории
					</button>
				</nav>

				<div className="tab-content">
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

					{currentTab === 'today' &&
						(todayTasks && todayTasks.length > 0 ? (
							<div className="tasks-list-container">
								<h3 className="section-subtitle">
									Необходимо выполнить сегодня (
									{todayTasks.length}):
								</h3>
								<TasksView
									allTasks={[...todayTasks].sort((a, b) =>
										a.status === 'done'
											? 1
											: b.status === 'done'
												? -1
												: 0,
									)}
									cards={cards}
									onEnterTask={handleEnterTodayTask}
									onEnterCard={handleLeaveCard}
									onCompleteTask={handleCompleteTodayTask}
									onPostponeTask={handlePostponeTodayTask}
									hideFilter={false}
									onSearchTasks={handleSearchTasks}
								/>
							</div>
						) : (
							<p className="tasks-empty">
								На сегодня ничего не запланировано.
							</p>
						))}

					{currentTab === 'overdue' && (
						<div className="tasks-list-container">
							<h3 className="section-subtitle overdue-title">
								Просроченные задачи ({overdueTasks.length}):
							</h3>
							<TasksView
								allTasks={overdueTasks}
								cards={cards}
								onEnterTask={handleEnterTodayTask}
								onEnterCard={handleLeaveCard}
								onCompleteTask={handleCompleteTodayTask}
								onPostponeTask={handlePostponeTodayTask}
								hideFilter={false}
								onSearchTasks={handleSearchTasks}
							/>
						</div>
					)}

					{currentTab === 'tasks' && (
						<TasksView
							allTasks={allTasks}
							cards={cards}
							onSearchTasks={handleSearchTasks}
							onEnterTask={handleEnterTodayTask}
							onEnterCard={handleEnterCard}
						/>
					)}

					{currentTab === 'events' && (
						<AllEventsView
							allEvents={allEvents}
							cards={cards}
							onSearchEvents={handleSearchEvents}
							onEnterEvent={(eventObj) =>
								setActiveEvent(eventObj)
							}
						/>
					)}

					{currentTab === 'categories' && (
						<CategoryView
							categories={categories}
							handleSearchCategory={handleSearchCategory}
							onCreateCategoryClick={() =>
								setFormConfig({
									type: 'category',
									mode: 'create',
								})
							}
							onEnterCategory={(catObj) =>
								setActiveCategory(catObj)
							}
						/>
					)}
				</div>
			</div>
		);
	};

	return (
		<BaseLayout username={username} handleLogout={handleLogout}>
			{renderMainContent()}

			{formConfig && (
				<div className="modal-overlay">
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
			)}
		</BaseLayout>
	);
};

export default TaskManager;
