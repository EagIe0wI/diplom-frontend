import React from 'react';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

function AllTasksView({ allTasks, cards, onSearchTasks, onEnterTask }) {
	const groupedTasks = allTasks.reduce((acc, task) => {
		const cardId = task.card;
		if (!acc[cardId]) acc[cardId] = [];
		acc[cardId].push(task);
		return acc;
	}, {});

	return (
		<div className="all-tasks-tab-view">
			<div className="tab-filters-block">
				<TaskFilter onSearchChange={onSearchTasks} />
			</div>
			{Object.keys(groupedTasks).map((cardId) => {
				const parentCard = cards.find((c) => c.id === Number(cardId));
				const cardTitle = parentCard
					? parentCard.title
					: `Карточка (ID: ${cardId})`;

				return (
					<div key={cardId} className="card-tasks-group">
						<h3>{cardTitle}</h3>
						<TaskList
							tasks={groupedTasks[cardId]}
							onEnterTask={onEnterTask}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default AllTasksView;
