import React from 'react';
import CategoryItem from './CategoryItem';

function CategoryList({ categories, onEnterCategory }) {
	if (!categories || categories.length === 0) {
		return <p className="categories-empty">Категорий пока нет.</p>;
	}

	return (
		<ul className="category-list">
			{categories.map((cat) => (
				<CategoryItem
					key={cat.id}
					category={cat}
					onEnterCategory={onEnterCategory}
				/>
			))}
		</ul>
	);
}

export default CategoryList;
