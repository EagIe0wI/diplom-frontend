import React from 'react';

function BaseLayout({ username, handleLogout, children }) {
	return (
		<div className="task-manager-container">
			<header>
				<span>
					Пользователь: <strong>{username}</strong>
				</span>
				<button onClick={handleLogout}>Выйти</button>
			</header>
			<hr /> <main>{children}</main>
		</div>
	);
}

export default BaseLayout;
