import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import CalendarComponent from "./Calendar";
const date = require("date-and-time");

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const now = new Date();
    let x = date.format(now, "ddd, MMM DD YYYY");
    setCurrentDate(x);
  }, []);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-3/4">
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="/" className="flex items-center">
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Welcome Back , Neeraj Choubisa 💯
                  </span>
                </a>
                <div className="flex items-center lg:order-2">
                  <form action="" className="search">
                    <input
                      className="search__input"
                      type="search"
                      placeholder="Search"
                      id="searchInput"
                    />

                    <div className="search__icon-container flex justify-center items-center mt-2 mx-2">
                      <label
                        for="searchInput"
                        className="search__label mt-1 mx-2"
                        aria-label="Search"
                      >
                        <svg viewBox="0 0 1000 1000" title="Search">
                          <path
                            fill="currentColor"
                            d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                          />
                        </svg>
                      </label>

                      <button className="search__submit" aria-label="Search">
                        <svg viewBox="0 0 1000 1000" title="Search">
                          <path
                            fill="currentColor"
                            d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                  <button
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 border dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 flex"
                    onClick={() => {
                      showModal ? setShowModal(false) : setShowModal(true);
                      console.log(showModal);
                    }}
                  >
                    <BsFillCalendarCheckFill
                      classNameName="mt-0"
                      fontSize="18"
                    />
                    <p className="mx-2">{currentDate}</p>
                  </button>
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
                  <a
                    href="#"
                    className="text-dark bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5  mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <CgProfile classNameName="mt-0 mx-2" fontSize="22" />
                  </a>
                </div>
              </div>
            </nav>
          </header>{" "}
        </div>
      </div>
    </>
  );
};

export default Header;
