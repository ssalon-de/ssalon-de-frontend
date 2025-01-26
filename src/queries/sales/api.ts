import apiClient from "@/shared/utils/api";
import { CreateSaleDto, GetSalesParams, Sale, UpdateSaleDto } from "./type";

export function getSales(params: GetSalesParams) {
  try {
    return apiClient.get<Sale[]>(
      `/sales?startTime=${params.startTime}&endTime=${params.endTime}`
    );
  } catch (error) {
    throw error;
  }
}

export function getSale(saleId: string) {
  try {
    return apiClient.get<Sale>(`/sales/${saleId}`);
  } catch (error) {
    throw error;
  }
}

export function getTotalAmount(date: string) {
  try {
    return apiClient.get<number>(`/sales/total-amount?date=${date}`);
  } catch (error) {
    throw error;
  }
}

export const createSale = (dto: CreateSaleDto): Promise<unknown> => {
  try {
    return apiClient.post("/sales", dto);
  } catch (error) {
    throw error;
  }
};

export const updateSale = async (dto: UpdateSaleDto): Promise<unknown> => {
  try {
    return apiClient.put(`/sales/${dto.id}`, dto);
  } catch (error) {
    throw error;
  }
};

export const deleteSale = async (id: string): Promise<unknown> => {
  try {
    return apiClient.delete(`/sales/${id}`);
  } catch (error) {
    throw error;
  }
};
