import React from 'react';
import CardFilter from './CardFilter';
import CategoryFilter from '../category/CategoryFilter';
import CardList from './CardList';

function CardSection({
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
				<CategoryFilter
					categories={categories}
					onCategoryChange={onCategoryChange}
				/>
				<button onClick={onCreateCardClick}>Создать карточку</button>
			</div>

			{loadingCards && <p>Загрузка карточек...</p>}

			<CardList cards={cards} onEnterCard={onEnterCard} />
		</div>
	);
}

export default CardSection;
