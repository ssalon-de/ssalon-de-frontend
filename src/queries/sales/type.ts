import { ServiceType } from "../service-types/type";

export type GetSalesParams = {
  startTime: number;
  endTime: number;
};

export type Sale = {
  id: string;
  date: string; // 날짜
  amount: number;
  services: ServiceType[];
  description?: string;
};

export type CreateSaleDto = Omit<Sale, "id" | "services"> & {
  services: string[];
};
export type UpdateSaleDto = CreateSaleDto & { id: string };
