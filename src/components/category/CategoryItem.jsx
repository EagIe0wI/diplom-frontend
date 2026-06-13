import React from 'react';

function CategoryItem({ category, onEnterCategory }) {
	return (
		<li
			className="card-list-item"
			onClick={() => onEnterCategory(category)}
		>
			<span className="category-list-link">{category.title} ...</span>
		</li>
	);
}

export default CategoryItem;
