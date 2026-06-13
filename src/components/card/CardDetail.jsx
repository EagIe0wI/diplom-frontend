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
	onSearchEvents,
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
				<button onClick={() => setShowCardOptions(!showCardOptions)}>
					{showCardOptions ? 'Закрыть меню' : 'Управление карточкой'}
				</button>
			</header>

			{showCardOptions && (
				<div className="card-options-block">
					<span className="options-label">
						Действия с карточкой:{' '}
					</span>
					<div className="options-buttons">
						<button onClick={onUpdateCard}>
							Редактировать название
						</button>
						<button
							onClick={() => onDeleteCard(activeCard.id)}
							className="danger-btn"
						>
							Удалить карточку
						</button>
					</div>
				</div>
			)}

			<div className="card-info-block">
				<h2 className="card-detail-title">{activeCard.title}</h2>
				<div className="card-meta">
					<p>
						<strong>Категория:</strong>{' '}
						{currentCategoryObj
							? currentCategoryObj.title
							: activeCard.category
								? `ID ${activeCard.category}`
								: 'Без категории'}
					</p>
					{activeCard.description && (
						<p className="card-description">
							<strong>Описание:</strong> {activeCard.description}
						</p>
					)}
				</div>
			</div>

			<TaskSection
				tasks={tasks}
				loadingTasks={loadingTasks}
				onSearchTasks={onSearchTasks}
				onAddTask={onAddTask}
				onEnterTask={onEnterTask}
			/>

			<EventSection
				events={events}
				loadingEvents={loadingEvents}
				onSearchEvents={onSearchEvents}
				onAddEvent={onAddEvent}
				onEnterEvent={onEnterEvent}
			/>
		</div>
	);
}

export default CardDetail;
