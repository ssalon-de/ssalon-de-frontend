import apiClient from "@/shared/utils/api";
import { CreatePaymentType, UpdatePaymentType, PaymentType } from "./type";

export const getPaymentTypes = async (): Promise<PaymentType[]> => {
  try {
    return apiClient.get<PaymentType[]>("/payment-types");
  } catch (error) {
    throw error;
  }
};

export const createPaymentType = (dto: CreatePaymentType): Promise<unknown> => {
  try {
    return apiClient.post("/payment-types", {
      name: dto.name,
    });
  } catch (error) {
    throw error;
  }
};

export const updatePaymentType = async (
  dto: UpdatePaymentType
): Promise<unknown> => {
  try {
    const body = {
      name: dto.name,
    };
    return apiClient.put(`/payment-types/${dto.id}`, body);
  } catch (error) {
    throw error;
  }
};

// export const deletePaymentType = async (id: string): Promise<unknown> => {
//   try {
//     return apiClient.delete(`/Payment-types/${id}`);
//   } catch (error) {
//     throw error;
//   }
// };
