import { ServiceType } from "../service-types/type";

export type Gender = "M" | "F";
export type GetSalesParams = {
  date: string;
};

export type Payment = {
  amount: string;
  typeId: string;
  name: string;
};

export type Sale = {
  id: string;
  date: string; // 날짜
  amount: string;
  services: ServiceType[];
  payments: Payment[];
  gender: Gender;
  description?: string;
};

export type CreateSaleDto = Omit<Sale, "id" | "services" | "paymentType"> & {
  services: string[];
  payments: Payment[];
};
export type UpdateSaleDto = CreateSaleDto & { id: string };
