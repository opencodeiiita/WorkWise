import React, { createContext, useContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export default function TimerContextProvider({ children }) {
		const [showTime, setShowTime] = useState(
			localStorage.getItem("timer") === null ? true : false
		);
		const [timer, setTimer] = useState(
			localStorage.getItem("timer") === null
				? 25 * 60
				: parseInt(localStorage.getItem("timer"))
		);

        const [isRunning, setIsRunning] = useState(
					localStorage.getItem("timer") === null ? false : true
				);

	return (
		<TimerContext.Provider
			value={{
				showTime,
				setShowTime,
				timer,
				setTimer,
				isRunning,
				setIsRunning,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
}
