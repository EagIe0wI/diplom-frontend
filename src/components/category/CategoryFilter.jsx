import React from 'react';

function CategoryFilter({ onSearchChange }) {
	return (
		<input
			type="text"
			placeholder="Поиск категорий..."
			onChange={(e) => {
				if (typeof onSearchChange === 'function') {
					onSearchChange(e.target.value);
				}
			}}
		/>
	);
}

export default CategoryFilter;
