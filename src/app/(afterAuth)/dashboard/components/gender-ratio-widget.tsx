"use client";

import { useGenderRatio } from "@/queries/dashboard";
import { GenderRatio } from "@/queries/dashboard/type";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Sector,
} from "recharts";
import EmptyWidget from "./empty-widget";
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
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
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
        fill="#333"
        fontSize={10}
      >
        {payload.value}건
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={15}
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

export function GenderRatioWidget() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { data } = useGenderRatio(dayjs().format("YYYY-MM"));

  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

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
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={handlePieEnter}
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={40}
          outerRadius={50}
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
        <Legend content={CustomLegend} wrapperStyle={{ bottom: 15 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
