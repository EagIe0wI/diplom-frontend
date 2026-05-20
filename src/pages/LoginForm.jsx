import { useState } from 'react';
import { loginAPI } from '../api';
import { useNavigate } from 'react-router-dom';

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
			<p>Sign in to continue</p>

			{apiError && (
				<p style={{ color: 'red', fontSize: '14px' }}>{apiError}</p>
			)}

			<input
				name="username"
				value={userInput}
				placeholder="Username"
				onChange={handleUserInput}
				className={hasErrors.username ? 'error' : ''}
			/>
			<input
				type="password"
				value={passwordInput}
				placeholder="Password"
				onChange={handlePasswordInput}
				className={hasErrors.password ? 'error' : ''}
			/>
			<input type="submit" value="Log in" />
		</form>
	);
};

export default LoginForm;
