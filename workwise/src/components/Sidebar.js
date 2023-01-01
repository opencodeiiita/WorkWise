import icon from "../icons/favicon.ico";
import SItem from "./sidebar_item";
import { useState,useEffect } from "react";
import {IoIosArrowRoundBack} from "react-icons/io";

export default ()=>
{
    const [dark,setDark]=useState(false);
    const [items,setItems]=useState([]);
    let addItem = ()=>{
        let n=items.length;
        setItems(items.concat(<SItem key={n}/>));
    }
    let Slide=(e)=>{
        let x=document.querySelector(".sidebar");
        let child=x.childNodes;
        for(let i=0;i<child.length;i++)
        {
            if(i!=2)
            {
                child[i].classList.add("hidden");
            }
        }
        x.classList.replace('w-[min(350px,35vw)]','w-14');
        child[2].classList.remove('hidden');
    }
    let openUp=(e)=>
    {
        let x=document.querySelector(".sidebar");
        let child=x.childNodes;
        for(let i=0;i<child.length;i++)
        {
            if(i!=2)
            {
                child[i].classList.remove("hidden");
            }
        }
        x.classList.replace('w-14','w-[min(350px,35vw)]');
        child[2].classList.add('hidden');

    }
    let themechange=(e)=>{
        if(dark)
        {
            e.target.classList.replace("left-[58%]","left-5")
            setTimeout(()=>{
                e.target.classList.remove("mix-blend-difference");
                e.target.classList.remove("bg-white");
                e.target.previousSibling.previousSibling.classList.add("bg-white")
            },100);



        }
        else
        {
            e.target.classList.replace("left-5","left-[58%]");
            e.target.classList.add("mix-blend-difference");
            e.target.classList.add("bg-white");
            e.target.previousSibling.previousSibling.classList.remove("bg-white")
        }
        setDark(!dark);
    }
    return (
        <div className="sidebar h-[100vh] w-[min(350px,35vw)] transition-all text-[min(4vw,45px)]
        shadow-md shadow-black fixed
        
        ">
            <div className="font-bold  h-10
            flex mt-8 w-4/5 ml-auto mr-auto select-none items-center
            " >
                    <img 
                    className="h-[min(4vw,40px)] mx-2"
                    src={icon} alt="image not found"/>
                    WorkWise
            </div>
            <div 
                className="toggleslide flex absolute left-[10%] cursor-pointer justify-center items-center h-10 top-8 w-4/5 bg-white outline opacity-0 rounded-3xl transition"
                onClick={Slide}
            >
                    <IoIosArrowRoundBack/>
            </div>
            <div className=" hidden rounded-full hover:bg-gray-200 cursor-pointer h-10 w-10 absolute top-8 right-0 mr-2 flex justify-center items-center rotate-180"
            onClick={openUp}
            >
                <IoIosArrowRoundBack/>

            </div>

        <div className="projects
        w-4/5 ml-auto mr-auto mt-12 p-3
        ">
            <div className="font-bold mb-3 text-[.5em]">
                    Projects
            </div>
            {items}
            <div id="add_item"
            className="cursor-pointer relative w-5 h-5 text-gray-300 mt-2 bg-gray-300 rounded-full flex items-center justify-center"
            onClick={addItem}
            >
                <div className="h-1/2 border-[1px] border-gray-600 absolute"> </div>
                <div className="w-1/2 border-[1px] border-gray-600 absolute"></div>
            </div>
        </div>
        <div className="select-none items-center justify-around flex text-[min(.5em,15px)] bg-[#f2f1f6] h-10 w-4/5 absolute bottom-10 rounded-full left-[8%] ">
            <div className="h-[70%] rounded-full bg-white items-center w-1/3 flex justify-center">Light</div>
            <div className="h-[70%] rounded-full items-center w-1/3 flex justify-center">Dark</div>
            <div className="absolute w-1/3 left-5 h-[70%] cursor-pointer transition-all  rounded-full "
                onClick={themechange}
            ></div>
        </div>
        </div>

    );
}   