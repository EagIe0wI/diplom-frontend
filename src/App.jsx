import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				{/* подстановочный путь */}
// 				<Route path="*" element={<TaskManager />} />
// 				<Route path="register" element={<RegisterForm />} />
// 				<Route path="login" element={<LoginForm />} />
// 			</Routes>
// 		</BrowserRouter>
// 	);
// }

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path="/tasks" element={<TaskManager />} />
// 				<Route path="/login" element={<LoginForm />} />
// 				<Route path="/register" element={<RegisterForm />} />
				
// 				<Route path="*" element={
// 					<div style={{ padding: "20px", textAlign: "center" }}>
// 						<h2>Страница не найдена!</h2>
// 						<p>Попробуйте перейти по прямым ссылкам:</p>
// 						<ul style={{ listStyle: "none", padding: 0 }}>
// 							<li><a href="/login"> Войти (LoginForm)</a></li>
// 							<li><a href="/tasks"> Задачи (TaskManager)</a></li>
// 						</ul>
// 					</div>
// 				} />
// 			</Routes>
// 		</BrowserRouter>
// 	);
// }

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path="/tasks" 
					element={
						<ProtectedRoute>
							<TaskManager />
						</ProtectedRoute>
					} 
				/>
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/" element={<Navigate to="/tasks" replace />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
