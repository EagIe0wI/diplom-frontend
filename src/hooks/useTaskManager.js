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
	// --- 1. КАРТОЧКИ ---
	const [cards, setCards] = useState([]);
	const [activeCard, setActiveCard] = useState(null);
	const [loadingCards, setLoadingCards] = useState(false);

	// --- 2. ЗАДАЧИ ---
	const [tasks, setTasks] = useState([]);
	const [allTasks, setAllTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);
	const [todayCount, setTodayCount] = useState(0);
	const [overdueTasks, setOverdueTasks] = useState([]);
	const [overdueCount, setOverdueCount] = useState(0);
	const [activeTask, setActiveTask] = useState(null);
	const [loadingTasks, setLoadingTasks] = useState(false);

	// --- 3. СОБЫТИЯ ---
	const [events, setEvents] = useState([]);
	const [allEvents, setAllEvents] = useState([]);
	const [activeEvent, setActiveEvent] = useState(null);
	const [loadingEvents, setLoadingEvents] = useState(false);

	// --- 4. КАТЕГОРИИ ---
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const [currentCategory, setCurrentCategory] = useState('');

	// --- 5. СИСТЕМНОЕ И UI (Навигация, Поиск, Формы) ---
	const [username, setUsername] = useState('');
	const [currentTab, setCurrentTab] = useState('cards');
	const [currentSearch, setCurrentSearch] = useState('');
	const [formConfig, setFormConfig] = useState(null);
	const [sortBy, setSortBy] = useState('card');

	const navigate = useNavigate();

	// ===== ГЛОБАЛЬНЫЙ СТАРТ (ИНИЦИАЛИЗАЦИЯ) ===== //
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

		fetchTodayTasks();
	}, []);

	const apiMap = {
		card: { api: cardAPI, setAll: setCards, setActive: setActiveCard },
		task: {
			api: taskAPI,
			setAll: setAllTasks,
			setContext: setTasks,
			setToday: setTodayTasks,
		},
		event: { api: eventAPI, setAll: setAllEvents, setContext: setEvents },
		category: { api: categoryAPI, setAll: setCategories },
	};

	const fetchData = async (entityType, contextId = null, searchText = '') => {
		const config = apiMap[entityType];
		if (!config) return;

		try {
			const responseData = await config.api.getAll(contextId, searchText);
			const actualData =
				responseData.results ||
				responseData[entityType + 's'] ||
				responseData;
			const dataArray = Array.isArray(actualData) ? actualData : [];
			if (contextId && config.setContext) {
				config.setContext(dataArray);
			} else {
				config.setAll(dataArray);
			}
		} catch (err) {
			console.error(
				`Ошибка при получении данных для ${entityType}:`,
				err,
			);
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

	const handleFormSuccess = ({ action, data }) => {
		setFormConfig(null);

		const match = action.match(
			/^(create|update)(Card|Task|Event|Category)$/,
		);
		if (!match) return;

		const mode = match[1];
		const entityType = match[2].toLowerCase();
		const config = apiMap[entityType];

		if (!config) return;

		if (mode === 'create') {
			config.setAll((prev) => [...prev, data]);
			if (config.setContext) {
				config.setContext((prev) => [...prev, data]);
			}
		} else if (mode === 'update') {
			const updateArray = (prev) =>
				prev.map((item) => (item.id === data.id ? { ...data } : item));

			config.setAll(updateArray);
			if (config.setContext) config.setContext(updateArray);
			if (config.setToday) config.setToday(updateArray);
			if (config.setActive) config.setActive({ ...data });
			if (activeTask && activeTask.id === data.id)
				setActiveTask({ ...data });
			if (activeEvent && activeEvent.id === data.id)
				setActiveEvent({ ...data });
		}
	};

	const handleGenericDelete = async (entityType, id, confirmMessage) => {
		if (!confirm(confirmMessage)) return;

		const config = apiMap[entityType];
		if (!config) return;

		try {
			await config.api.delete(id);
			config.setAll((prev) => prev.filter((item) => item.id !== id));
			if (entityType === 'card') {
				setAllTasks((prev) => prev.filter((t) => t.card !== id));
				setActiveCard(null);
				setTasks([]);
			} else if (entityType === 'task') {
				setTasks((prev) => prev.filter((t) => t.id !== id));
				setTodayTasks((prev) => prev.filter((t) => t.id !== id));
			} else if (entityType === 'event') {
				setEvents((prev) => prev.filter((e) => e.id !== id));
			}
		} catch (err) {
			console.error(`Не удалось удалить сущность ${entityType}:`, err);
		}
	};

	// --- ПОИСКОВИКИ ---
	const handleSearchCards = async (searchText) => {
		setCurrentSearch(searchText);
		fetchFilteredCards(searchText, currentCategory);
	};

	const handleSearchTasks = (searchText) =>
		fetchData('task', null, searchText);

	const handleSearchCardTasks = (searchText) =>
		activeCard && fetchData('task', activeCard.id, searchText);

	const handleSearchEvents = (searchText) =>
		fetchData('event', null, searchText);

	const handleSearchCardEvents = (searchText) =>
		activeCard && fetchData('event', activeCard.id, searchText);

	const handleSearchCategory = (searchText) =>
		fetchData('category', null, searchText);

	// --- ФУНКЦИЙ УДАЛЕНИЯ ---
	const handleDeleteCard = (cardId) =>
		handleGenericDelete(
			'card',
			cardId,
			'Удалить карточку и все её задачи/события?',
		);

	const handleDeleteTask = (taskId) =>
		handleGenericDelete(
			'task',
			taskId,
			'Вы уверены, что хотите удалить эту задачу?',
		);

	const handleDeleteEvent = (eventId) =>
		handleGenericDelete(
			'event',
			eventId,
			'Удалить эту запись из дневника событий?',
		);

	const handleDeleteCategory = (catId) =>
		handleGenericDelete(
			'category',
			catId,
			'Вы уверены, что хотите удалить эту категорию?',
		);

	// ===== БЛОК КАРТОЧЕК ===== //

	const handleCategoryChange = (categoryId) => {
		setCurrentCategory(categoryId);
		fetchFilteredCards(currentSearch, categoryId);
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

	// ===== БЛОК ЗАДАЧ ===== //
	const fetchTodayTasks = async () => {
		try {
			const localIsoDate = new Date().toISOString().split('T')[0];
			const [todayData, overdueData] = await Promise.all([
				taskAPI.getToday(localIsoDate),
				taskAPI.getOverdue(localIsoDate),
			]);
			setTodayTasks(todayData.results || todayData);
			setTodayCount(todayData.count || 0);

			setOverdueTasks(overdueData.results || overdueData);
			setOverdueCount(overdueData.count || 0);
		} catch (err) {
			console.error('Ошибка обновления баннеров:', err);
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
			await fetchTodayTasks();
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
			await fetchTodayTasks();
		} catch (err) {
			console.error('Не удалось отложить задачу:', err);
		}
	};

	const handleLogout = async () => {
		if (confirm('Выйти?')) {
			await logoutAPI();
			navigate('/login');
		}
	};

	return {
		// --- 1. КАРТОЧКИ ---
		cards,
		activeCard,
		loadingCards,
		handleSearchCards,
		handleDeleteCard,
		handleEnterCard,
		handleLeaveCard,

		// --- 2. ЗАДАЧИ ---
		tasks,
		allTasks,
		todayTasks,
		todayCount,
		overdueTasks,
		overdueCount,
		activeTask,
		setActiveTask,
		loadingTasks,
		handleSearchTasks,
		handleSearchCardTasks,
		handleDeleteTask,
		handleCompleteTodayTask,
		handlePostponeTodayTask,
		handleEnterTodayTask,
		fetchTodayTasks,

		// --- 3. СОБЫТИЯ ---
		events,
		allEvents,
		activeEvent,
		setActiveEvent,
		loadingEvents,
		setEvents,
		setAllEvents,
		handleSearchCardEvents,
		handleSearchEvents,
		handleDeleteEvent,

		// --- 4. КАТЕГОРИИ ---
		categories,
		activeCategory,
		setActiveCategory,
		currentCategory,
		handleDeleteCategory,
		handleSearchCategory,
		handleCategoryChange,

		// --- 5. СИСТЕМНОЕ И UI ---
		username,
		currentTab,
		setCurrentTab,
		formConfig,
		setFormConfig,
		handleFormSuccess,
		handleLogout,
		sortBy,
		setSortBy,
	};
};
