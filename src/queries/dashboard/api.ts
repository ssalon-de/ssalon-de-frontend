import api from "@/shared/lib/axios";
import {
  DailySale,
  DailySaleAmountCount,
  GenderRatio,
  MonthlyTotalSales,
  TargetTotalSales,
  VisitTypesRatio,
} from "./type";

export async function getMonthlySales(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/monthly-sales?targetMonth=${targetMonth}`,
  });
  return data as DailySale[];
}

export async function getMonthlyTotalSales(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/monthly-total-sales?targetMonth=${targetMonth}`,
  });

  return data as MonthlyTotalSales;
}

export async function getTargetTotalSales(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/target-total-sales?targetMonth=${targetMonth}`,
  });

  return data as TargetTotalSales;
}

export async function getDailySalesAmountCount(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/daily-sales-amount-count?targetMonth=${targetMonth}`,
  });

  return data as DailySaleAmountCount[];
}

export async function getGenderRatio(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/gender-ratio?targetMonth=${targetMonth}`,
  });

  return data as GenderRatio;
}

export async function getVisitTypesRatio(targetMonth: string) {
  const { data } = await api({
    method: "GET",
    url: `/dashboard/visit-types-ratio?targetMonth=${targetMonth}`,
  });

  return data as VisitTypesRatio;
}
