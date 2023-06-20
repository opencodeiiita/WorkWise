import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input, InputNumber } from "antd";
import { BsPlus } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function Column({ index, data, setElements, title }) {
  const params = useParams();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inde = parseInt(index);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    let tempData = data[inde];
    let tempFullData = Object.values(data);
    // let tagsArray = [];
    // tagsArray.push(values.tags);
    values.tags = [values.tags];
    console.log(values.tags);
    values.id = `${Math.floor(Math.random() * 100000)}`;
    tempData = addToList(tempData, values);
    tempFullData[inde] = tempData;
    // tempFullData = Array.list(tempFullData);
    tempFullData = Object.values(tempFullData);
    setElements([...tempFullData]);
    console.log(data);
    localStorage.setItem(
      params.section,
      JSON.stringify({
        title: "test",
        description: "text",
        others: "no",
        data: [tempFullData],
      })
    );
    setIsModalOpen(false);
  };
  const addToList = (list, element) => {
    const result = Array.from(list);
    result.push(element);
    return result;
  };
  return (
    <>
      <div className="w-[88%] bg-white rounded-lg ml-4 mr-4">
        <div className="flex items-center justify-between p-2">
          <div className="col_name font-semibold p-2 font-body">{title}</div>
          <div className="icons flex flex-wrap justify-evenly">
            <div className="first mr-2 p-1">
              <FiMoreHorizontal className="text-[#768396]" />
            </div>
            <div className="second bg-[#D8DAFF] rounded-md p-1">
              <BsPlus fill="#6772FE" onClick={showModal} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="my-8"
        >
          <Form.Item
            label="Card Title"
            name="heading"
            rules={[{ required: true, message: "Please enter a valid title." }]}
          >
            <Input placeholder="Enter A Title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: false }]}
          >
            <Input placeholder="Enter a valid Description" />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: false }]}>
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              { required: true, message: "Please enter a valid priority" },
            ]}
          >
            <Input placeholder="High/Mid/Low" />
          </Form.Item>
          <Form.Item label="Tag" name="tags" rules={[{ required: false }]}>
            <Input placeholder="Enter a tag" />
          </Form.Item>
          <Form.Item label="Image" name="imgUrl" rules={[{ required: false }]}>
            <Input placeholder="Enter Image url" />
          </Form.Item>
          <Form.Item className=" flex justify-end px-10">
            <Button htmlType="submit" className="">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

// {
// 	id: "21",
// 	tags: ["Research", "Content"],
// 	imgUrl: "https://picsum.photos/seed/picsum/200/300",
// 	heading: "This is heading",
// 	desc: "This is the description",
// 	date: "2022-08-09",
// 	priority: "High",
//   },
