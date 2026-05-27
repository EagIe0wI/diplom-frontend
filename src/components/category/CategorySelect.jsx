import React from 'react';

function CategoryFilter({ categories, onCategoryChange }) {
	return (
		<select onChange={(e) => onCategoryChange(e.target.value)}>
			<option value="">Все категории</option>
			{categories &&
				categories.map((cat) => (
					<option key={cat.id} value={cat.id}>
						{cat.title}
					</option>
				))}
		</select>
	);
}

export default CategoryFilter;
