import React from "react";
// import cardsData from "../utils/cards.json";
import Card from "./Card.js";
import { Droppable } from "react-beautiful-dnd";

function Cards(props) {
  return (
    <Droppable droppableId={`${props.id}`}>
      {/* key={props.id} */}
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-h-screen"
        >
          <div className="flex justify-start flex-col">
            {props.data.map((item, index) => (
              <Card key={item.id} card={item} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Cards;
