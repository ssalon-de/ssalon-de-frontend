"use client";

import { useGenderRatio } from "@/queries/dashboard";
import { GenderRatio } from "@/queries/dashboard/type";
import dayjs from "@/shared/utils/dayjs";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export function GenderRatioWidget() {
  const { data } = useGenderRatio(dayjs().format("YYYY-MM"));

  const chartData = useMemo(
    () =>
      data
        ? Object.keys(data).map((gender) => ({
            name: gender === "male" ? "남성" : "여성",
            value: data[gender as keyof GenderRatio],
          }))
        : [],
    [data]
  );

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
