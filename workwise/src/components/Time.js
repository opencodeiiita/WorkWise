import React, { useState, useEffect } from 'react';

export default function Time() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      let today = new Date();
      let hrs = addzero(today.getHours());
      let min = addzero(today.getMinutes());
      // let sec = addzero(today.getSeconds());
      setTime(`${hrs}:${min}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className='text-9xl text-white font-bold drop-shadow-[0_0_10px_black]'>{time}</div>;
}

function addzero(num) {
  return num < 10 ? `0${num}` : num;
}
