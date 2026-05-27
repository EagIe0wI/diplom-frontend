import React from 'react';
import CategoryList from './CategoryList';

function CategoryView({ categories, onCreateCategoryClick, onEnterCategory }) {
	return (
		<div className="tab-categories-section">
			<div className="categories-controls-block">
				<button onClick={onCreateCategoryClick}>
					Создать категорию
				</button>
			</div>

			<CategoryList
				categories={categories}
				onEnterCategory={onEnterCategory}
			/>
		</div>
	);
}

export default CategoryView;
