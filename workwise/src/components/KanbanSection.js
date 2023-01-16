import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Cards";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanSection = () => {
  const params = useParams();

  let cardsData = [[], [], [], []];
  const columnTitles = ["Backlog", "To Do", "In Progress", "Review"];

  const [elements, setElements] = useState(cardsData);
  useEffect(() => {
    if (localStorage.getItem(params.section) === null)
      localStorage.setItem(
        params.section,
        JSON.stringify({
          title: "test",
          description: "text",
          others: "no",
          data: [cardsData],
        })
      );
    else {
      let data = JSON.parse(localStorage.getItem(params.section));
      setElements(data.data[0]);
    }
  }, []);
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
    localStorage.setItem(
      params.section,
      JSON.stringify({
        title: "test",
        description: "text",
        others: "no",
        data: [listCopy],
      })
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=" overflow-auto bg-gray-200 h-[100vh] w-[max(calc(100%-300px),67vw)] absolute right-0">
          {params.section}
          <div className="flex flex-row flex-wrap characters">
            <div className="flex flex-row flex-wrap flex-1">
              <div className="flex-1">
                <Cards
                  id={0}
                  data={elements[0]}
                  setElements={setElements}
                  fullData={elements}
                  columnTitle={columnTitles[0]}
                />
              </div>
              <div className="flex-1 ">
                <Cards
                  id={1}
                  data={elements[1]}
                  setElements={setElements}
                  fullData={elements}
                  columnTitle={columnTitles[1]}
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap flex-1">
              <div className="flex-1 ">
                <Cards
                  id={2}
                  data={elements[2]}
                  setElements={setElements}
                  fullData={elements}
                  columnTitle={columnTitles[2]}
                />
              </div>
              <div className="flex-1 ">
                <Cards
                  id={3}
                  data={elements[3]}
                  setElements={setElements}
                  fullData={elements}
                  columnTitle={columnTitles[3]}
                />
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};
export default KanbanSection;
