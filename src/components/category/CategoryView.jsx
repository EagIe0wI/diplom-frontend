import React from 'react';
import CategoryList from './CategoryList';
import CategoryFilter from './CategoryFilter';

function CategoryView({
	categories,
	onCreateCategoryClick,
	handleSearchCategory,
	onEnterCategory,
}) {
	return (
		<div className="tab-categories-section">
			<div className="categories-controls-block">
				<CategoryFilter onSearchChange={handleSearchCategory} />
				<button onClick={onCreateCategoryClick}>
					Создать категорию
				</button>
			</div>

			<div className="card-list-grid">
				<CategoryList
					categories={categories}
					onEnterCategory={onEnterCategory}
				/>
			</div>
		</div>
	);
}

export default CategoryView;
