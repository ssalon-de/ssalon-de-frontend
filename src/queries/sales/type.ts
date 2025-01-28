import { PaymentType } from "../payment-types/type";
import { ServiceType } from "../service-types/type";

export type Gender = "M" | "F";
export type GetSalesParams = {
  startTime: number;
  endTime: number;
};

export type Sale = {
  id: string;
  date: string; // 날짜
  amount: number;
  services: ServiceType[];
  paymentType: PaymentType;
  gender: Gender;
  description?: string;
};

export type CreateSaleDto = Omit<Sale, "id" | "services" | "paymentType"> & {
  services: string[];
  paymentType: string;
};
export type UpdateSaleDto = CreateSaleDto & { id: string };
