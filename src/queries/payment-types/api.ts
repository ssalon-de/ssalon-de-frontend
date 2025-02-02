import api from "@/shared/lib/axios";

import { CreatePaymentType, UpdatePaymentType, PaymentType } from "./type";

export const getPaymentTypes = async (): Promise<PaymentType[]> => {
  const { data } = await api({
    method: "GET",
    url: "/payment-types",
  });
  return data;
};

export const createPaymentType = async (
  dto: CreatePaymentType
): Promise<unknown> => {
  const { data } = await api({
    method: "POST",
    url: "/payment-types",
    data: dto,
  });
  return data;
};

export const updatePaymentType = async (
  dto: UpdatePaymentType
): Promise<unknown> => {
  const { data } = await api({
    method: "PUT",
    url: `/payment-types/${dto.id}`,
    data: dto,
  });
  return data;
};
