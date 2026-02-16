import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* подстановочный путь */}
				<Route path="*" element={<TaskManager />} />
				<Route path="register" element={<RegisterForm />} />
				<Route path="login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
