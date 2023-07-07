import React, { useState, useEffect, useContext } from "react";
import { CiTimer } from "react-icons/ci";
import { FaRegStopCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { UserContext } from "../utils/contexts/User.js";
import { TimerContext } from "../utils/contexts/Timer.js";
import axios from "axios";

export default function Time() {
	const [time, setTime] = useState("");
	const { showTime, setShowTime, setIsRunning, isRunning, setTimer, timer } =
		useContext(TimerContext);
	const [hovered, setHovered] = useState(false);
	const { focus, setFocus, baseUrl } = useContext(UserContext);

	const createTimer = async () => {
		const response = await axios.post(
			`${baseUrl}/timer`,
			{
				maximumFocusTime: timer,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
				},
			}
		);

		localStorage.setItem("timerId", response.data.newTimer._id);
	};

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	const endTimer = () => {
		setIsRunning(false);
		const timerId = localStorage.getItem("timerId");
		const res = axios.put(
			`${baseUrl}/timer/${timerId}`,
			{
				secondsRemaining: localStorage.getItem("timer"),
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
				},
			}
		);
		
		localStorage.removeItem("timerId");
		setTimer(25 * 60);
		localStorage.removeItem("timer");
		setFocus(false);
		setHovered(false);
		setShowTime(true);
	};

	useEffect(() => {
		if (showTime) {
			const interval = setInterval(() => {
				let today = new Date();
				let hrs = addzero(today.getHours());
				let min = addzero(today.getMinutes());
				setTime(`${hrs}:${min}`);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			if (isRunning) {
				// If the timer is running, decrement it by one second every second
				const interval = setInterval(() => {
					setTimer((prevTimer) => prevTimer - 1);
					localStorage.setItem("timer", timer);
				}, 1000);
				// If the timer reaches zero, stop it and reset it
				if (timer === 0) {
					clearInterval(interval);
					setTimer(25 * 60);
					setIsRunning(false);
				}
				return () => clearInterval(interval);
			} else {
				// If the timer is not running, do not change it
				localStorage.setItem("timer", timer);
				setTime("25:00");
			}
		}
	}, [showTime, isRunning, timer]);

	// Convert the timer value in seconds to a string in minutes and seconds format
	const formatTimer = (timer) => {
		let min = addzero(Math.floor(timer / 60));
		let sec = addzero(timer % 60);
		return `${min}:${sec}`;
	};

	return (
		<>
			{showTime && (
				<>
					<div className="flex justify-center">
						<div
							className="text-9xl w-[40vw] text-white font-bold drop-shadow-[0_0_10px_black]"
							onMouseEnter={() => {
								setHovered(true);
							}}
							onMouseLeave={() => {
								setHovered(false);
							}}
						>
							{hovered && (
								<>
									<CiTimer
										onClick={() => {
											setShowTime(!showTime);
											setTime("25:00");
											setFocus(true);
											createTimer();
										}}
										className="text-5xl absolute top-12 right-[33vw] inline text-white"
									/>
								</>
							)}
							{time}
						</div>
					</div>
				</>
			)}
			{!showTime && (
				<>
					<>
						<div className="flex items-center justify-center ">
							<div
								className="text-[14vw] w-[40vw] mb-[40vh] text-white font-bold drop-shadow-[0_0_10px_black]"
								onMouseEnter={() => {
									setHovered(true);
								}}
								onMouseLeave={() => {
									setHovered(false);
								}}
							>
								<>
									{isRunning ? (
										<FaRegStopCircle
											onClick={() => {
												setIsRunning(false);
												stopTimer();
											}}
											className="text-5xl absolute top-40 right-[40vw] inline font-thin text-white"
										/>
									) : (
										<FaRegPlayCircle
											onClick={() => {
												setIsRunning(true);
												startTimer();
											}}
											className="text-5xl absolute top-40 right-[40vw] inline text-white"
										/>
									)}
								</>
								{/* Display the formatted timer value */}
								{formatTimer(timer)}
								{
									// If the timer is running, display a button to end it
									isRunning && (
										<div>
											<button
												onClick={() => {
													setIsRunning(false);
													endTimer();
												}}
												className="bg-[#ffffff6a] absolute text-3xl left-[13.5vw] text-white font-bold py-2 px-4 rounded-md "
											>
												End Timer
											</button>
										</div>
									)
								}
							</div>
						</div>
					</>
				</>
			)}
		</>
	);
}

function addzero(num) {
	return num < 10 ? `0${num}` : num;
}
