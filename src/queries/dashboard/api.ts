import apiClient from "@/shared/utils/api";
import { DailySale, GenderRatio, MonthlyTotalSales } from "./type";

export function getMonthlySales(targetMonth: string) {
  try {
    return apiClient.get<DailySale[]>(
      `/dashboard/monthly-sales?targetMonth=${targetMonth}`
    );
  } catch (error) {
    throw error;
  }
}

export function getMonthlyTotalSales(targetMonth: string) {
  try {
    return apiClient.get<MonthlyTotalSales>(
      `/dashboard/monthly-total-sales?targetMonth=${targetMonth}`
    );
  } catch (error) {
    throw error;
  }
}

export function getGenderRatio(targetMonth: string) {
  try {
    return apiClient.get<GenderRatio>(
      `/dashboard/gender-ratio?targetMonth=${targetMonth}`
    );
  } catch (error) {
    throw error;
  }
}
