"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDateStore from "@/zustand/date";
import { useStore } from "@/shared/hooks/use-store";

export default function Calendar() {
  const today = new Date();
  const { setDate } = useDateStore();
  const date = useStore(useDateStore, (state) => state.date);
  const [selectedDate, setSelectedDate] = useState(date ?? today);
  const [currentDate, setCurrentDate] = useState(date ?? today);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    const nowDate = selectedDate ?? new Date();
    return date.toDateString() === nowDate.toDateString();
  };

  useEffect(() => {
    setDate(selectedDate);
  }, [setDate, selectedDate]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </Button>
        <span className="font-semibold text-gray-700">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1
          );
          return (
            <div
              key={index + 1}
              className={`text-sm p-1 rounded-full transition-colors cursor-pointer ${
                isSelected(date)
                  ? "bg-blue-500 text-white"
                  : isToday(date)
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
