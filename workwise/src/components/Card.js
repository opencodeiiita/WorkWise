import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function Card(props){
    const card = props.card
    const dateFormat = 'YYYY-MM-DD';
    return(
        <div className="w-64 m-4 h-max bg-gray-50 rounded-lg overflow-hidden">
            <div className="m-4">
                {card.category==='Research' &&
                    <span class="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2">{card.category}</span>
                }
                {card.category==='Content' &&
                    <span class="inline-block bg-amber-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2">{card.category}</span>
                }
                {card.category==='Design' &&
                    <span class="inline-block bg-violet-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2">{card.category}</span>
                }
                {card.category==='Planning' &&
                    <span class="inline-block bg-orange-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2">{card.category}</span>
                }
            </div>
            {card.imgUrl &&
                <div className="flex w-full h-28 justify-center">
                    <img className="w-56 h-28 rounded" src={card.imgUrl} alt="" />
                </div>
            }
            {card.imgUrl &&
                <div className="px-5 py-4">
                    <div className="font-bold text-base mb-2">{card.heading}</div>
                    <p className="text-gray-700 text-base">{card.desc}</p>
                </div>
            }
            {!card.imgUrl &&
                <div className="px-5">
                    <div className="font-bold text-base mb-2">{card.heading}</div>
                    <p className="text-gray-700 text-base">{card.desc}</p>
                </div>
            }
            <div className="flex justify-between px-5 pt-2 pb-2">
            {/* <span class="border-2 border-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">{card.date}</span> */}
            <div class="rounded w-32 py-1 text-sm font-semibold text-gray-900 mb-2">
                <DatePicker defaultValue={dayjs(card.date, dateFormat)} format={dateFormat} />
            </div>
            {card.priority==='High' &&
                <span class="bg-red-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-red-700 px-2 mt-2">{card.priority}</span>
            }
            {card.priority==='Mid' &&
                <span class="bg-lime-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-lime-700 px-3 mt-2">{card.priority}</span>
            }
            {card.priority==='Low' &&
                <span class="bg-gray-200 flex place-items-center rounded-full w-12 h-6 text-sm font-semibold text-gray-700 px-3 mt-2">{card.priority}</span>
            }
            </div>
        </div>
    )
}

export default Card