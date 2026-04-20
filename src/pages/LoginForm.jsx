import { useState } from "react";
import loginApi from "../api/login";

// нужно реализовать выведение имя пользователя, если тот зарегестрирован
// иначе отображать "Гость" или "Guest"

const LoginForm = () => {
	const [userInput, setUserInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [hasErrors, setErrors] = useState({
		username: false,
		password: false,
	});

	const handleUserInput = (e) => {
		setUserInput(e.target.value);
	};

	const handlePasswordInput = (e) => {
		setPasswordInput(e.target.value);
	};

	const validateErrors = () => {
		const newErrors = {
			username: false,
			password: false,
		};

		// валидация поля username
		if (userInput.length === 0) {
			newErrors.username = true;
		}

		// валидация поля password
		if (passwordInput.length === 0) {
			newErrors.password = true;
		}

		setErrors(newErrors);
		console.log("new errors", newErrors);

		return newErrors.username || newErrors.password;
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (!validateErrors()) {
			// отправка данных
			loginApi({
				username: userInput,
				password: passwordInput,
			});

			// опустошение полей ввода
			setUserInput("");
			setPasswordInput("");
			return;
		}
	};

	return (
		<form onSubmit={submitForm}>
			<p>Sing in to continue</p>
			<input
				name="username"
				value={userInput}
				placeholder="Username"
				onChange={handleUserInput}
				// выделение поля при ошибке
				className={hasErrors.username ? "error" : ""}
			/>
			<input
				type="password"
				value={passwordInput}
				placeholder="Password"
				onChange={handlePasswordInput}
				// выделение поля при ошибке
				className={hasErrors.password ? "error" : ""}
			/>
			<input type="submit" value="Log in" />
		</form>
	);
};

export default LoginForm;
