import React, { useState, useEffect } from 'react';
import Card from '../components/card/Card';
import CardForm from '../components/card/CardForm';
import CardFilter from '../components/card/CardFilter';
import CardList from '../components/card/CardList';
import { cardAPI } from '../api/cards';
import { taskAPI } from '../api/tasks'

function TaskManager() {
	const [cards, setCards] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [activeCard, setActiveCard] = useState(null); 
	const [loadingCards, setLoadingCards] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [isCardFormOpen, setIsCardFormOpen] = useState(false);

	useEffect(() => {
		setLoadingCards(true);
		cardAPI.getAll()
		.then((cardsData) => {
			const actualCards = cardsData.results || cardsData.cards || cardsData;
			setCards(Array.isArray(actualCards) ? actualCards : []);
		})
		.catch((err) => console.error("Ошибка карточек:", err))
		.finally(() => setLoadingCards(false));
	}, []);

	const handleSearchCards = async (searchText) => {
		setLoadingCards(true);
		try {
		const cardsData = await cardAPI.getAll(searchText);
		const actualCards = cardsData.results || cardsData.cards || cardsData;
		setCards(Array.isArray(actualCards) ? actualCards : []);
		} catch (err) {
		console.error("Ошибка поиска карточек:", err);
		} finally {
		setLoadingCards(false);
		}
	};

	const handleCreateCard = async (title) => {
		try {
		const newCard = await cardAPI.create(title);
		setCards((prevCards) => [...prevCards, newCard]);
		setIsCardFormOpen(false); 
		} catch (err) {
		console.error("Ошибка создания карточки:", err);
		}
	};

	const handleEnterCard = async (card) => {
		setActiveCard(card);
		setLoadingTasks(true);
		setTasks([]);
		try {
		const tasksData = await taskAPI.getAll(card.id);
		const actualTasks = tasksData.results || tasksData.tasks || tasksData;
		setTasks(Array.isArray(actualTasks) ? actualTasks : []);
		} catch (err) {
		console.error("Ошибка задач:", err);
		} finally {
		setLoadingTasks(false);
		}
	};

	const handleLeaveCard = () => {
		setActiveCard(null);
		setTasks([]);
	};

	const handleAddTask = async (cardId, title, deadline) => {
		try {
		const newTask = await taskAPI.create(cardId, title, deadline);
		setTasks((prevTasks) => [...prevTasks, newTask]);
		} catch (err) {
		console.error("Ошибка при создании задачи:", err);
		}
	};

	const handleSearchTasks = async (searchText) => {
		setLoadingTasks(true);
		try {
		const tasksData = await taskAPI.getAll(activeCard.id, searchText);
		const actualTasks = tasksData.results || tasksData.tasks || tasksData;
		setTasks(Array.isArray(actualTasks) ? actualTasks : []);
		} catch (err) {
		console.error("Ошибка фильтрации:", err);
		} finally {
		setLoadingTasks(false);
		}
	};

	if (activeCard) {
		return (
		<Card 
			activeCard={activeCard}
			tasks={tasks}
			loadingTasks={loadingTasks}
			onLeave={handleLeaveCard}
			onAddTask={handleAddTask}
			onSearchTasks={handleSearchTasks}
		/>
		);
	}

	return (
		<div>
		<h2>Все карточки</h2>
		
		<div>
			<CardFilter onSearchChange={handleSearchCards} />
			{!isCardFormOpen && (
			<button onClick={() => setIsCardFormOpen(true)}>+</button>
			)}
		</div>

		{isCardFormOpen && (
			<CardForm 
			onSave={handleCreateCard} 
			onCancel={() => setIsCardFormOpen(false)} 
			/>
		)}

		{loadingCards && <p>Загрузка карточек...</p>}
		
		<CardList cards={cards} onEnterCard={handleEnterCard} />
		</div>
	);
}

export default TaskManager;
