import Homepage from "./pages/homepage.js";
import Kanban from "./pages/kanban.js";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import KanbanSection from "./components/KanbanSection.js";
import Login from "./pages/login.js";
import { UserContext } from "./utils/contexts/User.js";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import LandingPage from "./pages/landing.js";
import DefaultLayout from "./components/Dashboard/DefaultLayout.js";
import Profile from "./components/Dashboard/Pages/Profile.js";
import Pomodoro from "./components/Dashboard/Pages/Pomodoro.js";
import Bookmarks from "./components/Dashboard/Pages/Bookmarks.js";
import Projects from "./components/Dashboard/Pages/Projects.js";
import PomodoroPage from "./components/Dashboard/Pages/PomodoroPage.js";
import Auth from "./pages/auth.js";


function App() {
	const { setBaseUrl } = useContext(UserContext);
	if (process.env.REACT_APP_PRODUCTION === "true") {
		setBaseUrl(process.env.REACT_APP_PRODUCTION_URL);
	} else {
		setBaseUrl(process.env.REACT_APP_DEVELOPMENT_URL);
	}

	return (
		<>
			<BrowserRouter>
				<AnimatedRoutes />
			</BrowserRouter>
		</>
	);
}

function AnimatedRoutes() {
	const { isLoggedIn, setIsLoggedIn, user, setUser, baseUrl } = useContext(UserContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
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
			const response = await axios.get(`${baseUrl}/auth/success`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
				},
			});

			if (response.status === 200) {
				setIsLoggedIn(true);
				setUser(response.data.user);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				navigate("/home");
			} else if (response.status === 401) {
				<Alert message="Error" type="error" showIcon />;
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchBg();
		getUser();
	}, []);

	useEffect(() => {
		if (
			!isLoggedIn &&
			!isLoading &&
			!location.pathname.startsWith("/auth")
			&& location.pathname !== "/"
		) {
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
					<Route path="/landing" element={<LandingPage />} />
					<Route path="/auth/:id" element={<Auth setIsLoading={setIsLoading}/>} />
					{isLoggedIn ? (
						<>
							<Route path="/home" element={<Homepage url={url} />} />
							<Route element={<DefaultLayout />}>
								<Route path="/settings/profile" element={<Profile />} />
								<Route path="/settings/pomodoro" element={<PomodoroPage />} />
								<Route path="/settings/bookmarks" element={<Bookmarks />} />
								<Route path="/settings/projects" element={<Projects />} />
							</Route>
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