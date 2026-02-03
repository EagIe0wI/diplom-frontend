import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import LoginForm from "./pages/LoginForm";

function App() {
	// useEffect(() => {
	// 	const req = async () => {
	// 		const url = "http://127.0.0.1:8000/tasks/";
	// 		const response = await fetch(url, {
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				username: "amogus",
	// 			}),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		console.log(response);
	// 	};

	// 	req();
	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				{/* подстановочный путь */}
				<Route path="*" element={<TaskManager />} />
				<Route path="login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
