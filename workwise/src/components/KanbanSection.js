import React from "react";
import { useParams } from "react-router-dom";
// import Kanban from "../pages/kanban";

const KanbanSection = () => {
  const params = useParams();
  console.log(params.section);
  return (
    <>
      <div className="bg-red-500 h-48 w-[max(calc(100%-300px),77vw)] absolute left-[min(300px,33vw)]">
        {params.section}
      </div>
    </>
  );
};

export default KanbanSection;
