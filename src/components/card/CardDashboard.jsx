import React from 'react';
import CardFilter from './CardFilter';
import CategoryFilter from '../category/CategoryFilter';
import CardList from './CardList';

function CardDashboard({
	categories,
	cards,
	loadingCards,
	handleSearchCards,
	handleCategoryChange,
	setFormConfig,
	handleEnterCard,
	todayTasks,
	onCompleteTodayTask,
	onPostponeTodayTask,
	onEnterTodayTask,
}) {
	console.log('Сегодняшние задачки ', todayTasks);

	return (
		<div>
			{todayTasks.map((task) => (
				<li key={task.id} className="task-list-item">
					<span
						className="task-list-link"
						onClick={() => onEnterTodayTask(task)}
						style={{ cursor: 'pointer' }}
					>
						{task.title} ➔
					</span>
					{task.description && ` (${task.description})`}
					{' | '}
					<button onClick={() => onCompleteTodayTask(task)}>
						Выполнено
					</button>
					<button onClick={() => onPostponeTodayTask(task)}>
						Отложить
					</button>
				</li>
			))}

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
					Создать
				</button>
			</div>

			{loadingCards && <p>Загрузка карточек...</p>}
			<CardList cards={cards} onEnterCard={handleEnterCard} />
		</div>
	);
}

export default CardDashboard;
