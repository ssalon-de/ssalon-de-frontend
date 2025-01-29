"use client";

import { Progress } from "@/components/ui/progress";

export function SalesTargetWidget() {
  const targetSales = 10000000;
  const currentSales = 7500000;
  const percentage = (currentSales / targetSales) * 100;
  const difference = targetSales - currentSales;

  return (
    <div className="space-y-4">
      <Progress value={percentage} className="w-full" />
      <div className="flex justify-between text-sm">
        <span>현재 매출: {currentSales.toLocaleString()}원</span>
        <span>목표 매출: {targetSales.toLocaleString()}원</span>
      </div>
      <div className="text-center">
        {difference > 0 ? (
          <p className="text-red-500">
            목표까지 {difference.toLocaleString()}원 부족
          </p>
        ) : (
          <p className="text-green-500">
            목표를 {Math.abs(difference).toLocaleString()}원 초과 달성!
          </p>
        )}
      </div>
    </div>
  );
}
