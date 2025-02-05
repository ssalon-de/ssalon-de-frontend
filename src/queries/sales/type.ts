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
  date: string;
  amount: string;
  services: ServiceType[];
  payments: Payment[];
  gender: Gender;
  description?: string;
  isFirst: boolean;
};

export type CreateSaleDto = Omit<
  Sale,
  "id" | "services" | "paymentType" | "date"
> & {
  date: string;
  services: string[];
  payments: Payment[];
};
export type UpdateSaleDto = CreateSaleDto & { id: string };
