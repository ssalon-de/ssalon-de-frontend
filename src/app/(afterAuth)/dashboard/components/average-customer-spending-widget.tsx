"use client";

import { useAverageCustomerSpending } from "@/queries/dashboard";
import dayjs from "dayjs";
import { TrendingUp, TrendingDown } from "lucide-react";

const initialData = {
  currentMonth: 0,
  previousMonth: 0,
};

export function AverageCustomerSpendingWidget() {
  const { data = initialData } = useAverageCustomerSpending(
    dayjs().format("YYYY-MM")
  );

  const { currentMonth, previousMonth } = data;

  const percentageChange =
    ((currentMonth - previousMonth) / previousMonth) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="text-3xl font-bold text-gray-900">
          {currentMonth.toLocaleString()}원
        </div>
        <p className="flex items-center justify-between mt-1 text-sm text-gray-500">
          이번 달 고객 평균 지출액
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              percentageChange >= 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(1)}%
          </span>
        </p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div>
          <div className="mb-1 text-base font-semibold text-gray-700">
            {previousMonth.toLocaleString()}원
          </div>
          <p className="text-sm text-gray-500">지난 달 고객 평균 지출액</p>
        </div>
        <div className="flex items-center">
          {percentageChange >= 0 ? (
            <TrendingUp className="w-5 h-5 mr-1 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 mr-1 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              percentageChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Math.abs(percentageChange).toFixed(1)}%{" "}
            {percentageChange >= 0 ? "증가" : "감소"}
          </span>
        </div>
      </div>
    </div>
  );
}
