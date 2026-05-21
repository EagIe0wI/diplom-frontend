import React from 'react';

function CategoryFilter({ categories, onCategoryChange }) {
	console.log('Категории в фильтре:', categories);
	return (
		<select onChange={(e) => onCategoryChange(e.target.value)}>
			<option value="">Все категории</option>
			{categories.map((cat) => (
				<option key={cat.id} value={cat.id}>
					{cat.title}
				</option>
			))}
		</select>
	);
}

export default CategoryFilter;
