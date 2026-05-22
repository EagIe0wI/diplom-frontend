import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardAPI, taskAPI, categoryAPI, getUserMeAPI, logoutAPI } from '../api';

export const useTaskManager = () => {
	const [cards, setCards] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [activeCard, setActiveCard] = useState(null);
	const [activeTask, setActiveTask] = useState(null);
	const [loadingCards, setLoadingCards] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [currentSearch, setCurrentSearch] = useState('');
	const [currentCategory, setCurrentCategory] = useState('');
	const [username, setUsername] = useState('');
	const [formConfig, setFormConfig] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		setLoadingCards(true);
		Promise.all([cardAPI.getAll(), categoryAPI.getAll(), getUserMeAPI()])
			.then(([cardsData, categoryData, userData]) => {
				const actualCards =
					cardsData.results || cardsData.cards || cardsData;
				const actualCategories =
					categoryData.results ||
					categoryData.categories ||
					categoryData;
				setCards(Array.isArray(actualCards) ? actualCards : []);
				setCategories(
					Array.isArray(actualCategories) ? actualCategories : [],
				);
				setUsername(userData.username);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoadingCards(false));
	}, []);

	const handleLogout = async () => {
		if (confirm('Выйти?')) {
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

	const handleDeleteCard = async (cardId) => {
		if (!confirm('Удалить карточку?')) return;
		try {
			await cardAPI.delete(cardId);
			setCards((prev) => prev.filter((c) => c.id !== cardId));
			setActiveCard(null);
			setTasks([]);
		} catch (err) {
			console.log(err);
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
		} finally {
			setLoadingTasks(false);
		}
	};

	const handleLeaveCard = () => {
		setActiveCard(null);
		setActiveTask(null);
		setTasks([]);
		fetchFilteredCards(currentSearch, currentCategory);
	};

	const handleSearchTasks = async (searchText) => {
		setLoadingTasks(true);
		try {
			const tasksData = await taskAPI.getAll(activeCard.id, searchText);
			const actualTasks =
				tasksData.results || tasksData.tasks || tasksData;
			setTasks(Array.isArray(actualTasks) ? actualTasks : []);
		} finally {
			setLoadingTasks(false);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await taskAPI.delete(taskId);
			setTasks((prev) => prev.filter((t) => t.id !== taskId));
		} catch (err) {
			console.log(err);
		}
	};

	const handleFormSuccess = ({ action, data }) => {
		if (action === 'createCard') setCards((prev) => [...prev, data]);
		else if (action === 'updateCard') {
			setCards((prev) => prev.map((c) => (c.id === data.id ? data : c)));
			setActiveCard(data);
		} else if (action === 'createCategory')
			setCategories((prev) => [...prev, data]);
		else if (action === 'createTask') setTasks((prev) => [...prev, data]);
		else if (action === 'updateTask') {
			setTasks((prev) => prev.map((t) => (t.id === data.id ? data : t)));
			if (activeTask && activeTask.id === data.id) {
				setActiveTask(data);
			}
		}
		setFormConfig(null);
	};

	return {
		cards,
		categories,
		tasks,
		activeCard,
		activeTask,
		setActiveTask,
		loadingCards,
		loadingTasks,
		username,
		formConfig,
		setFormConfig,
		handleLogout,
		handleSearchCards,
		handleCategoryChange,
		handleDeleteCard,
		handleEnterCard,
		handleLeaveCard,
		handleSearchTasks,
		handleDeleteTask,
		handleFormSuccess,
	};
};
