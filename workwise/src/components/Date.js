import React, { useState, useEffect } from 'react';

export default function Date1() {
  const [date, setDate] = useState('');
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December',];

  useEffect(() => {
    const interval = setInterval(() => {
      let today = new Date();
      let monthname = month[today.getMonth()];
      let day = addzero(today.getDate());
      let year = today.getFullYear();
      setDate(`${monthname} ${day}, ${year}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-6xl md:text-4xl sm:text-3xl drop-shadow-[0_0_10px_black]'>
      {date}
    </div>
  );
}

function addzero(num) {
  return num < 10 ? `0${num}` : num;
}
