import React from 'react';
import CardFilter from '../components/card/CardFilter';
import CategoryFilter from '../components/category/CategoryFilter';
import CardList from '../components/card/CardList';
import Card from '../components/card/Card';
import CUForm from './CreateUpdateForm';
import { useTaskManager } from '../hooks/useTaskManager'; // Импортируем наш хук

const TaskManager = () => {
	// Забираем всё готовое из хука одной строчкой
	const {
		cards,
		categories,
		tasks,
		activeCard,
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

	// Режим открытой карточки
	if (activeCard) {
		return (
			<div>
				<Card
					activeCard={activeCard}
					tasks={tasks}
					loadingTasks={loadingTasks}
					categories={categories}
					onLeave={handleLeaveCard}
					onSearchTasks={handleSearchTasks}
					onDeleteTask={handleDeleteTask}
					onDeleteCard={handleDeleteCard}
					onAddTask={() =>
						setFormConfig({ type: 'task', mode: 'create' })
					}
					onUpdateTask={(taskObj) =>
						setFormConfig({
							type: 'task',
							mode: 'update',
							initialData: taskObj,
						})
					}
					onUpdateCard={() =>
						setFormConfig({
							type: 'card',
							mode: 'update',
							initialData: activeCard,
						})
					}
				/>
				{formConfig && (
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
				)}
			</div>
		);
	}

	// Режим главной страницы
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

				{!formConfig && (
					<button
						onClick={() =>
							setFormConfig({ type: null, mode: 'create' })
						}
					>
						+ Создать...
					</button>
				)}
			</div>

			{formConfig && (
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
			)}

			{loadingCards && <p>Загрузка карточек...</p>}
			{!formConfig && (
				<CardList cards={cards} onEnterCard={handleEnterCard} />
			)}
		</div>
	);
};

export default TaskManager;
