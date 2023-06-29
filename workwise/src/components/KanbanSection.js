import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Cards";
import { DragDropContext } from "react-beautiful-dnd";  
import ColumnsList from "./ColumnsList";
import axios from "axios";
import { UserContext } from "../utils/contexts/User.js";
import { useContext } from "react";

const KanbanSection = () => {
  const params = useParams();
  const { baseUrl } = useContext(UserContext);
  let cardsData = [[], [], [], []];
  const columnTitles = ["Backlog", "To Do", "In Progress", "Review"];
  const Columns = ["backlog", "todo", "in-progress", "review"];
  const [elements, setElements] = useState(cardsData);
  const [project, setProject] = useState({});

    const getProjectCards = async () => {
        for(let i = 0; i < Columns.length; i++) {
          const res = await axios.get(
            `${baseUrl}/projects/${params.section}/cards/${Columns[i]}`, 
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              }, 
           }
          );
          cardsData[i] = res.data.cards;
      }
      setElements(cardsData);
    };

    const getProject = async () => { 
      try {
        const response = await axios.get(
					`${baseUrl}/projects/${params.section}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
						},
					}
				);
        setProject(response.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const updateProjectCards = async (id, categoryIndex) => {
      try {
        const response = await axios.put(
					`${baseUrl}/api/v1/cards/${id}`,
					{
						category: Columns[categoryIndex],
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
						},
					}
				);
      } catch (error) {
        console.error("Error updating project card:", error);
      }
    };

    useEffect(() => {
      getProjectCards();
    }, [project]);

    useEffect(()=>{
      getProject();
    },[])
    // useEffect(() => {
    //   if (localStorage.getItem(params.section) === null)
    //     localStorage.setItem(
    //       params.section,
    //       JSON.stringify({
    //         title: "test",
    //         description: "text",
    //         others: "no",
    //         data: [cardsData],
    //       })
    //     );
    //   else {
    //     let data = JSON.parse(localStorage.getItem(params.section));
    //     setElements(data.data[0]);
    //   }
    // }, []);

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
      
    updateProjectCards(removedElement._id, result.destination.droppableId);

    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
      );
      setElements(listCopy);
    };

  return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className=" overflow-auto bg-[#F3F4F8] h-[100vh] w-[max(calc(100%-300px),67vw)] absolute right-0">
					<ColumnsList />
					{project && (
            <div className="title ml-5 mb-5 text-3xl font-semibold font-title">{project.name}</div>
          )}
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
