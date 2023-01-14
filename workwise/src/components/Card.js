import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Draggable } from "react-beautiful-dnd";
function Card(props) {
  const card = props.card;
  const dateFormat = "YYYY-MM-DD";
  const dateFormat2 = "MMM DD, YYYY";
  return (
    <Draggable draggableId={card.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-[88%] m-4 h-max bg-gray-50 rounded-lg overflow-hidden"
          >
            <div className="tags flex justify-start ml-4 mr-4 mt-4 mb-2 overflow-x-scroll">
              {card?.tags.map((item, index) => {
                if (item === "Research") {
                  // return (
                  <span
                    key={index}
                    class="inline-block bg-blue-500 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
                  >
                    {item}
                  </span>;
                  // );
                }
                if (item === "Design") {
                  // return (
                  <span
                    key={index}
                    class="inline-block bg-violet-700 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
                  >
                    {item}
                  </span>;
                  // );
                }
                if (item === "Content") {
                  // return (
                  <span
                    key={index}
                    class="inline-block bg-amber-500 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
                  >
                    {item}
                  </span>;
                  // );
                }
                if (item === "Planning") {
                  // return (
                  <span
                    key={index}
                    class="inline-block bg-orange-700 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
                  >
                    {item}
                  </span>;
                  // );
                }
              })}
            </div>
            {card?.imgUrl && (
              <div className="flex w-full h-auto justify-center">
                <img
                  className="w-[90%] aspect-video rounded"
                  src={card?.imgUrl}
                  alt=""
                />
              </div>
            )}
            {card?.imgUrl && (
              <div className="px-5 pt-4 mt-4">
                <div className="font-medium font-body text-base mb-1">
                  {card?.heading}
                </div>
                <p className="text-gray-500 font-body text-base">
                  {card?.desc}
                </p>
              </div>
            )}
            {!card?.imgUrl && (
              <div className="px-5">
                <div className="font-medium font-body text-base mb-1">
                  {card?.heading}
                </div>
                <p className="font-body text-gray-500 text-base">
                  {card?.desc}
                </p>
              </div>
            )}
            <div className="flex justify-between px-5 pt-3">
              {card?.date && (
                <div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
                  <DatePicker
                    defaultValue={dayjs(card?.date, dateFormat)}
                    format={dateFormat2}
                  />
                </div>
              )}
              {!card?.date && (
                <div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
                  <DatePicker defaultValue={dayjs()} format={dateFormat2} />
                </div>
              )}
              {card?.priority === "High" && (
                <span class="bg-red-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-red-700 px-2 mt-2">
                  {card?.priority}
                </span>
              )}
              {card?.priority === "Mid" && (
                <span class="bg-lime-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-lime-700 px-3 mt-2">
                  {card?.priority}
                </span>
              )}
              {card?.priority === "Low" && (
                <span class="bg-gray-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-gray-700 px-3 mt-2">
                  {card.priority}
                </span>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
