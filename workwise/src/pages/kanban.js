import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Columns from "../components/ColumnsList";

export default function Kanban() {
	let navigate = useNavigate();
	return (
		<motion.div>
			<Link to="/">
				<div className="absolute left-2 top-[50%] h-16 w-16 scale-50 rounded-full  rotate-180 z-10">
					<svg
						width={"100%"}
						height={"100%"}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="black"
					>
						<path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z" />
					</svg>
				</div>
			</Link>
			<Sidebar />
			<Outlet />
		</motion.div>
	);
}
