import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import TaskAddForm from "../components/TaskAddForm";
import TaskList from "../components/TaskList";
import { cardAPI } from "../api/cards";
import { taskAPI } from "../api/tasks";

const TaskManager = () => {
	const [cards, setCards] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [activeCardId, setActiveCardId] = useState(null);
	const [newCardTitle, setNewCardTitle] = useState("");
	const [loading, setLoading] = useState(true);

	console.log("=== РЕНДЕР КОМПОНЕНТА ===", { activeCardId });

	useEffect(() => {
		setLoading(true);
		cardAPI.getAll()
			.then((cardsData) => {
				const actualCards = cardsData.results || cardsData.cards || cardsData;
				setCards(Array.isArray(actualCards) ? actualCards : []);
			})
			.catch((err) => console.error("Ошибка загрузки карточек:", err))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (!activeCardId) {
			setTasks([]);
			return;
		}

		setLoading(true);
		taskAPI.getAll(activeCardId)
			.then((tasksData) => {
				const actualTasks = tasksData.results || tasksData.tasks || tasksData;
				setTasks(Array.isArray(actualTasks) ? actualTasks : []);
			})
			.catch((err) => console.error("Ошибка загрузки задач:", err))
			.finally(() => setLoading(false));
	}, [activeCardId]);

	const handleCreateCard = async (e) => {
		e.preventDefault();
		if (!newCardTitle.trim()) return;
		try {
			const createdCardFromServer = await cardAPI.create({ title: newCardTitle });
			setCards([...cards, createdCardFromServer]);
			setNewCardTitle("");
		} catch (err) {
			console.error("Ошибка создания карточки:", err);
		}
	};

	const handleDeleteCard = async (id, e) => {
		e.stopPropagation(); 
		try {
			await cardAPI.delete(id);
			setCards(cards.filter(c => c.id !== id));
			if (activeCardId === id) setActiveCardId(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleTaskCreated = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const handleUpdateTask = (id) => async (text, deadline, status) => {
		try {
			const updatedTask = await taskAPI.update(id, text, deadline, status, activeCardId);
			setTasks(tasks.map(t => t.id === id ? updatedTask : t));
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteTask = (id) => async () => {
		try {
			await taskAPI.delete(id);
			setTasks(tasks.filter(t => t.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) return <div className="loading-state">Синхронизация с сервером...</div>;

	const activeCard = cards.find(c => c.id === activeCardId);

	return (
		<div className="task-manager-container">
			<div className="main-content-zone">
				{activeCardId === null ? (
					<div className="cards-screen">
						<h2>Ваши проекты (карточки)</h2>
						<form onSubmit={handleCreateCard} className="card-form">
							<input 
								type="text" 
								placeholder="Название новой карточки" 
								value={newCardTitle}
								onChange={e => setNewCardTitle(e.target.value)}
							/>
							<button type="submit">Создать карточку</button>
						</form>

						<div className="cards-grid">
							{cards.map(card => {
								return (
									<div 
										key={card.id} 
										onClick={() => setActiveCardId(card.id)}
										className="card-item"
									>
										<h3>{card.title}</h3>
										<button 
											onClick={(e) => handleDeleteCard(card.id, e)}
											className="delete-card-btn"
										>
											х
										</button>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div className="tasks-screen">
						<button onClick={() => setActiveCardId(null)} className="back-btn">← Назад к карточкам</button>
						<h2>Проект: {activeCard?.title}</h2>
						
						<TaskAddForm cardId={activeCardId} onTaskCreated={handleTaskCreated} />
						
						<TaskList 
							list={tasks} 
							removeTask={handleDeleteTask} 
							changeTask={handleUpdateTask} 
						/>
					</div>
				)}
			</div>
		</div>
	);

};

export default TaskManager;
