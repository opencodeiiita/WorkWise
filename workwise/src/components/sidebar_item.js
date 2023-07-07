import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const SItem = (props) => {
  const [counter, setCounter] = useState(0);
  const [projectName, setProjectName] = useState("");

  //   let textadd = (e) => {
  //     if (e.key === "Enter") {
  //       let txt = e.target.value;
  //       if (txt !== null || txt !== "") {
  //         e.target.previousSibling.classList.remove("hidden");
  //         e.target.previousSibling.childNodes[1].innerHTML = txt;
  //         e.target.className = "hidden";
  //         localStorage.setItem(props.keyno, txt);
  //         setCounter(counter + 1);
  //       }
  //     }
  //   };

  let select = (e) => {
    e.target.nextSibling.classList.add("bg-gray-200");
    e.target.nextSibling.classList.add("text-gray-800");
  };

  let deselect = (e) => {
    e.target.nextSibling.classList.remove("bg-gray-200");
    e.target.nextSibling.classList.remove("text-gray-800");
  };

  return (
    <div className="h-10 text-[.5em] relative flex items-center text-gray-400">
      <div className="h-full border-[1px] ml-[0.58rem] border-gray-300"></div>
      <div className="w-4 mr-2 border-[1px] border-gray-300"> </div>
      <label className="flex">
        <input
          type="radio"
          className={`cursor-pointer opacity-100 w-0`}
          name="projects"
          onFocus={select}
          onBlur={deselect}
        />
        <Link to={`/kanban/${props.project._id}`}>
          <div
            className={`${
              props.selected ? "bg-gray-200 text-white" : ""
            } cursor-pointer px-3 py-1 rounded-xl transition text-gray-600 hover:bg-gray-200 hover:text-gray-800`}
          >
            {props.project.name}
          </div>
        </Link>
      </label>
      {/* <input
        type="text"
        autoFocus
        className={`${
          localStorage.getItem(props.keyno) === null ? "" : "hidden"
        } bg-gray-100 border-b-[1px] border-black outline-none w-4/5 text-black p-1 pl-2`}
        onKeyDown={textadd}
      /> */}

      
    </div>
  );
};

export default SItem;
