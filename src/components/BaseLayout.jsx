import React from 'react';

function BaseLayout({ username, handleLogout, children }) {
	return (
		<div className="task-manager-container">
			<header className="main-app-header">
				<span className="user-badge">
					Пользователь: <strong>{username}</strong>
				</span>
				<button onClick={handleLogout}>Выйти</button>
			</header>
			<main className="main-app-content">{children}</main>
		</div>
	);
}

export default BaseLayout;
