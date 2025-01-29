"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export function GenderRatioWidget() {
  const data = [
    { name: "남성", value: 60 },
    { name: "여성", value: 40 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
