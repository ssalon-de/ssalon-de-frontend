"use client";

import { useGenderRatio } from "@/queries/dashboard";
import { GenderRatio } from "@/queries/dashboard/type";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  PieLabel,
} from "recharts";
import EmptyWidget from "./empty-widget";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function GenderRatioWidget() {
  const router = useRouter();
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

  const COLORS = ["#8884d8", "#82ca9d"];

  const isEmpty = Object.values(data ?? {}).every((value) => !value);

  if (isEmpty) {
    return <EmptyWidget onClick={() => router.push("/sales/edit")} />;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              style={{ outline: "none" }}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
