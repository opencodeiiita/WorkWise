import React from 'react'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Form, Input, InputNumber } from "antd";
import {BsPlus} from 'react-icons/bs'
import {FiMoreHorizontal} from 'react-icons/fi'

export default function Column() {
	const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

		const showModal = () => {
			setIsModalOpen(true);
		};

		const handleOk = () => {
			setIsModalOpen(false);
		};

		const handleCancel = () => {
			setIsModalOpen(false);
		};
		const onFinish = (values) => {
			console.log("Success:", values);
			setIsModalOpen(false);
		};
  return (
		<>
			<div className="w-[88%] bg-white rounded-lg ml-4 mr-4">
				<div className="flex items-center justify-between p-2">
					<div className="col_name">Backlog</div>
					<div className="icons flex flex-wrap justify-evenly">
						<div className="first mr-2">
							<FiMoreHorizontal />
						</div>
						<div className="second">
							<BsPlus onClick={showModal} />
						</div>
					</div>
				</div>
			</div>
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="Card Title"
						name="title"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="desc"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="desc"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
