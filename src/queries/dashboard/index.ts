import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DailySale, MonthlyTotalSales } from "./type";
import { getMonthlySales, getMonthlyTotalSales } from "./api";
import { KEYS } from "@/shared/constants/query-keys";

export const useMonthlySales = (
  targetMonth: string,
  options?: Omit<UseQueryOptions<DailySale[]>, "queryKey" | "queryFn">
) => {
  return useQuery<DailySale[]>({
    ...options,
    queryKey: [KEYS.dashboard.widget.monthlySales, targetMonth],
    queryFn: () => getMonthlySales(targetMonth),
  });
};

export const useMonthlyTotalSales = (
  targetMonth: string,
  options?: Omit<UseQueryOptions<MonthlyTotalSales>, "queryKey" | "queryFn">
) => {
  return useQuery<MonthlyTotalSales>({
    ...options,
    queryKey: [KEYS.dashboard.widget.monthlyTotalSales, targetMonth],
    queryFn: () => getMonthlyTotalSales(targetMonth),
  });
};
