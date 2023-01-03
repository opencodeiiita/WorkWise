import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const kanban = () => {
  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: 0, transition: { type: "tween" } }}
      exit={{ x: window.innerWidth, opacity: 0, transition: { delay: 0.25 } }}
      className="h-[100vh] overflow-hidden bg-red-500 absolute w-[100vw]"
    >
      <Link to="/">
        <div className="absolute left-8 top-[50%] h-16 w-16 rounded-full bg-red-500 rotate-180">
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
      kanban
    </motion.div>
  );
};

export default kanban;
