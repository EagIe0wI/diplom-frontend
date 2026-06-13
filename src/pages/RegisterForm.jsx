import React, { useState } from 'react';
import { registerAPI } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');
	const [hasErrors, setErrors] = useState({
		username: false,
		password: false,
		passwordConfirm: false,
	});

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		setError('');

		const newErrors = {
			username: username.trim().length === 0,
			password: password.trim().length === 0,
			passwordConfirm: passwordConfirm.trim().length === 0,
		};
		setErrors(newErrors);

		if (
			newErrors.username ||
			newErrors.password ||
			newErrors.passwordConfirm
		) {
			setError('Все поля обязательны для заполнения!');
			return;
		}

		if (password !== passwordConfirm) {
			setErrors((prev) => ({ ...prev, passwordConfirm: true }));
			setError('Введенные пароли не совпадают!');
			return;
		}

		try {
			await registerAPI({ username, password });
			navigate('/tasks');
		} catch (err) {
			console.error('Ошибка регистрации:', err);
			const errorMsg = err.response?.data?.username || err.message;
			setError('Ошибка регистрации: ' + errorMsg);
		}
	};

	return (
		<form onSubmit={handleRegister} className="auth-form-container">
			<p className="auth-form-title">Регистрация аккаунта</p>

			{error && <p className="login-form-error">{error}</p>}

			<input
				type="text"
				name="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Логин"
				className={hasErrors.username ? 'login-form-error-field' : ''}
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Пароль"
				className={hasErrors.password ? 'login-form-error-field' : ''}
			/>

			<input
				type="password"
				value={passwordConfirm}
				onChange={(e) => setPasswordConfirm(e.target.value)}
				placeholder="Повторите пароль"
				className={
					hasErrors.passwordConfirm ? 'login-form-error-field' : ''
				}
			/>

			<input
				type="submit"
				value="Создать аккаунт"
				className="auth-submit-btn"
			/>
			<hr className="auth-divider" />
			<div className="auth-footer">
				<span>Есть аккаунт?</span>
				<Link to="/login" className="auth-link">
					Войти
				</Link>
			</div>
		</form>
	);
};

export default RegisterForm;
