"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale("ko", {
  months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
  weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
  weekdaysShort: "일_월_화_수_목_금_토".split("_"),
});

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = Array.from(
    { length: currentDate.daysInMonth() },
    (_, i) => currentDate.startOf("month").add(i, "day")
  );

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  // Mock data for sales comparison
  const getSalesDifference = (date: Dayjs) => {
    // const random = Math.random();
    console.log(date);
    const amount = Math.floor(0 * 100000);
    return 0 > 0.5
      ? { value: `+${amount}`, color: "text-blue-500" }
      : { value: `-${amount}`, color: "text-red-500" };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {currentDate.format("YYYY년 MM월")}
        </h2>
        <div className="space-x-2">
          <Button onClick={prevMonth} size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {daysInMonth.map((date, index) => {
          const { value, color } = getSalesDifference(date);
          const parsedValue = Number(value).toLocaleString();
          const isToday = date.isSame(dayjs(), "day");
          return (
            <div
              key={date.toString()}
              className={`aspect-square p-1 text-center flex flex-col justify-between ${
                isToday ? "bg-blue-100" : ""
              }`}
              style={{
                gridColumnStart: index === 0 ? date.day() + 1 : "auto",
              }}
            >
              <div
                className={`font-semibold ${isToday ? "text-blue-500" : ""}`}
              >
                {date.format("D")}
              </div>
              <div className={`text-[7px] ${color}`}>{parsedValue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
