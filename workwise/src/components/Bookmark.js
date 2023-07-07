import React, { useState, useEffect, useContext } from "react";
import BookmarkIcon from "../icons/BookMarkIcon.svg";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";
import { UserContext } from "../utils/contexts/User.js";
import { IconContext } from "react-icons";
import {Avatar} from "antd";

const Bookmark = () => {
  const [show, setShow] = useState(false);
  const { baseUrl } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [addUrl, setAddUrl] = useState("");
  const [addName, setName] = useState("");

  // States for modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/bookmarks`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
				},
			});
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const createBookmark = async (url, name, imageUrl) => {
    try {
      const data = {
        url: url,
        name: name,
        imageUrl: imageUrl
      };
  
      const response = await axios.post(
				`${baseUrl}/bookmarks`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
					},
				}
			);
  
      setBookmarks([...bookmarks, response.data]);
    } catch (error) {
      console.error("Error creating bookmark:", error);
    }
  };
  

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setAddUrl("");
    setName("");
    setOpen(false);
  };
  
  const handleOk = async () => {
    setConfirmLoading(true);
    const tempUrl = addUrl.replace(/^https?:\/\//, "");
    const imageUrl = `https://www.google.com/s2/favicons?domain=${tempUrl}&sz=128`;
  
    try {
      await createBookmark(tempUrl, addName, imageUrl); 
    } catch (error) {
      console.error("Error creating bookmark:", error);
    }
  
    setAddUrl("");
    setName(""); // Clear addName state
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 300);
  };
  

  const showDrawer = () => setShow(!show);

  const addIcon = () => showModal();

  useEffect(() => {
    fetchBookmarks();
  }, []);

 

  return (
    <>
      <Modal
        title=""
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Add"
        className="hs"
      >
        <Input
          className="mt-8 bg-[#D9D9D94C] text-white"
          placeholder="Enter A URL"
          value={addUrl}
          onChange={(e) => setAddUrl(e.target.value)}
        />
        <Input
          className="mt-8 bg-[#D9D9D94C] text-white"
          placeholder="Enter name"
          value={addName}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
      <div className="absolute h-12 pt-1 overf left-4 top-1 rounded-lg">
        <img
          src={BookmarkIcon}
          alt="bookMarkIcon"
          className=" absolute left-1  top-[9px] h-12 w-12 opacity-100"
          onClick={showDrawer}
        />
        <div
          className={`pl-1 py-1 flex h-12 bookmarkContainer shadow-md duration-200 bg-[#D9D9D94C] rounded-lg ${
            show ? "bookmarkContainer-active" : "bookmarkContainer-inactive"
          }`}
        >
          <img
            src={BookmarkIcon}
            alt="bookMarkIcon"
            className="h-10 w-10 hover:drop-shadow-[0_0_3px_black] "
            onClick={showDrawer}
          />
         {bookmarks &&
  bookmarks.length !== 0 &&
  bookmarks.map((bookmark, index) => {
    return (
      <a
        key={index}
        className="text-[22px] bg-[#FFFFFF4C] rounded-full h-10 w-10 pt-[2px] mx-1 font-bold rounded-full px-1"
        target="_blank"
        href={bookmark.url}
      >
        {bookmark.imageUrl && (
          <div className="overflow-hidden">
            <img
            src={bookmark.imageUrl}
            alt="Bookmark Icon"
            className="bookmark-icon rounded-full"
          />
          </div>
        )}
      </a>
    );
  })}
          <svg
            onClick={addIcon}
            className="h-12 w-12 relative -top-1 fill-[#FFFFFF8C] hover:drop-shadow-[0_0_3px_black]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="plus-circle">
                <rect width="24" height="24" opacity="0" />
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 11h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
