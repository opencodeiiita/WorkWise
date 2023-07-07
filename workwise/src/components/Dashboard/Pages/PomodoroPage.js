import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Pomodoro from './Pomodoro';
import { UserContext } from "../../../utils/contexts/User.js";
import { useContext } from "react";

export default function PomodoroPage() {
    const { baseUrl } = useContext(UserContext);

    const [timers, setTimers] = useState([])
    useEffect(() => {
            const fetchTimers = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/timer`, {
											headers: {
												"Content-Type": "application/json",
												Authorization: `Bearer ${localStorage.getItem(
													"jwt_token"
												)}`,
											},
										});

                    setTimers(response.data.pomodoroTimers.sessions);
                    console.log(response.data.pomodoroTimers.sessions);
                } catch (error) {
                    console.error("Error fetching timers:", error);
                }
            };

            fetchTimers();
        }, []);

  return (
    <>
        {timers?.map((timer) => (
            <Pomodoro key={timer._id} timer={timer}/>
        ))
        }
    </>
  )
}
