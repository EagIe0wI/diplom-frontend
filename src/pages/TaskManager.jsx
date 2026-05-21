import React, { useState, useEffect } from 'react';
import Card from '../components/card/Card';
import CardForm from '../components/card/CardForm';
import CardFilter from '../components/card/CardFilter';
import CardList from '../components/card/CardList';
import CategoryFilter from '../components/category/CategoryFilter';
import { cardAPI, taskAPI, categoryAPI, getUserMeAPI, logoutAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskManager = () => {
	const [cards, setCards] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [categories, setCategories] = useState([]);
	const [activeCard, setActiveCard] = useState(null);
	const [loadingCards, setLoadingCards] = useState(false);
	const [isCardFormOpen, setIsCardFormOpen] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [currentSearch, setCurrentSearch] = useState('');
	const [currentCategory, setCurrentCategory] = useState('');
	const [username, setUsername] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		setLoadingCards(true);
		Promise.all([cardAPI.getAll(), categoryAPI.getAll(), getUserMeAPI()])
			.then(([cardsData, categoriesData, userData]) => {
				const actualCards =
					cardsData.results || cardsData.cards || cardsData;
				const actualCategories =
					categoriesData.results ||
					categoriesData.categories ||
					categoriesData;

				setCards(Array.isArray(actualCards) ? actualCards : []);
				setCategories(
					Array.isArray(actualCategories) ? actualCategories : [],
				);
				setUsername(userData.username);
			})
			.catch((err) => console.error('Ошибка инициализации:', err))
			.finally(() => setLoadingCards(false));
	}, []);

	const handleLogout = async () => {
		if (confirm('Вы уверены, что хотите выйти?')) {
			await logoutAPI();
			navigate('/login');
		}
	};

	const fetchFilteredCards = async (search, categoryId) => {
		setLoadingCards(true);
		try {
			const cardsData = await cardAPI.getAll(search, categoryId);
			const actualCards =
				cardsData.results || cardsData.cards || cardsData;
			setCards(Array.isArray(actualCards) ? actualCards : []);
		} catch (err) {
			console.error('Ошибка поиска карточек:', err);
		} finally {
			setLoadingCards(false);
		}
	};

	const handleSearchCards = (searchText) => {
		setCurrentSearch(searchText);
		fetchFilteredCards(searchText, currentCategory);
	};

	const handleCategoryChange = (categoryId) => {
		setCurrentCategory(categoryId);
		fetchFilteredCards(currentSearch, categoryId);
	};

	const handleCreateCard = async (title) => {
		try {
			const newCard = await cardAPI.create(title);
			setCards((prevCards) => [...prevCards, newCard]);
			setIsCardFormOpen(false);
		} catch (err) {
			console.error('Ошибка создания карточки:', err);
		}
	};

	const handleDeleteCard = async (cardId) => {
		try {
			await cardAPI.delete(cardId);
			setCards((prevCards) =>
				prevCards.filter((card) => card.id !== cardId),
			);
			setActiveCard(null);
			setTasks([]);
		} catch (err) {
			console.error('Ошибка при удалении карточки:', err);
			alert('Не удалось удалить карточку на сервере');
		}
	};

	const handleEnterCard = async (card) => {
		setActiveCard(card);
		setLoadingTasks(true);
		setTasks([]);
		try {
			const tasksData = await taskAPI.getAll(card.id);
			const actualTasks =
				tasksData.results || tasksData.tasks || tasksData;
			setTasks(Array.isArray(actualTasks) ? actualTasks : []);
		} catch (err) {
			console.error('Ошибка задач:', err);
		} finally {
			setLoadingTasks(false);
		}
	};

	const handleLeaveCard = () => {
		setActiveCard(null);
		setTasks([]);
		fetchFilteredCards(currentSearch, currentCategory);
	};

	const handleAddTask = async (cardId, title, description, startDate) => {
		try {
			const formattedDate = startDate === '' ? null : startDate;
			const newTask = await taskAPI.create(
				cardId,
				title,
				formattedDate,
				description,
			);
			setTasks((prevTasks) => [...prevTasks, newTask]);
		} catch (err) {
			console.error('Ошибка при создании задачи:', err);
		}
	};

	const handleSearchTasks = async (searchText) => {
		setLoadingTasks(true);
		try {
			const tasksData = await taskAPI.getAll(activeCard.id, searchText);
			const actualTasks =
				tasksData.results || tasksData.tasks || tasksData;
			setTasks(Array.isArray(actualTasks) ? actualTasks : []);
		} catch (err) {
			console.error('Ошибка фильтрации:', err);
		} finally {
			setLoadingTasks(false);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await taskAPI.delete(taskId);
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId),
			);
		} catch (err) {
			console.error('Ошибка при удалении задачи:', err);
			alert('Не удалось удалить задачу на сервере');
		}
	};

	const handleUpdateTask = async (
		taskId,
		title,
		description,
		startDate,
		status,
	) => {
		try {
			const formattedDate = startDate === '' ? null : startDate;
			const updatedTask = await taskAPI.update(
				taskId,
				title,
				formattedDate,
				status,
				activeCard.id,
				description,
			);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? updatedTask : task,
				),
			);
			return updatedTask;
		} catch (err) {
			console.error('Ошибка при обновлении задачи:', err);
		}
	};

	const handleUpdateCard = async (cardId, newTitle) => {
		try {
			const updatedCard = await cardAPI.update(cardId, newTitle);
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === cardId ? updatedCard : card,
				),
			);
			setActiveCard(updatedCard);
		} catch (err) {
			console.error('Ошибка обновления карточки:', err);
			alert('Не удалось обновить карточку');
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
				onDeleteTask={handleDeleteTask}
				onDeleteCard={handleDeleteCard}
				onUpdateTask={handleUpdateTask}
				onUpdateCard={handleUpdateCard}
			/>
		);
	}

	return (
		<div>
			<header>
				<span>
					Пользователь: <strong>{username}</strong>
				</span>
				<button onClick={handleLogout}>Выйти</button>
			</header>
			<h2>Все карточки</h2>
			<div>
				<CardFilter onSearchChange={handleSearchCards} />
				<CategoryFilter
					categories={categories}
					onCategoryChange={handleCategoryChange}
				/>
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
			{!isCardFormOpen && (
				<CardList cards={cards} onEnterCard={handleEnterCard} />
			)}
		</div>
	);
};

export default TaskManager;
