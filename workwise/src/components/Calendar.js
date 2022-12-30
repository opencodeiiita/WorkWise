import React from "react";
import { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import { Dayjs } from "dayjs";

const getMonthData = (value = Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarComponent = () => {
  const monthCellRender = (value = Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <>
     
        <Calendar
          className="w-1/1 p-3"
          fullscreen={false}
          monthCellRender={monthCellRender}
        />
     
    </>
  );
};

export default CalendarComponent;
