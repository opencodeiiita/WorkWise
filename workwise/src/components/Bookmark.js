import React, { useState, useEffect } from "react";
import BookmarkIcon from "../icons/BookMarkIcon.svg";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";

const Bookmark = () => {
  const [show, setShow] = useState(false);
  const [icons, setIcons] = useState([]);
  const [addUrl, setAddUrl] = useState("");

  //states for modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    //To remove https:// from the input
    const tempUrl = addUrl.replace(/^https?:\/\//, "");
    //sending is updated url
    await axios
      .get(`http://favicongrabber.com/api/grab/${tempUrl}`)
      .then((res) => {
        //Storing a local item with the key named bookmarks
        //converting the json file into string as localStorage only stores string.
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([
            ...icons,
            { image: res.data.icons[1].src, url: res.data.domain },
          ])
        );
        //updating state to hold the new bookmark icon
        setIcons([
          ...icons,
          { image: res.data.icons[1].src, url: res.data.domain },
        ]);
      })
      .catch((err) => {
        //taking first character to input to store as text
        const firstChar = tempUrl[0].toUpperCase();
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([...icons, { image: firstChar, url: tempUrl }])
        );
        setIcons([...icons, { image: firstChar, url: tempUrl }]);
      });
    //resetting url input
    setAddUrl("");
    //doing this so that the the transition from bookmark adding and modal closing is smooth
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 300);
  };
  const handleCancel = () => {
    //to clear input and close modal
    setAddUrl("");
    setOpen(false);
  };

  const showDrawer = () => setShow(!show);

  const addIcon = () => showModal();
  //to rerender app when icons is updated
  useEffect(() => {}, [icons]);
  //to get data from local page when the page first renders.
  //also need to parse the string as we need data in json.
  useEffect(() => {
    const tempJSON = JSON.parse(localStorage.getItem("bookmarks"));
    if (tempJSON) setIcons(tempJSON);
  }, []);
  return (
    <>
      <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Add"
      >
        <Input
          className="mt-8 bg-[#D9D9D94C] text-white"
          placeholder="Enter A URL"
          value={addUrl}
          onChange={(e) => setAddUrl(e.target.value)}
        />
      </Modal>
      <div className="absolute h-12 pt-1  left-4 top-1 rounded-lg">
        <img
          src={BookmarkIcon}
          alt="bookMarkIcon"
          className=" absolute left-1 top-[9px] h-10 w-10 opacity-100"
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
          {icons.map((icon, index) => {
            return (
              <a
                key={index}
                className={`${
                  icon.image.length === 1
                    ? "text-[22px] bg-[#FFFFFF4C] rounded-full h-10 w-10 pt-[2px] mx-1 font-bold"
                    : "text-[0px]"
                } rounded-full px-1`}
                target="_blank"
                href={`http://${icon.url}`}
              >
                {icon.image.length === 1 ? (
                  icon.image
                ) : (
                  <img
                    src={icon.image}
                    className=" bg-[#FFFFFF8C] pt-1 rounded-full h-10 w-10 pb-1 px-1 hover:drop-shadow-[0_0_3px_black]"
                  />
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
          {/* <PlusOutlined
            height="22px"
            width="22px"
            onClick={addIcon}
            className={`h-6 w-6 mx-1 relative -top-2 inline-block rounded-full bg-[#D9D9D94C] hover:drop-shadow-[0_0_3px_grey]`}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Bookmark;
