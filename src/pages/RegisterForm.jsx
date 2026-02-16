import { useState } from "react";
import registerApi from "../api/register";

const RegisterForm = () => {
	const [userInput, setUserInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [submitPasswordInput, setSubmitPasswordInput] = useState("");
	const [hasErrors, setErrors] = useState({
		username: false,
		password: false,
		submitPassword: false,
	});

	const handleUserInput = (e) => {
		setUserInput(e.target.value);
	};

	const handlePasswordInput = (e) => {
		setPasswordInput(e.target.value);
	};

	const handleSubmitPasswordInput = (e) => {
		setSubmitPasswordInput(e.target.value);
	};

	const validateErrors = () => {
		const newErrors = {
			username: false,
			password: false,
			submitPassword: false,
		};

		// валидация поля username
		if (userInput.length === 0) {
			newErrors.username = true;
		}

		// валидация поля password
		if (passwordInput.length === 0) {
			newErrors.password = true;
		}

		// валидация поля submit password
		if (submitPasswordInput != passwordInput) {
			newErrors.submitPassword = true;
		}

		setErrors(newErrors);
		console.log("new errors", newErrors);

		return newErrors.username || newErrors.password || newErrors.submitPassword;
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (!validateErrors()) {
			// отправка данных
			registerApi({
				username: userInput,
				password: passwordInput,
			});

			// опустошение полей ввода
			setUserInput("");
			setPasswordInput("");
			setSubmitPasswordInput("");
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
			<input
				type="password"
				value={submitPasswordInput}
				placeholder="Submit password"
				onChange={handleSubmitPasswordInput}
				// выделение поля при ошибке
				className={hasErrors.submitPassword ? "error" : ""}
			/>
			<input type="submit" value="Log in" />
		</form>
	);
};

export default RegisterForm;
