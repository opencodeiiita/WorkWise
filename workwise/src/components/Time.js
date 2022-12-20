import React, { useState,useEffect } from 'react'

export default function Time() {
    var timezone = "Asia/Kolkata";
    const [time, setTime] = useState("00:00:00")

    const fetchTime = async ()=>{
        const response = await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=" + timezone);
        const json = await response.json();
        console.log(json.time);
        setTime(json.time);
    }


    useEffect(() => {
      const interval = setInterval(() => {
        fetchTime();
  },100);
        
    }, [])
    
    return (
    <div className='text-2xl'>{time}</div>
  )
}
