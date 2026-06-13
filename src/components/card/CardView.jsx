import React from 'react';
import CardFilter from './CardFilter';
import CategorySelect from '../category/CategorySelect';
import CardList from './CardList';

function CardView({
	cards,
	categories,
	loadingCards,
	onSearchCards,
	onCategoryChange,
	onCreateCardClick,
	onEnterCard,
}) {
	return (
		<div className="tab-cards-section">
			<div className="cards-controls-block">
				<CardFilter onSearchChange={onSearchCards} />
				<CategorySelect
					categories={categories}
					onCategoryChange={onCategoryChange}
				/>
				<button onClick={onCreateCardClick}>Создать карточку</button>
			</div>

			{loadingCards && (
				<p className="loading-state-text">Загрузка карточек...</p>
			)}

			<CardList cards={cards} onEnterCard={onEnterCard} />
		</div>
	);
}

export default CardView;
