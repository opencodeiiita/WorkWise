import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Cards";
import { DragDropContext } from "react-beautiful-dnd";
// import Kanban from "../pages/kanban";

const KanbanSection = () => {
  const params = useParams();
  //Example on how to save header section of kanban
  // console.log(params.section);
  // localStorage.setItem(
  //   params.section,
  //   JSON.stringify({
  //     title: "test",
  //     description: "text",
  //     others: "no",
  //   })
  // );ui
  // console.log(JSON.parse(localStorage.getItem(params.section)));

  let cardsData1 = [
    {
      id: "11",
      tags: ["Research", "Content"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading",
      desc: "This is the description",
      date: "2022-08-09",
      priority: "High",
    },
    {
      id: "12",
      tags: ["Design"],
      heading: "This is heading 2",
      desc: "This is the description 2",
      priority: "Mid",
    },
    {
      id: "13",
      tags: ["Planning"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading 3",
      desc: "This is the description 3",
      date: "2012-03-04",
      priority: "Low",
    },
  ];

  let cardsData2 = [
    {
      id: "21",
      tags: ["Research", "Content"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading",
      desc: "This is the description",
      date: "2022-08-09",
      priority: "High",
    },
    {
      id: "22",
      tags: ["Design"],
      heading: "This is heading 2",
      desc: "This is the description 2",
      priority: "Mid",
    },
    {
      id: "23",
      tags: ["Planning"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading 3",
      desc: "This is the description 3",
      date: "2012-03-04",
      priority: "Low",
    },
  ];

  let cardsData3 = [
    {
      id: "31",
      tags: ["Research", "Content"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading",
      desc: "This is the description",
      date: "2022-08-09",
      priority: "High",
    },
    {
      id: "32",
      tags: ["Design"],
      heading: "This is heading 2",
      desc: "This is the description 2",
      priority: "Mid",
    },
    {
      id: "33",
      tags: ["Planning"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading 3",
      desc: "This is the description 3",
      date: "2012-03-04",
      priority: "Low",
    },
  ];

  let cardsData4 = [
    {
      id: "41",
      tags: ["Research", "Content"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading",
      desc: "This is the description",
      date: "2022-08-09",
      priority: "High",
    },
    {
      id: "42",
      tags: ["Design"],
      heading: "This is heading 2",
      desc: "This is the description 2",
      priority: "Mid",
    },
    {
      id: "43",
      tags: ["Planning"],
      imgUrl: "https://picsum.photos/seed/picsum/200/300",
      heading: "This is heading 3",
      desc: "This is the description 3",
      date: "2012-03-04",
      priority: "Low",
    },
  ];
  let cardsData = [cardsData1, cardsData2, cardsData3, cardsData4];

  const [elements, setElements] = useState(cardsData);

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    // console.log(result);
    result.splice(index, 0, element);
    // console.log(result);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    // console.log(listCopy);
    const sourceList = listCopy[result.source.droppableId];
    // console.log(sourceList);
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    // console.log(newSourceList);

    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    // console.log(destinationList);
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    console.log(listCopy);
    setElements(listCopy);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=" overflow-auto bg-gray-200 h-[100vh] w-[max(calc(100%-300px),67vw)] absolute right-0">
          {params.section}

          <div className="flex flex-row flex-wrap characters">
            <div className="flex flex-row flex-wrap flex-1">
              <div className="flex-1">
                <Cards id={0} data={elements[0]} />
              </div>
              <div className="flex-1 ">
                <Cards id={1} data={elements[1]} />
              </div>
            </div>
            <div className="flex flex-row flex-wrap flex-1">
              <div className="flex-1 ">
                <Cards id={2} data={elements[2]} />
              </div>
              <div className="flex-1 ">
                <Cards id={3} data={elements[3]} />
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanSection;
