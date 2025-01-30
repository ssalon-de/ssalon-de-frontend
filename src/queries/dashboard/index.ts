import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  DailySale,
  GenderRatio,
  MonthlyTotalSales,
  TargetTotalSales,
} from "./type";
import {
  getGenderRatio,
  getMonthlySales,
  getMonthlyTotalSales,
  getTargetTotalSales,
} from "./api";
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

export const useTargetTotalSales = (
  targetMonth: string,
  options?: Omit<UseQueryOptions<TargetTotalSales>, "queryKey" | "queryFn">
) => {
  return useQuery<TargetTotalSales>({
    ...options,
    queryKey: [KEYS.dashboard.widget.targetTotalSales, targetMonth],
    queryFn: () => getTargetTotalSales(targetMonth),
  });
};

export const useGenderRatio = (
  targetMonth: string,
  options?: Omit<UseQueryOptions<GenderRatio>, "queryKey" | "queryFn">
) => {
  return useQuery<GenderRatio>({
    ...options,
    queryKey: [KEYS.dashboard.widget.genderRatio, targetMonth],
    queryFn: () => getGenderRatio(targetMonth),
  });
};
