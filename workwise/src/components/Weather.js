import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ cityName, apiKey }) => {
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      )
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {weatherData !== "" && (
        <>
          <div className="text-lg w-36 sm:w-28 absolute right-2 top-2 drop-shadow-[0_0_10px_black] sm:right-0 sm:top-0">
            <img
              alt="weather"
              src={`icons/weather/${weatherData.weather[0].icon}.png`}
              className="mx-auto h-16 w-16 invert mb-[2px] sm:mb-[-10px] sm:text-xs"
            />
            <span>
              {parseFloat(`${weatherData.main.temp - 273.15}`).toFixed(2)}°C
            </span>

            <span className="sm:hidden"> | {weatherData.weather[0].main}</span>
          </div>
        </>
      )}
    </>
  );
};

export default Weather;
