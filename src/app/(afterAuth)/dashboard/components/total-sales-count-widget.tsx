"use client";

import { useTotalCount } from "@/queries/dashboard";
import dayjs from "dayjs";

export function TotalSalesCountWidget() {
  const { data } = useTotalCount(dayjs().format("YYYY-MM"));

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="text-2xl font-bold">{data?.count.toLocaleString()}건</div>
      <p className="text-xs text-muted-foreground">이번 달 총 매출 건수</p>
    </div>
  );
}
