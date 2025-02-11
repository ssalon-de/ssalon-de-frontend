"use client";

import Spinner from "@/shared/ui/spinner";
import { useSales, useTotalAmount } from "@/queries/sales";
import useDateStore from "@/zustand/date";
import dayjs from "dayjs";
import { useMemo } from "react";

export function TotalSales() {
  const { date } = useDateStore();
  const { data = [] } = useSales(
    { date: dayjs(date).format("YYYY-MM-DD") },
    { enabled: !!date }
  );

  const {
    data: amount = 0,
    isLoading,
    isFetching,
  } = useTotalAmount(dayjs(date).format("YYYY-MM-DDTHH:mm"));

  const loading = useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching]
  );
  const totalCount = useMemo(() => data.length, [data]);

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0">
      <div className="flex gap-2 items-center tracking-wider">
        <span className="text-sm font-medium text-gray-600">총 매출</span>
        {loading ? (
          <Spinner />
        ) : (
          <p className="text-2xl font-bold">{amount.toLocaleString()}원</p>
        )}
      </div>
      <div className="hidden md:block border border-[bg-gray-200] m-2 mx-4" />
      <div className="flex gap-2 items-center tracking-wider">
        <span className="text-sm font-medium text-gray-600">예약 건수</span>
        {loading ? (
          <Spinner />
        ) : (
          <p className="text-2xl font-bold">{totalCount.toLocaleString()}건</p>
        )}
      </div>
    </div>
  );
}
