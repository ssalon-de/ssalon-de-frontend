"use client";

import { useVisitTypesRatio } from "@/queries/dashboard";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend,
} from "recharts";
import EmptyWidget from "./empty-widget";
import { CHART_COLORS } from "@/shared/constants/palette";
import { ActiveShape } from "recharts/types/util/types";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ContentType } from "recharts/types/component/DefaultLegendContent";

const renderActiveShape: ActiveShape<PieSectorDataItem> = (
  props: PieSectorDataItem
) => {
  const RADIAN = Math.PI / 180;
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius,
    outerRadius = 0,
    startAngle,
    endAngle,
    fill,
    payload,
    percent = 0,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 8) * cos;
  const sy = cy + (outerRadius + 8) * sin;
  const mx = cx + (outerRadius + 25) * cos; // 기존보다 짧게 조정
  const my = cy + (outerRadius + 25) * sin; // 기존보다 짧게 조정
  const ex = mx + (cos >= 0 ? 1 : -1) * 18; // 기존 22 → 18로 조정
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const percentage = `${(percent * 100).toFixed(0)}%`;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontSize={10}
        fill="#999"
      >
        {percentage}
      </text>
    </g>
  );
};

const CustomLegend: ContentType = (props) => {
  const { payload } = props;

  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap justify-center">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            marginRight: 10,
            display: "flex",
            alignItems: "center",
            fontSize: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: entry.color,
              marginRight: 4,
            }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export function VisitTypesRatioWidget() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useVisitTypesRatio(dayjs().format("YYYY-MM"));
  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

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
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={handlePieEnter}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={40}
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
        <Legend content={CustomLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
}
