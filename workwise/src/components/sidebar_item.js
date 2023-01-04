export default (props)=>{

    let textadd=(e)=>{
        if(e.key=="Enter")
        {
            let txt=e.target.value;
            e.target.previousSibling.classList.remove("hidden");
            e.target.previousSibling.innerHTML=txt;
            e.target.className="hidden";
            localStorage.setItem(props.keyno,txt);
        }
    }
    return (
        <div className="h-10 text-[.4em] relative flex items-center text-gray-400">
            <div className=" h-full border-[1px] ml-[0.58rem] border-gray-300" ></div>
            <div className="w-4 mr-2 border-[1px] border-gray-300"> </div>
            <div className={`${localStorage.getItem(props.keyno)==null?"hidden":""} cursor-pointer px-3 py-1 rounded-xl transition hover:bg-gray-200 hover:text-gray-800`}>
                {localStorage.getItem(props.keyno)}
            </div>
            <input type="text" autoFocus
            className={`${localStorage.getItem(props.keyno)==null?"":"hidden"} bg-gray-100 border-b-[1px] border-black outline-none w-4/5 text-black p-1 pl-2`}
            onKeyDown={textadd}
            />
        </div>
    );
}