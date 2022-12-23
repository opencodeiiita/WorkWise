import React, { useState,useEffect } from 'react';

export default function Date1()
{
    const [text,setText]=useState("");
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    useEffect(() => {
        setTimeout(() => {
            let today= new Date();
            let monthname= month[today.getMonth()];
            let day=addzero(today.getDate());
            let year=today.getFullYear();
            setText((text)=>text = `${monthname} ${day}, ${year}`);
        }, 1000);
      });
    
    return (
        <div className='text-6xl md:text-4xl sm:text-3xl drop-shadow-[0_0_10px_black]'>
            {text}
        </div>
    );

}
function addzero(num){
    return num<10 ? `0${num}`:num
    }