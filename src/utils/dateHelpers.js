/**
 * Переводит техническую строку iCalendar RRule (RFC 5545) на понятный русский язык.
 * @param {string} rruleString - Строка вида "FREQ=DAILY;INTERVAL=4"
 * @returns {string} - Человекочитаемый текст
 */
export const translateRRule = (rruleString) => {
	if (!rruleString) return 'Не повторяется';

	const params = {};
	rruleString.split(';').forEach((pair) => {
		const [key, value] = pair.split('=');
		if (key && value) params[key] = value;
	});

	const freq = params['FREQ'];
	const interval = params['INTERVAL'] ? Number(params['INTERVAL']) : 1;

	if (freq === 'DAILY') {
		if (interval === 1) return 'Каждый день';
		if (interval === 2) return 'Через день';
		return `Каждые ${interval} дн.`;
	}

	if (freq === 'MONTHLY') {
		if (interval === 1) return 'Каждый месяц';
		if (interval === 2) return 'Раз в два месяца';
		return `Каждые ${interval} мес.`;
	}

	if (freq === 'YEARLY') {
		return 'Раз в год (Ежегодно)';
	}

	return rruleString;
};
