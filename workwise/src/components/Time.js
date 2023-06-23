import React, { useState, useEffect } from "react";
import { CiTimer } from "react-icons/ci";
import { FaRegStopCircle } from "react-icons/fa";

export default function Time() {
	const [time, setTime] = useState("");
	const [timer, setTimer] = useState(25 * 60);
	const [showTime, setShowTime] = useState(true);
	const [hovered, setHovered] = useState(false);
	const [isRunning, setIsRunning] = useState(false);

	const startTimer = () => {
		setIsRunning(true);
	};

	const endTimer = () => {
		setIsRunning(false);
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
								<>
									{isRunning ? (
										<FaRegStopCircle
											onClick={() => {
												setIsRunning(false);
												endTimer();
											}}
											className="text-5xl absolute top-12 right-[33vw] inline text-white"
										/>
									) : (
										<CiTimer
											onClick={() => {
												setIsRunning(true);
												startTimer();
											}}
											className="text-5xl absolute top-12 right-[33vw] inline text-white"
										/>
									)}
								</>
								{/* Display the formatted timer value */}
								{formatTimer(timer)}
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
