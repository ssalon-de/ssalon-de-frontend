export type DailySale = {
  date: string;
  amount: number;
};

export type MonthlyTotalSales = {
  date: string;
  amount: number;
  payments: { type: string; amount: number }[];
};

export type TargetTotalSales = {
  targetSales: number;
  totalSales: number;
};

export type GenderRatio = {
  female: number;
  male: number;
};
