import React, { useEffect } from 'react'
import Column from './Column';
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { Avatar } from "antd";
import {
	SearchOutlined,
	CalendarOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "../utils/contexts/User.js";
import { useContext } from "react";


export default function ColumnsList() {
	const dateFormat2 = "MMM DD, YYYY";
	const { user } = useContext(UserContext);
  return (
		<div className="h-16 bg-white flex items-center px-4 mb-5 justify-between">
			<div className="text-xl font-bold font-title">Welcome back, {user.fullName} 👋</div>
			<div className="others flex items-center">
				<SearchOutlined className="mr-4" />
				<DatePicker defaultValue={dayjs()} format={dateFormat2} className="mr-4"/>
				<Avatar size={40} src={user.picture} className="flex items-center justify-center" />
			</div>
		</div>
	);
}
    