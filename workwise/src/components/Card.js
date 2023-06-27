import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Draggable } from "react-beautiful-dnd";
import { Tag } from "antd";

function Card(props) {
  const card = props.card;
  const dateFormat = "DD/MM/YYYY";

  return (
    <Draggable draggableId={card._id} index={props.index}>
      {(provided, snapshot) => {
        return (
					<div
						ref={provided.innerRef}
						snapshot={snapshot}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="w-[88%] m-4 h-max bg-[#FFFFFF] rounded-lg overflow-hidden"
					>
						<div className="tags flex justify-start ml-4 mr-4 mt-4 mb-2 overflow-x-scroll">
							{props.card.tags.map((item, index) => {
								return (
									<Tag
										key={index}
										bordered={false}
										class={`inline-block rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2`}
										color={item.color}
									>
										{item.name}
									</Tag>
								);
								// if (item === "Research") {
								//   return (
								//     <span
								//       key={index}
								//       class="inline-block bg-blue-500 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
								//     >
								//       {item}
								//     </span>
								//   );
								// }
								// if (item === "Design") {
								//   return (
								//     <span
								//       key={index}
								//       class="inline-block bg-violet-700 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
								//     >
								//       {item}
								//     </span>
								//   );
								// }
								// if (item === "Content") {
								//   return (
								//     <span
								//       key={index}
								//       class="inline-block bg-amber-500 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
								//     >
								//       {item}
								//     </span>
								//   );
								// }
								// if (item === "Planning") {
								//   return (
								//     <span
								//       key={index}
								//       class="inline-block bg-orange-700 rounded px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2"
								//     >
								//       {item}
								//     </span>
								//   );
								// }
							})}
						</div>
						{card?.imageUrl && (
							<div className="flex w-full h-auto justify-center">
								<img
									className="w-[90%] aspect-video rounded"
									src={card?.imageUrl}
									alt=""
								/>
							</div>
						)}
						{card?.imageUrl && (
							<div className="px-5 pt-4 mt-4">
								<div className="font-medium font-body text-base mb-1">
									{card?.title}
								</div>
								<p className="text-gray-500 font-body text-base">
									{card?.description}
								</p>
							</div>
						)}
						{!card?.imageUrl && (
							<div className="px-5">
								<div className="font-medium font-body text-base mb-1">
									{card?.title}
								</div>
								<p className="font-body text-gray-500 text-base">
									{card?.description}
								</p>
							</div>
						)}
						<div className="flex justify-between px-5 pt-3">
							{card?.startDate && (
								<div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
									<DatePicker
										defaultValue={dayjs(card?.startDate, dateFormat)}
										format={dateFormat}
									/>
								</div>
							)}
							{!card?.startDate && (
								<div class="rounded w-32 py-1 text-sm font-medium font-body text-gray-900 mb-2">
									<DatePicker defaultValue={dayjs()} format={dateFormat} />
								</div>
							)}
							{card?.priority === "high" && (
								<span class="bg-red-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-red-700 px-2 mt-2">
									{card?.priority}
								</span>
							)}
							{card?.priority === "medium" && (
								<span class="bg-lime-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-lime-700 px-2 mt-2">
									{card?.priority.slice(0, 3)}
								</span>
							)}
							{card?.priority === "low" && (
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
