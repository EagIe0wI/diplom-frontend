import React from 'react';

function EventFilter({ onSearchChange }) {
	return (
		<input
			type="text"
			placeholder="Поиск по событиям..."
			onChange={(e) => onSearchChange(e.target.value)}
		/>
	);
}

export default EventFilter;
