import React, { useEffect,useContext } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Draggable } from "react-beautiful-dnd";
import { Button, Popover } from "antd";
import { Tag } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, InputNumber } from "antd";
import { Modal, Select, Image } from "antd";
import { useState } from "react";
import { UserContext } from "../utils/contexts/User.js";


function Card(props) {
  const params = useParams();
  const { baseUrl } = useContext(UserContext);
 
  const card = props.card;
  const dateFormat = "DD/MM/YYYY";
  const text = <span>Actions</span>;
  let cardsData = [[], [], [], []];
  const Columns = ["backlog", "todo", "in-progress", "review"];
  const [imgUrl, setImgUrl] = useState(card?.imageUrl);
  const [priority, setPriority] = useState(card?.priority);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm();

  function getNames(objArray) {
    const names = [];

    for (let i = 0; i < objArray.length; i++) {
      const obj = objArray[i];
      const name = obj.name;

      names.push(name);
    }

    return names;
  }

  const [tags, setTags] = useState(getNames(card?.tags));

  useEffect(() => {
    if (isModalOpen) {
      console.log(tags);
    }
  }, [isModalOpen]);

  const getProjectCards = async () => {
    for (let i = 0; i < Columns.length; i++) {
      const res = await axios.get(
        `${baseUrl}/projects/${params.section}/cards/${Columns[i]}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      cardsData[i] = res.data.cards;
    }
    props.setElements(cardsData);
  };

  const handleDelete = async () => {
    await axios.delete(`${baseUrl}/cards/${card._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });

    getProjectCards();
  };

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };

  const onChange = (value) => {
    setPriority(value);
  };

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

  const onFinish = async (values) => {
    await axios.put(
      `${baseUrl}/cards/${card._id}`,
      {
        title: values.title,
        description: values.description,
        startDate: values.startDate,
        imageUrl: imgUrl,
        priority: priority,
        tags: tags,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    setIsModalOpen(false);
    getProjectCards();
  };

  const content = (
    <>
      <div className="flex flex-col">
        <Button
          className="mb-2"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
        <Button
          className="mb-2"
          onClick={() => {
            setOpen(false);
            showModal();
          }}
        >
          Edit
        </Button>
      </div>
    </>
  );

  return (
    <Draggable draggableId={card._id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <>
            <Popover
              placement="right"
              title={text}
              content={content}
              open={open}
              onOpenChange={handleOpenChange}
              trigger="contextMenu"
            >
              <div
                ref={provided.innerRef}
                snapshot={snapshot}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="w-[88%] m-4 h-max bg-[#FFFFFF] rounded-lg overflow-hidden"
              >
                <div className="tags flex justify-start ml-4 mr-4 mt-4 mb-2 overflow-x-scroll">
                  {props.card.tags.map((item, index) => {
                    return (
                      <Tag
                        key={index}
                        bordered={false}
                        class={`inline-block rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2`}
                        color={item.color}
                      >
                        {item.name}
                      </Tag>
                    );
                  
                  })}
                </div>
                {card?.imageUrl && (
                  <div className="flex w-full h-auto justify-center">
                    <img
                      className="w-[90%] aspect-video rounded"
                      src={card?.imageUrl}
                      alt=""
                    />
                  </div>
                )}
                {card?.imageUrl && (
                  <div className="px-5 pt-4 mt-4">
                    <div className="font-medium font-body text-base mb-1">
                      {card?.title}
                    </div>
                    <p className="text-gray-500 font-body text-base">
                      {card?.description}
                    </p>
                  </div>
                )}
                {!card?.imageUrl && (
                  <div className="px-5">
                    <div className="font-medium font-body text-base mb-1">
                      {card?.title}
                    </div>
                    <p className="font-body text-gray-500 text-base">
                      {card?.description}
                    </p>
                  </div>
                )}
                <div className="flex justify-between px-5 pt-3">
                  {card?.startDate && (
                    <div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
                      <DatePicker
                        defaultValue={dayjs(card?.startDate, dateFormat)}
                        format={dateFormat}
                      />
                    </div>
                  )}
                  {!card?.startDate && (
                    <div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
                      <DatePicker defaultValue={dayjs()} format={dateFormat} />
                    </div>
                  )}
                  {card?.priority === "high" && (
                    <span class="bg-red-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-red-700 px-2 mt-2">
                      {card?.priority}
                    </span>
                  )}
                  {card?.priority === "medium" && (
                    <span class="bg-lime-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-lime-700 px-2 mt-2">
                      {card?.priority.slice(0, 3)}
                    </span>
                  )}
                  {card?.priority === "low" && (
                    <span class="bg-gray-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-gray-700 px-3 mt-2">
                      {card.priority}
                    </span>
                  )}
                </div>
              </div>
            </Popover>

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
                <Form.Item label="Card Title" name="title">
                  <Input
                    placeholder="Enter A Title"
                    defaultValue={card.title}
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter a valid Description"
                    defaultValue={card.description}
                  />
                </Form.Item>
                <Form.Item label="Priority" name="priority">
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    defaultValue={card.priority}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "low",
                        label: "Low",
                      },
                      {
                        value: "medium",
                        label: "Medium",
                      },
                      {
                        value: "high",
                        label: "High",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Tag"
                  name="tags"
                  rules={[{ required: false }]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    defaultValue={tags}
                    value={tags}
                    onChange={handleTagChange}
                    placeholder="Blog Tags"
                    className="bg-white"
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="startDate"
                  rules={[{ required: false }]}
                >
                  <DatePicker
                    defaultValue={dayjs(card.startDate, dateFormat)}
                    format={dateFormat}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="imageUrl"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter Image url"
                    defaultValue={card.imageUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                  {imgUrl && (
                    <>
                      <div className="flex justify-center items-center mt-4 pr-2">
                        <Image width={300} src={imgUrl} />
                      </div>
                    </>
                  )}
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
      }}
    </Draggable>
  );
}

export default Card;
