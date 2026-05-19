// import { useState } from "react";

// const Task = ({ text, deadline, status, removeTask, changeTask }) => {
// 	const [editing, setEditingStatus] = useState(false);
// 	const [textInput, setTextInput] = useState(text);
// 	const [dateInput, setDateInput] = useState(deadline || "");
// 	const [hasDeadline, setHasDeadline] = useState(!!deadline);
	
// 	const isCompleted = status === "todo"; 

// 	const handleEditToggle = () => {
// 		setEditingStatus(!editing);
// 		setTextInput(text);
// 		setDateInput(deadline || "");
// 		setHasDeadline(!!deadline);
// 	};

// 	const handleSave = () => {
// 		if (!textInput.trim()) return;

// 		changeTask(textInput, hasDeadline ? dateInput : null);
// 		setEditingStatus(false);
// 	};

// 	const handleStatusToggle = () => {
// 		const newStatus = isCompleted ? "todo" : "done";
// 		changeTask(text, deadline, newStatus);
// 	};

// 	const handlePostponeDay = () => {
// 		const baseDate = deadline ? new Date(deadline) : new Date();
// 		baseDate.setDate(baseDate.getDate() + 1);
// 		const newDeadline = baseDate.toISOString().split('T')[0];
// 		changeTask(text, newDeadline, status);
// 	};

// 	const isExpired = deadline && new Date(deadline) < new Date() && !isCompleted;

// 	return (
// 		<div className={`task-item ${isCompleted ? "completed" : ""} ${isExpired ? "expired" : ""}`}>
// 			<li>
// 				{editing ? (
// 					<>
// 						<input 
// 							type="text" 
// 							value={textInput} 
// 							onChange={(e) => setTextInput(e.target.value)} 
// 						/>
// 						<label>
// 							<input 
// 								type="checkbox" 
// 								checked={hasDeadline} 
// 								onChange={(e) => setHasDeadline(e.target.checked)} 
// 							/>
// 							Дедлайн
// 						</label>
// 						{hasDeadline && (
// 							<input 
// 								type="date" 
// 								value={dateInput} 
// 								onChange={(e) => setDateInput(e.target.value)} 
// 							/>
// 						)}
// 					</>
// 				) : (
// 					<>
// 						<span className="task-text">{text}</span>
// 						{deadline && <span className="task-deadline"> (До: {deadline})</span>}
// 						{isExpired && <span className="expired-badge"> Просрочено!</span>}
// 					</>
// 				)}
// 			</li>

// 			<div className="task-buttons">
// 				{editing ? (
// 					<>
// 						<button onClick={handleSave}>Сохранить</button>
// 						<button onClick={handleEditToggle}>Отмена</button>
// 					</>
// 				) : (
// 					<>
// 						<button onClick={handleStatusToggle}>
// 							{isCompleted ? "Вернуть" : "Выполнено"}
// 						</button>
// 						{!isCompleted && (
// 							<button onClick={handlePostponeDay}>Отложить на день</button>
// 						)}
// 						<button onClick={handleEditToggle}>Изменить</button>
// 						<button onClick={removeTask}>Удалить</button>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Task;

import React from 'react';

function Task({ task }) {
  return (
    <li>
      {task.title}
    </li>
  );
}

export default Task;
