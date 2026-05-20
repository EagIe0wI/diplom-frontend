import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

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
