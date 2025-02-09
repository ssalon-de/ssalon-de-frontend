"use client";

import { useVisitTypesRatio } from "@/queries/dashboard";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieLabel,
} from "recharts";
import EmptyWidget from "./empty-widget";
import { CHART_COLORS, CHART_LABEL_COLOR } from "@/shared/constants/palette";

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
      fill={CHART_LABEL_COLOR}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function VisitTypesRatioWidget() {
  const router = useRouter();
  const { data } = useVisitTypesRatio(dayjs().format("YYYY-MM"));

  const chartData = useMemo(
    () =>
      data
        ? Object.entries(data).map(([name, value]) => ({
            name,
            value,
          }))
        : [],
    [data]
  );

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
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
