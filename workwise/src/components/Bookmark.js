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
      .catch((err) => console.log(err));
    //resetting url input
    setAddUrl("");
    //doing this so that the the transition from bookmark adding and modal closing is smooth
    setConfirmLoading(true);
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
    setIcons(JSON.parse(localStorage.getItem("bookmarks")));
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
          placeholder="Site name"
          value={addUrl}
          onChange={(e) => setAddUrl(e.target.value)}
        />
      </Modal>
      <div className="absolute left-4 top-4 rounded-lg">
        <img
          src={BookmarkIcon}
          alt="bookMarkIcon"
          className="absolute left-0 top-1 h-12 w-12 pb-1 opacity-100"
          onClick={showDrawer}
        />
        <div
          className={`bookmarkContainer shadow-md duration-200 bg-[#D9D9D94C] rounded-lg ${
            show ? "bookmarkContainer-active" : "bookmarkContainer-inactive"
          }`}
        >
          <img
            src={BookmarkIcon}
            alt="bookMarkIcon"
            className="h-12 w-12 pb-1 inline-block hover:drop-shadow-[0_0_3px_grey] "
            onClick={showDrawer}
          />
          {icons.map((icon) => {
            return (
              <a target="_blank" href={`http://${icon.url}`}>
                <img
                  src={icon.image}
                  className="h-12 w-13 pb-1 px-1 inline-block hover:drop-shadow-[0_0_3px_grey]"
                />
              </a>
            );
          })}
          <PlusOutlined
            onClick={addIcon}
            className={`h-[42px] w-[42px] mx-1 inline-block rounded-full bg-[#D9D9D94C] pt-[5px] -translate-y-[6px] hover:drop-shadow-[0_0_3px_grey]`}
          />
        </div>
      </div>
    </>
  );
};

export default Bookmark;
