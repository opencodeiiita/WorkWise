import React, { useState, useEffect } from "react";
import "../App.css";
import Time from "../components/Time";
import axios from "axios";
import Date from "../components/Date";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
import { BsFillCalendarDateFill } from "react-icons/bs";

import Bookmark from "../components/Bookmark";

import CalendarComponent from "../components/Calendar";

export default function Homepage() {
  const [rendered, setRendered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(
    "https://wallpapertag.com/wallpaper/full/c/1/4/145606-best-desktop-wallpaper-1920x1200-smartphone.jpg"
  );

  const fetchBg = async () => {
    if (!rendered) {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random/?client_id=NyUvXIq3Ek5F89nIPbNAGA84yhFxG3mOiSpvOb2ZklE&query=nature&orientation=landscape"
      );
      const data = await response.data;
      setUrl(data.urls.full);
      setRendered(true);
    }
  };

  useEffect(() => {
    fetchBg();
  });

  return (
    <div
      className=" image w-full h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${url})` }}
    >
      <button
        className="absolute bottom-0 right-0 py-6 sm:py-2 px-6 sm:px-4  transition
        duration-150
        ease-in-out"
        onClick={() => {
          showModal ? setShowModal(false) : setShowModal(true);
          console.log(showModal);
        }}
      >
        <BsFillCalendarDateFill color="white " className="calendar-icon" />
      </button>

      <div className="App">
        <div className="msg  text-bold text-white">
          <Time />
          <Date />
          <Weather
            cityName={"mumbai"} //This is a temporary name we can have different city names.
            apiKey={"a045d78dfc153d0c97dd1e87653d1ced"} //fill the api key here to make the widget work.
          />
          <Bookmark />
          {/* Modal Render  */}
          {showModal ? (
            <>
              <div
                className="calendar-position"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="calendar">
                  <CalendarComponent />
                </div>
              </div>
            </>
          ) : null}
          {/* Modal Render End  */}
        </div>
        <Quotes />
      </div>
    </div>
  );
}
