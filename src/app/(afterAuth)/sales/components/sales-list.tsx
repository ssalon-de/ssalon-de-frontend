"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import dayjs from "dayjs";
import { useSales } from "@/queries/sales";
import { CardContent } from "@/components/ui/card";
import SalesItem from "./sales-item";

export default function SalesList() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { data: sales = [] } = useSales({
    startTime: dayjs(startTime).unix(),
    endTime: dayjs(endTime).unix(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="startDate" className="mb-2 block">
            시작 날짜
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="endDate" className="mb-2 block">
            종료 날짜
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => {
              setStartTime("");
              setEndTime("");
            }}
            className="w-full sm:w-auto"
          >
            필터 초기화
          </Button>
        </div>
      </div>
      <CardContent>
        {sales.map((sale) => (
          <SalesItem key={sale.id} {...sale} />
        ))}
      </CardContent>
    </div>
  );
}
