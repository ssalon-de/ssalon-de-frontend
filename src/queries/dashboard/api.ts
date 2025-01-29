import apiClient from "@/shared/utils/api";
import { DailySale } from "./type";

export function getMonthlySales(targetMonth: string) {
  try {
    return apiClient.get<DailySale[]>(
      `/dashboard/monthly-sales?targetMonth=${targetMonth}`
    );
  } catch (error) {
    throw error;
  }
}
