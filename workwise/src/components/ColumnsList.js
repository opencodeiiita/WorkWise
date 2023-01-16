import React from 'react'
import Column from './Column';
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { Avatar } from "antd";
import {
	SearchOutlined,
	CalendarOutlined,
	UserOutlined,
} from "@ant-design/icons";
export default function ColumnsList() {
	const dateFormat2 = "MMM DD, YYYY";
  return (
		<div className="h-16 bg-white flex items-center px-4 mb-5 justify-between">
			<div className="text-xl font-bold font-title">Welcome back, User 👋</div>
			<div className="others flex items-center">
				<SearchOutlined className="mr-4" />
				<CalendarOutlined className="mr-4" />
				<DatePicker defaultValue={dayjs()} format={dateFormat2} className="mr-4"/>
				<Avatar size={30} icon={<UserOutlined className='scale-110'/>} className="flex items-center justify-center" />
			</div>
		</div>
	);
}
    