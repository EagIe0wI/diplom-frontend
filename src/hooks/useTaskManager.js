import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	cardAPI,
	taskAPI,
	categoryAPI,
	eventAPI,
	getUserMeAPI,
	logoutAPI,
} from '../api';

export const useTaskManager = () => {
	const [cards, setCards] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [events, setEvents] = useState([]);
	const [allEvents, setAllEvents] = useState([]);
	const [allTasks, setAllTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);
	const [overdueTasks, setOverdueTasks] = useState([]);
	const [currentTab, setCurrentTab] = useState('cards');
	const [sortBy, setSortBy] = useState('card');
	const [currentCategory, setCurrentCategory] = useState('');
	const [currentSearch, setCurrentSearch] = useState('');
	const [username, setUsername] = useState('');
	const [loadingCards, setLoadingCards] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [loadingEvents, setLoadingEvents] = useState(false);
	const [activeCard, setActiveCard] = useState(null);
	const [activeTask, setActiveTask] = useState(null);
	const [activeCategory, setActiveCategory] = useState(null);
	const [activeEvent, setActiveEvent] = useState(null);
	const [formConfig, setFormConfig] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		Promise.all([
			cardAPI.getAll(),
			categoryAPI.getAll(),
			getUserMeAPI(),
			taskAPI.getAll(),
			eventAPI.getAll(),
		])
			.then(
				([
					cardsData,
					categoryData,
					userData,
					allTasksData,
					allEventsData,
				]) => {
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

					const actualAllTasks =
						allTasksData.results ||
						allTasksData.tasks ||
						allTasksData;
					setAllTasks(
						Array.isArray(actualAllTasks) ? actualAllTasks : [],
					);
					const actualAllEvents =
						allEventsData.results ||
						allEventsData.events ||
						allEventsData;
					setAllEvents(
						Array.isArray(actualAllEvents) ? actualAllEvents : [],
					);
				},
			)
			.catch((err) => console.error('Ошибка инициализации данных:', err))
			.finally(() => setLoadingCards(false));

		fetchTodayBannerTasks();
	}, []);

	const handleLogout = async () => {
		if (confirm('Выйти?')) {
			await logoutAPI();
			navigate('/login');
		}
	};

	const handleFormSuccess = ({ action, data }) => {
		setFormConfig(null);
		if (action === 'createCard') {
			setCards((prev) => [...prev, data]);
		} else if (action === 'updateCard') {
			setCards((prev) => prev.map((c) => (c.id === data.id ? data : c)));
			setActiveCard(data);
		} else if (action === 'createCategory') {
			setCategories((prev) => [...prev, data]);
		} else if (action === 'updateCategory') {
			setCategories((prev) =>
				prev.map((cat) => (cat.id === data.id ? data : cat)),
			);
		} else if (action === 'createTask') {
			setTasks((prev) => [...prev, data]);
			setAllTasks((prev) => [...prev, data]);
		} else if (action === 'updateTask') {
			setTasks((prev) => prev.map((t) => (t.id === data.id ? data : t)));
			setAllTasks((prev) =>
				prev.map((t) => (t.id === data.id ? data : t)),
			);
			setTodayTasks((prev) =>
				prev.map((t) => (t.id === data.id ? data : t)),
			);
			if (activeTask && activeTask.id === data.id) {
				setActiveTask(data);
			}
		} else if (action === 'createEvent') {
			setEvents((prev) => [...prev, data]);
			setAllEvents((prevAll) => [...prevAll, data]);
		} else if (action === 'updateEvent') {
			setEvents((prev) => prev.map((e) => (e.id === data.id ? data : e)));
			if (activeEvent && activeEvent.id === data.id) {
				setActiveEvent(data);
			}
		}
		setFormConfig(null);
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

	const handleSearchCards = async (searchText) => {
		setCurrentSearch(searchText);
		fetchFilteredCards(searchText, currentCategory);
	};

	const handleDeleteCard = async (cardId) => {
		if (!confirm('Удалить карточку?')) return;
		try {
			await cardAPI.delete(cardId);
			setCards((prev) => prev.filter((c) => c.id !== cardId));
			setAllTasks((prev) => prev.filter((t) => t.card !== cardId));
			setActiveCard(null);
			setTasks([]);
		} catch (err) {
			console.error('Ошибка при удалении карточки:', err);
		}
	};

	const handleEnterCard = async (card) => {
		setActiveCard(card);
		setLoadingTasks(true);
		setLoadingEvents(true);
		setTasks([]);
		setEvents([]);
		try {
			const [tasksData, eventsData] = await Promise.all([
				taskAPI.getAll(card.id),
				eventAPI.getAll(card.id),
			]);

			const actualTasks =
				tasksData.results || tasksData.tasks || tasksData;
			setTasks(Array.isArray(actualTasks) ? actualTasks : []);
			const actualEvents =
				eventsData.results || eventsData.events || eventsData;
			setEvents(Array.isArray(actualEvents) ? actualEvents : []);
		} catch (err) {
			console.error('Ошибка загрузки данных карточки:', err);
		} finally {
			setLoadingTasks(false);
			setLoadingEvents(false);
		}
	};

	const handleLeaveCard = () => {
		setActiveCard(null);
		setActiveTask(null);
		setActiveEvent(null);
		setActiveCategory(null);
		setCurrentSearch('');
		setCurrentCategory('');

		taskAPI.getAll().then((data) => {
			const actualAllTasks = data.results || data.tasks || data;
			setAllTasks(Array.isArray(actualAllTasks) ? actualAllTasks : []);
		});
		fetchFilteredCards('', '');
	};

	const handleCategoryChange = (categoryId) => {
		setCurrentCategory(categoryId);
		fetchFilteredCards(currentSearch, categoryId);
	};

	const handleDeleteCategory = async (categoryId) => {
		if (
			!confirm(
				'Вы уверены? Удаление категории может повлечь за собой удаление связанных карточек на бэкенде!',
			)
		)
			return;
		try {
			await categoryAPI.delete(categoryId);
			setCategories((prev) =>
				prev.filter((cat) => cat.id !== categoryId),
			);
		} catch (err) {
			console.error('Ошибка при удалении категории:', err);
		}
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
			setAllTasks((prev) => prev.filter((t) => t.id !== taskId));
			setTodayTasks((prev) => prev.filter((t) => t.id !== taskId));
		} catch (err) {
			console.error('Ошибка при удалении задачки:', err);
		}
	};

	const fetchTodayBannerTasks = async () => {
		try {
			const localIsoDate = new Date().toISOString().split('T')[0];
			const [todayData, overdueData] = await Promise.all([
				taskAPI.getToday(localIsoDate),
				taskAPI.getOverdue(localIsoDate),
			]);
			setTodayTasks(todayData.results || todayData);
			setOverdueTasks(overdueData.results || overdueData);
		} catch (err) {
			console.error('Ошибка обновления баннеров:', err);
		}
	};

	const handleCompleteTodayTask = async (task) => {
		try {
			await taskAPI.update(
				task.id,
				task.title,
				task.start_date,
				'done',
				task.card,
				task.description,
			);

			await fetchTodayBannerTasks();

			setAllTasks((prevAll) =>
				prevAll.map((t) =>
					t.id === task.id ? { ...t, status: 'done' } : t,
				),
			);
		} catch (err) {
			console.error('Не удалось выполнить задачу:', err);
		}
	};

	const handlePostponeTodayTask = async (task) => {
		try {
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			const formattedTomorrowDate = tomorrow.toISOString().split('T')[0];
			await taskAPI.update(
				task.id,
				task.title,
				formattedTomorrowDate,
				task.status,
				task.card,
				task.description,
			);
			await fetchTodayBannerTasks();
		} catch (err) {
			console.error('Не удалось отложить задачу:', err);
		}
	};

	const handleEnterTodayTask = async (task) => {
		const parentCard = cards.find((c) => c.id === task.card);
		if (parentCard) {
			setActiveCard(parentCard);
			setLoadingTasks(true);
			try {
				const tasksData = await taskAPI.getAll(parentCard.id);
				const actualTasks =
					tasksData.results || tasksData.tasks || tasksData;
				setTasks(Array.isArray(actualTasks) ? actualTasks : []);
			} catch (err) {
				console.error(err);
			} finally {
				setLoadingTasks(false);
			}
		}
		setActiveTask(task);
	};

	const handleDeleteEvent = async (eventId) => {
		if (!confirm('Удалить запись из дневника?')) return;
		try {
			await eventAPI.delete(eventId); // Метод мы завели в api/event.js на прошлых шагах
			setEvents((prev) => prev.filter((e) => e.id !== eventId));
		} catch (err) {
			console.error('Ошибка при удалении события:', err);
		}
	};

	return {
		cards,
		categories,
		tasks,
		allTasks,
		currentTab,
		setCurrentTab,
		sortBy,
		setSortBy,
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
		handleDeleteCategory,
		handleDeleteCard,
		handleEnterCard,
		handleLeaveCard,
		handleSearchTasks,
		handleDeleteTask,
		handleFormSuccess,
		todayTasks,
		handleCompleteTodayTask,
		handlePostponeTodayTask,
		fetchTodayBannerTasks,
		handleEnterTodayTask,
		overdueTasks,
		events,
		loadingEvents,
		setEvents,
		activeEvent,
		setActiveEvent,
		handleDeleteEvent,
		allEvents,
		setAllEvents,
		activeCategory,
		setActiveCategory,
	};
};
