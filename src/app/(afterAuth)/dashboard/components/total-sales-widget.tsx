"use client";

import dayjs from "dayjs";
import Spinner from "@/components/ui/spinner";
import { useMonthlyTotalSales } from "@/queries/dashboard";

export function TotalSalesWidget() {
  const { data: monthlyTotalSales, isFetching } = useMonthlyTotalSales(
    dayjs().format("YYYY-MM")
  );

  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[450px] overflow-auto">
      <div className="text-2xl font-bold">
        총 매출: {monthlyTotalSales?.amount.toLocaleString()}원
      </div>
      <div className="space-y-2">
        {monthlyTotalSales?.payments.map((item, idx) => (
          <div key={`${item.type}${idx}`} className="flex justify-between">
            <span>{item.type}</span>
            <span>{item.amount.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}
