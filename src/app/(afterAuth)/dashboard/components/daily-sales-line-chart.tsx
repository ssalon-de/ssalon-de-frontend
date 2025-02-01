"use client";

import { useDailySalesAmountCount } from "@/queries/dashboard";
import dayjs from "dayjs";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  Legend,
} from "recharts";
import EmptyWidget from "./empty-widget";
import { useRouter } from "next/navigation";

export function DailySalesLineChart() {
  const router = useRouter();
  const { data = [] } = useDailySalesAmountCount(dayjs().format("YYYY-MM"));

  if (data.length === 0) {
    return <EmptyWidget onClick={() => router.push("/sales/edit")} />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="right" dataKey="amount" fill="#82ca9d" name="매출 금액" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          name="매출 건수"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
