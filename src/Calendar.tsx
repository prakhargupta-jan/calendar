import { Popover } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


const Calendar = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (newDate: Date) => void;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const [updatedDate, setUpdatedDate] = useState(new Date(date));
  const changeYear = (increment: boolean) => {
    if (increment) {
      setCurrentDate(
        new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        )
      );
    } else {
      setCurrentDate(
        new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        )
      );
    }
  };
  const changeMonth = (increment: boolean) => {
    if (increment) {
      if (currentDate.getMonth() === 11)
        setCurrentDate(
          new Date(currentDate.getFullYear() + 1, 0, currentDate.getDate())
        );
      else
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          )
        );
    } else {
      if (currentDate.getMonth() === 0)
        setCurrentDate(
          new Date(currentDate.getFullYear() - 1, 11, currentDate.getDate())
        );
      else
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          )
        );
    }
  };
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const rows: [Date, Date][] = [];
  const currDate = new Date(startDate);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );
  while (true) {
    const day = currDate.getDay();
    if (day == 0) {
      if (currDate.getDate() + 6 > endDate.getDate()) {
        rows.push([currDate, endDate]);
        break;
      } else {
        rows.push([
          new Date(currDate),
          new Date(
            currDate.getFullYear(),
            currDate.getMonth(),
            currDate.getDate() + 6
          ),
        ]);
        if (currDate.getDate() + 6 == endDate.getDate()) break;
        currDate.setDate(currDate.getDate() + 7);
      }
    } else {
      rows.push([
        new Date(currDate),
        new Date(
          currDate.getFullYear(),
          currDate.getMonth(),
          currDate.getDate() + 6 - day
        ),
      ]);
      currDate.setDate(currDate.getDate() + 7 - day);
    }
  }

  return (
    <Popover className="relative ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none">
      <Popover.Button>
        <CalendarDaysIcon className="w-10" />
      </Popover.Button>
      <Popover.Panel className="top-14 absolute z-10 text-black">
        <div className="w-72 bg-gray-50 p-2 rounded-md border border-gray-300">
          <div className="flex flex-row justify-between px-4 py-2">
            <button onClick={() => changeYear(false)} className="text-sm">
              {"<"}
            </button>
            <div className="text-lg">{currentDate.getFullYear()}</div>
            <button onClick={() => changeYear(true)} className="text-sm">
              {">"}
            </button>
          </div>
          <hr />
          <div className="flex flex-row justify-between px-4 py-2">
            <button onClick={() => changeMonth(false)} className="text-sm">
              {"<"}
            </button>
            <div className="text-lg">
              {currentDate.toLocaleString("default", { month: "long" })}
            </div>
            <button onClick={() => changeMonth(true)} className="text-sm">
              {">"}
            </button>
          </div>
          <hr />
          <div className="flex flex-row justify-evenly py-2">
            {days.map((day) => (
              <div className="flex-1 flex flex-col items-center justify-between text-sm font-bold">
                {day}
              </div>
            ))}
          </div>
          {rows.map((row, idx) => (
            <CalendarRow
            key={idx}
              startDate={row[0]}
              endDate={row[1]}
              date={updatedDate}
              setActiveDate={(newDate) => {setUpdatedDate(newDate); onChange(newDate)}}
            />
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarRow = ({
  startDate,
  endDate,
  setActiveDate,
  date,
}: {
  startDate: Date;
  endDate: Date;
  setActiveDate: (newDate: Date) => void;
  date: Date;
}) => {
  const content = [];
  for (let i = 0; i < startDate.getDay(); i++) {
    const currDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() - 1,
      0
    );
    currDate.setDate(currDate.getDate() - startDate.getDay() - 1 + i);
    content.push(
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <div className="text-sm">{currDate.getDate()}</div>
      </div>
    );
  }
  for (let i = startDate.getDay(); i <= endDate.getDay(); i++) {
    const currDate = new Date(startDate);
    currDate.setDate(currDate.getDate() + i - startDate.getDay());
    content.push(
      <div
        className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${
          date.getDate() === currDate.getDate() &&
          date.getMonth() === currDate.getMonth() &&
          date.getFullYear() === currDate.getFullYear()
            ? "bg-indigo-600 text-white"
            : "text-black"
        }
        ${
            currDate.getUTCDate() === new Date().getUTCDate() &&
            currDate.getMonth() === new Date().getMonth() &&
            currDate.getFullYear() === new Date().getFullYear()
              ? "border border-indigo-600"
              : ""
        }
        `}
        onClick={() => setActiveDate(currDate)}
      >
        <div className="text-sm">{currDate.getDate()}</div>
      </div>
    );
  }
  for (let i = endDate.getDay() + 1; i < 7; i++) {
    const currDate = new Date(endDate);
    currDate.setDate(currDate.getDate() + i - endDate.getDay());
    content.push(
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <div className="text-sm">{currDate.getDate()}</div>
      </div>
    );
  }

  return <div className="flex flex-row">{content}</div>;
};

export default Calendar;
