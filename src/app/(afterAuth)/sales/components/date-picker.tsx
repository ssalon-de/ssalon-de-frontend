import { YEAR_MONTH_DAY } from "@/shared/constants/dayjs-format";
import { Button } from "@/shared/ui/button";
import useDateStore from "@/zustand/date";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = () => {
  const date = useDateStore((state) => state.date);
  const setDate = useDateStore((state) => state.setDate);

  const startOfWeek = dayjs(date).startOf("week");
  const thisWeekDays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  return (
    <div className="md:mt-[24px] md:gap-8 flex items-center justify-center gap-1 px-2">
      <Button onClick={() => {}} size="sm" variant="ghost">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <div className="flex items-center justify-center gap-1 md:gap-12">
        {thisWeekDays.map((day) => (
          <Button
            size="icon"
            key={day.format(YEAR_MONTH_DAY)}
            variant={day.isSame(date, "day") ? "default" : "ghost"}
            onClick={() => setDate(day.format(YEAR_MONTH_DAY))}
          >
            {day.get("date")}
          </Button>
        ))}
      </div>
      <Button onClick={() => {}} size="sm" variant="ghost">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DatePicker;
