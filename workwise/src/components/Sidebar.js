import axios from "axios";
import icon from "../icons/favicon.ico";
import SItem from "./sidebar_item";
import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { UserContext } from "../utils/contexts/User.js";
import { useContext } from "react";

const Sidebar = () => {
  const params = useParams();
  const {baseUrl} = useContext(UserContext);
  const [dark, setDark] = useState(false);

  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/projects`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      const { projects } = response.data;

      setProjects(projects);
      console.log(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleClick = (e) => {
    setShowInput(true);
  };

  const createProject = async (name) => {
    try {
      const response = await axios.post(
        `${baseUrl}/projects`,
        {
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setProjects([...projects, response.data.newProject]);
      setInput(""); 
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createProject(input);
    }
  };

  let Slide = (e) => {
    let x = document.querySelector(".sidebar");
    let child = x.childNodes;
    for (let i = 0; i < child.length; i++) {
      if (i != 2) {
        child[i].classList.add("hidden");
      }
    }
    x.classList.replace("w-[min(300px,33vw)]", "w-14");
    child[2].classList.remove("hidden");
  };

  let openUp = (e) => {
    e.target.parentElement.previousSibling.classList.replace(
      "opacity-50",
      "opacity-0"
    );
    console.log(e.target.parentElement.previousSibling.classList);
    let x = document.querySelector(".sidebar");
    let child = x.childNodes;
    for (let i = 0; i < child.length; i++) {
      if (i != 2) {
        child[i].classList.remove("hidden");
      }
    }
    x.classList.replace("w-14", "w-[min(300px,33vw)]");
    child[2].classList.add("hidden");
  };

  let themechange = (e) => {
    let x = document.querySelector(".themeslider");
    if (dark) {
      x.classList.replace("left-[58%]", "left-5");
      setTimeout(() => {
        x.classList.remove("mix-blend-difference");
        x.classList.remove("bg-white");
        e.target.classList.add("bg-white");
        // e.target.previousSibling.previousSibling.classList.add("bg-white")
      }, 100);
    } else {
      x.classList.replace("left-5", "left-[58%]");
      x.classList.add("mix-blend-difference");
      x.classList.add("bg-white");
      e.target.previousSibling.classList.remove("bg-white");
      // e.target.previousSibling.previousSibling.classList.remove("bg-white")
    }
    setDark(!dark);
  };

  return (
		<div
			className="sidebar h-[100vh] w-[min(300px,33vw)] transition-all text-[min(4vw,30px)]
        shadow-md shadow-black fixed"
			// onLoad={saved}
		>
			<div
				className="font-bold  h-10 cursor-pointer font-title
            flex mt-8 w-4/5 ml-auto mr-auto select-none items-center
            "
				onMouseEnter={(e) => {
					e.target.nextSibling.classList.replace("opacity-0", "opacity-50");
				}}
				onMouseLeave={(e) => {
					e.target.nextSibling.classList.replace("opacity-50", "opacity-0");
				}}
			>
				<img
					className="h-[min(4vw,40px)] mx-2"
					src={icon}
					alt="image not found"
				/>
				WorkWise
			</div>
			<div
				className="flex toggleslide absolute right-[2%] cursor-pointer justify-center items-center h-10 top-8  opacity-0 rounded-3xl transition"
				onClick={Slide}
			>
				<IoIosArrowRoundBack />
			</div>
			<div
				className=" hidden rounded-full hover:bg-gray-200 cursor-pointer h-10 w-10 absolute top-8 right-0 mr-2 flex justify-center items-center rotate-180"
				onClick={openUp}
			>
				<IoIosArrowRoundBack />
			</div>

			<div
				className="projects
        w-4/5 ml-auto mr-auto mt-12 p-3"
			>
				<div className="font-bold mb-3 text-[.6em]">Projects</div>
				{projects.map((project, i) =>
					project._id === params.section ? (
						<SItem key={i} keyno={i} project={project} selected />
					) : (
						<SItem key={i} keyno={i} project={project} />
					)
				)}

				<div className="flex ">
					<div
						id="add_item"
						className="cursor-pointer relative w-5 h-5 text-gray-300 mt-2 bg-gray-300 rounded-full flex items-center justify-center"
						onClick={handleClick}
					>
						<div className="h-1/2 border-[1px] border-gray-600 absolute"> </div>
						<div className="w-1/2 border-[1px] border-gray-600 absolute"></div>
					</div>
					{showInput && (
						<>
							<input
								type="text"
								autoFocus
								className="bg-gray-100 border-b-[1px] border-black outline-none text-[.45em] ml-2 w-36 text-black p-1 pl-2"
								placeholder="Add a project name"
								value={input}
								onChange={handleInputChange}
								onKeyPress={handleKeyPress}
							/>
						</>
					)}
				</div>
			</div>
			{/* <div className="select-none items-center justify-around flex text-[min(.5em,15px)] bg-[#f2f1f6] h-10 w-4/5 absolute bottom-10 rounded-full left-[8%] ">
				<div
					className="h-[70%] cursor-pointer rounded-full bg-white items-center w-1/3 flex justify-center"
					onClick={themechange}
				>
					Light
				</div>
				<div
					className="h-[70%] cursor-pointer rounded-full items-center w-1/3 flex justify-center"
					onClick={themechange}
				>
					Dark
				</div>
				<div className="themeslider absolute w-1/3 left-5 h-[70%] cursor-pointer transition-all  rounded-full "></div>
			</div> */}
		</div>
	);
};

export default Sidebar;
