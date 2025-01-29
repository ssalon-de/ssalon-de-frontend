"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarWidget } from "./components/calendar-widget";
import { TotalSalesWidget } from "./components/total-sales-widget";
import { SalesTargetWidget } from "./components/sales-target-widget";
import { GenderRatioWidget } from "./components/gender-ratio-widget";
import { DailySalesLineChart } from "./components/daily-sales-line-chart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">대시보드</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>캘린더</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarWidget />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>이달의 총 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <TotalSalesWidget />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>목표 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTargetWidget />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>성별 비율</CardTitle>
          </CardHeader>
          <CardContent>
            <GenderRatioWidget />
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>일별 매출 건수</CardTitle>
          </CardHeader>
          <CardContent>
            <DailySalesLineChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
