"use client";

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

export function DailySalesLineChart() {
  const data = [
    { date: "5/1", salesCount: 10, salesAmount: 500000 },
    { date: "5/2", salesCount: 15, salesAmount: 750000 },
    { date: "5/3", salesCount: 8, salesAmount: 400000 },
    { date: "5/4", salesCount: 12, salesAmount: 600000 },
    { date: "5/5", salesCount: 20, salesAmount: 1000000 },
    { date: "5/6", salesCount: 18, salesAmount: 900000 },
    { date: "5/7", salesCount: 25, salesAmount: 1250000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="right"
          dataKey="salesAmount"
          fill="#82ca9d"
          name="매출 금액"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="salesCount"
          stroke="#8884d8"
          name="매출 건수"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
