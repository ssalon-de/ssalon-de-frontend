"use client";

import { useDailySalesAmountCount } from "@/queries/dashboard";
import dayjs from "dayjs";
import { Line, XAxis, Tooltip, LineChart, YAxis } from "recharts";
import EmptyWidget from "./empty-widget";
import { useRouter } from "next/navigation";
import { CHART_COLORS } from "@/shared/constants/palette";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "매출 건",
    color: CHART_COLORS[0],
  },
} satisfies ChartConfig;

export function DailySalesLineChart() {
  const router = useRouter();
  const { data = [] } = useDailySalesAmountCount(dayjs().format("YYYY-MM"));

  if (data.length === 0) {
    return <EmptyWidget onClick={() => router.push("/sales/edit")} />;
  }

  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={data}>
        <XAxis dataKey="date" />
        <YAxis yAxisId="count" dataKey="count" />
        <Line
          yAxisId="count"
          dataKey="count"
          fill="var(--color-count)"
          radius={4}
        />
        <Tooltip />
      </LineChart>
    </ChartContainer>
  );
}
