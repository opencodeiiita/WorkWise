import Homepage from "./pages/homepage.js";
import Kanban from "./pages/kanban.js";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cards from "./components/Cards.js";
import KanbanSection from "./components/KanbanSection.js";
import Columns from "./components/ColumnsList.js";
import Loader from "./components/loader.js";
import Login from "./pages/login.js";
import { UserContext } from "./utils/contexts/User.js";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import LandingPage from "./pages/landing.js";

function App() {
	return (
		<>
			<BrowserRouter>
				<AnimatedRoutes />
			</BrowserRouter>
		</>
	);
}

function AnimatedRoutes() {
	const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const [rendered, setRendered] = useState(false);
	const [url, setUrl] = useState(
		"https://wallpapertag.com/wallpaper/full/c/1/4/145606-best-desktop-wallpaper-1920x1200-smartphone.jpg"
	);

	const fetchBg = async () => {
		if (!rendered) {
			const response = await axios.get(
				"https://api.unsplash.com/photos/random/?client_id=NyUvXIq3Ek5F89nIPbNAGA84yhFxG3mOiSpvOb2ZklE&query=nature&orientation=landscape"
			);
			const data = await response.data;
			setUrl(data.urls.full);
			setRendered(true);
		}
	};

	const getUser = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3001/api/v1/auth/success",
				{ withCredentials: true }
			);
			if (response.status === 200) {
				setIsLoggedIn(true);
				console.log(response.data);
				setUser(response.data.user);
				localStorage.setItem("jwt_token", response.data.token);
			} else if (response.status === 401) {
				// Handle unauthorized access
				<Alert message="Error" type="error" showIcon />;
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false); // Set loading to false after API call completes
		}
	};

	useEffect(() => {
		// fetchBg();
		getUser();
	}, []);

	useEffect(() => {
		if (!isLoggedIn && !isLoading) {
			navigate("/");
		} else if (isLoggedIn && location.pathname === "/") {
			navigate("/home");
		}
	}, [isLoggedIn, isLoading, navigate, location]);

	useEffect(() => {
		if (!isLoggedIn && !isLoading) {
			navigate("/");
		}
	}, [isLoggedIn, isLoading, navigate]);

	if (isLoading) {
		return (
			<>
				<div className="loader w-full h-full bg-white"></div>
			</>
		); // Show a loading indicator while verifying authentication
	}

	return (
		<>
			<AnimatePresence>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Login />} />
					{isLoggedIn ? (
						<>
							<Route path="/home" element={<Homepage url={url} />} />
							<Route path="/kanban" element={<Kanban />}>
								<Route path=":section" element={<KanbanSection />} />
							</Route>
						</>
					) : null}
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;