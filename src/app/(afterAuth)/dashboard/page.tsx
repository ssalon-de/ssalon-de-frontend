import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { CalendarWidget } from "./components/calendar-widget";
import { GenderRatioWidget } from "./components/gender-ratio-widget";
import { DailySalesLineChart } from "./components/daily-sales-line-chart";
import { TotalSalesWidget } from "./components/total-sales-widget";
import { TargetTotalSalesWidget } from "./components/target-total-sales-widget";
import { VisitTypesRatioWidget } from "./components/visit-type-ratio-widget";
import { DailyTargetWidget } from "./components/daily-target-widget";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">대시보드</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Card className="max-h-[300px] flex flex-col">
            <CardHeader>
              <CardTitle>이달의 총 매출</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <TotalSalesWidget />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <DailyTargetWidget />
            </CardContent>
          </Card>
        </div>
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
            <CardTitle>목표 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <TargetTotalSalesWidget />
          </CardContent>
        </Card>
        <Card className="flex flex-col min-h-[300px]">
          <CardHeader>
            <CardTitle>성별 비율</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <GenderRatioWidget />
          </CardContent>
        </Card>
        <Card className="flex flex-col min-h-[300px]">
          <CardHeader>
            <CardTitle>방문 유형 비율</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <VisitTypesRatioWidget />
          </CardContent>
        </Card>
        <Card className="hidden col-span-2 md:block">
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
