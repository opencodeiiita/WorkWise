import React from "react";
import "../App.css";
import Time from "../components/Time";
import { useState, useContext, useEffect } from "react";
import Date from "../components/Date";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
import { FaClipboardList } from "react-icons/fa";
import Bookmark from "../components/Bookmark";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Input } from "antd";
import Loader from "../components/loader";
import CalendarComponent from "../components/Calendar";
import { UserContext } from "../utils/contexts/User.js";
import axios from "axios";
import { Alert } from "antd";
import TodoList from "../components/TodoList";

export default function Homepage({ url }) {
  const navigate = useNavigate();
  const { user, focus } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen2] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);

  const handleTodoListToggle = () => {
    setShowTodoList(!showTodoList);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk = () => {
    setIsModalOpen2(false);
  };
  const handleCancel = () => {
    setIsModalOpen2(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [showModal, setShowModal] = useState(false);

  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleMouseDown = (e) => {
    const touchDown = e.screenX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      navigate("/kanban");
    }

    // if (diff < -5) {
    // 	prev();
    // }

    setTouchPosition(null);
  };

  const handleMouseMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.screenX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      navigate("/kanban");
    }

    // if (diff < -5) {
    // 	prev();
    // }

    setTouchPosition(null);
  };

  var marks = localStorage.getItem("bookmarks");
  let bookmarks = JSON.parse(marks);

  function delBookmark(ind) {
    bookmarks.splice(ind, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  setTimeout(() => {
    document.querySelector("#loader-div").style.opacity = "0%";
    let x = document.querySelector(".App");
    x.classList.replace("opacity-0", "opacity-100");
    setTimeout(() => {
      document.querySelector("#loader-div").style.display = "none";
    }, 1000);
  }, 4000);

  return (
		<>
			<motion.div
				className="image h-screen bg-no-repeat bg-cover absolute"
				style={{ backgroundImage: `url(${url})` }}
				initial={{ x: -window.innerWidth }}
				animate={{ x: 0, transition: { type: "tween" } }}
				// transition={{ type: "tween" }}
				// onTouchStart={handleTouchStart}
				// onTouchMove={handleTouchMove}
				// onMouseDown={handleMouseDown}
				// onMouseMove={handleMouseMove}
				exit={{
					x: -window.innerWidth,
					opacity: 0,
					transition: { delay: 0.25 },
				}}
			>
				<Loader />

				{showTodoList && <TodoList className="todo-list" />}

				<Link to="/kanban">
					<div className="absolute right-8 top-[50%] h-16 w-16 rounded-full">
						<svg
							width={"100%"}
							height={"100%"}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="white"
						>
							<path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z" />
						</svg>
					</div>
				</Link>
				<div className="App opacity-0">
					<div className="msg  text-bold text-white">
						<Time />

						{focus ? (
							<></>
						) : (
							<>
								<Date />
								<Weather
									cityName={"mumbai"} //This is a temporary name we can have different city names.
								/>
								<Bookmark />
								<button
									className="absolute bottom-2 right-0 py-6 sm:py-2 px-6 sm:px-4 transition duration-150 ease-in-out"
									onClick={handleTodoListToggle}
								>
									<FaClipboardList
										color="white"
										className="inline-block mr-2"
										size={32}
									/>
								</button>
								<Link to="/settings/profile">
									<div id="settings-icon">
										<img
											src="/settings.png"
											alt="jin"
											onClick={showModal2}
											className="hover:scale-125 hover:duration-500"
										/>
									</div>
								</Link>
							</>
						)}

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

					{!focus && <Quotes />}
				</div>
			</motion.div>
		</>
	);
}
