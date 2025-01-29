import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DailySale } from "./type";
import { getMonthlySales } from "./api";
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
