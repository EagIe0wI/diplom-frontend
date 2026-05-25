import React, { useState } from 'react';
import TaskList from '../task/TaskList';
import TaskFilter from '../task/TaskFilter';

function CardDetail({
	tasks,
	loadingTasks,
	categories,
	activeCard,
	onLeave,
	onSearchTasks,
	onDeleteCard,
	onAddTask,
	onUpdateCard,
	onEnterTask,
}) {
	const [showCardOptions, setShowCardOptions] = useState(false);

	const currentCategoryObj = categories.find(
		(cat) => cat.id === activeCard.category,
	);

	return (
		<div>
			<header className="card-navigation-header">
				<button onClick={onLeave}>← Назад к спискам</button>
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
					: `ID ${activeCard.category}`}
			</p>

			<p>Описание: {activeCard.description}</p>
			<hr />

			<div>
				<span>Поиск задач: </span>
				<TaskFilter onSearchChange={onSearchTasks} />
				<button onClick={onAddTask}>+ Новая задача</button>
			</div>

			<h3>Задачи:</h3>
			{loadingTasks && <p>Загрузка задач...</p>}

			{tasks.length > 0 ? (
				<TaskList tasks={tasks} onEnterTask={onEnterTask} />
			) : (
				!loadingTasks && <p>Задач в этой карточке пока нет</p>
			)}
		</div>
	);
}

export default CardDetail;
