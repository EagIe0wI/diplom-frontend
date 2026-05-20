import React, { useState } from 'react';
import { registerAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await registerAPI({ username, password });
			navigate('/tasks');
		} catch (err) {
			const errorMsg = err.response?.data?.username || err.message;
			alert('Ошибка регистрации: ' + errorMsg);
		}
	};

	return (
		<form onSubmit={handleRegister}>
			<h2>Регистрация (MVP)</h2>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Логин"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Пароль"
			/>
			<button type="submit">Создать аккаунт</button>
		</form>
	);
};

export default RegisterForm;
