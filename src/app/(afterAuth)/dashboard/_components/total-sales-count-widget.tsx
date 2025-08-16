"use client";

import { useTotalCount } from "@/queries/dashboard";
import { YEAR_MONTH } from "@/shared/constants/dayjs-format";
import { formatDate } from "@/shared/utils/dayjs";
import useDateStore from "@/zustand/date";
import dayjs from "dayjs";

function TotalSalesCountWidget() {
  const date = useDateStore((state) => state.date);
  const getMonth = useDateStore((state) => state.getMonth);
  const { data } = useTotalCount(
    formatDate({ date: dayjs(date), format: YEAR_MONTH })
  );

  const selectedMonth = getMonth(date);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-2xl font-bold">{data?.count.toLocaleString()}건</div>
      <p className="text-xs text-muted-foreground">
        {selectedMonth}월 총 매출 건수
      </p>
    </div>
  );
}

export default TotalSalesCountWidget;
