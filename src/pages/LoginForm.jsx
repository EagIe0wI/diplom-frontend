import { useState } from 'react';
import { loginAPI } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [apiError, setApiError] = useState('');
	const [hasErrors, setErrors] = useState({
		username: false,
		password: false,
	});

	const navigate = useNavigate();

	const handleUserInput = (e) => setUserInput(e.target.value);
	const handlePasswordInput = (e) => setPasswordInput(e.target.value);

	const validateErrors = () => {
		const newErrors = { username: false, password: false };
		if (userInput.trim().length === 0) newErrors.username = true;
		if (passwordInput.trim().length === 0) newErrors.password = true;
		setErrors(newErrors);
		return newErrors.username || newErrors.password;
	};

	const submitForm = async (e) => {
		e.preventDefault();
		if (!validateErrors()) {
			try {
				setApiError('');
				await loginAPI({
					username: userInput,
					password: passwordInput,
				});
				setUserInput('');
				setPasswordInput('');
				navigate('/tasks');
			} catch (err) {
				console.error('Ошибка при входе:', err);
				setApiError(
					err.response?.data?.detail || 'Неверный логин или пароль',
				);
			}
		}
	};

	return (
		<form onSubmit={submitForm}>
			<p>Войдите для продолжения</p>

			{apiError && <p className="login-form-error">{apiError}</p>}

			<input
				name="username"
				value={userInput}
				placeholder="Пользователь"
				onChange={handleUserInput}
				className={hasErrors.username ? 'login-form-error' : ''}
			/>
			<input
				type="password"
				value={passwordInput}
				placeholder="Пароль"
				onChange={handlePasswordInput}
				className={hasErrors.password ? 'login-form-error' : ''}
			/>
			<input type="submit" value="Войти" />
			<hr />
			<div>
				<span>Ещё нет аккаунта?</span>
				<Link to="/register" className="auth-link">
					Зарегестрироваться
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
