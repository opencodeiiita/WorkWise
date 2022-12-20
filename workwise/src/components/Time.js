import React, { useState,useEffect } from 'react'

export default function Time() {

  const [count, setCount] = useState("");

  useEffect(() => {
    setTimeout(() => {
      let today = new Date();
      let hrs = addzero(today.getHours());
      let min = addzero(today.getMinutes());
      // let sec = addzero(today.getSeconds());
      setCount((count) => count = `${hrs}:${min}`);
    }, 1000);
  });
    
    return (
    <div className='text-9xl text-black'>{count}</div>
  )
}


function addzero(num){
return num<10 ? `0${num}`:num
}