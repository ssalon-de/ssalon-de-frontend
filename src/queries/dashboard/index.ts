import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  DailySale,
  DailySaleAmountCount,
  GenderRatio,
  MonthlyTotalSales,
  TargetTotalSales,
  VisitTypesRatio,
} from "./type";
import {
  getDailySalesAmountCount,
  getGenderRatio,
  getMonthlySales,
  getMonthlyTotalSales,
  getTargetTotalSales,
  getVisitTypesRatio,
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

export const useDailySalesAmountCount = (
  targetMonth: string,
  options?: Omit<
    UseQueryOptions<DailySaleAmountCount[]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<DailySaleAmountCount[]>({
    ...options,
    queryKey: [KEYS.dashboard.widget.dailySalesAmountCount, targetMonth],
    queryFn: () => getDailySalesAmountCount(targetMonth),
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

export const useVisitTypesRatio = (
  targetMonth: string,
  options?: Omit<UseQueryOptions<VisitTypesRatio>, "queryKey" | "queryFn">
) => {
  return useQuery<VisitTypesRatio>({
    ...options,
    queryKey: [KEYS.dashboard.widget.visitTypesRatio, targetMonth],
    queryFn: () => getVisitTypesRatio(targetMonth),
  });
};
