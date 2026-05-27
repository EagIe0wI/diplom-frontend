import React, { useState } from 'react';
import TaskSection from '../task/TaskSection';
import EventSection from '../event/EventSection';

function CardDetail({
	activeCard,
	categories,
	onLeave,
	onDeleteCard,
	onUpdateCard,
	tasks,
	loadingTasks,
	onSearchTasks,
	onAddTask,
	onEnterTask,
	events,
	loadingEvents,
	onAddEvent,
	onEnterEvent,
}) {
	const [showCardOptions, setShowCardOptions] = useState(false);

	if (!activeCard) return <p>Загрузка данных карточки...</p>;

	const currentCategoryObj = categories.find(
		(cat) => cat.id === activeCard.category,
	);

	return (
		<div className="card-detail-container">
			<header className="card-navigation-header">
				<button onClick={onLeave}>Назад к спискам</button>
				{' | '}
				<button onClick={() => setShowCardOptions(!showCardOptions)}>
					{showCardOptions ? 'Закрыть меню' : 'Управление карточкой'}
				</button>
			</header>

			{showCardOptions && (
				<div className="card-options-block">
					<span>Действия с карточкой: </span>
					<button onClick={onUpdateCard}>
						Редактировать название
					</button>
					<button onClick={() => onDeleteCard(activeCard.id)}>
						Удалить карточку
					</button>
				</div>
			)}

			<hr />
			<h2>{activeCard.title}</h2>

			<p>
				<strong>Категория:</strong>{' '}
				{currentCategoryObj
					? currentCategoryObj.title
					: activeCard.category
						? `ID ${activeCard.category}`
						: 'Без категории'}
			</p>

			<p>Описание: {activeCard.description}</p>
			<hr />

			<TaskSection
				tasks={tasks}
				loadingTasks={loadingTasks}
				onSearchTasks={onSearchTasks}
				onAddTask={onAddTask}
				onEnterTask={onEnterTask}
			/>

			<hr className="section-divider" />

			<EventSection
				events={events}
				loadingEvents={loadingEvents}
				onAddEvent={onAddEvent}
				onEnterEvent={onEnterEvent}
			/>
		</div>
	);
}

export default CardDetail;
