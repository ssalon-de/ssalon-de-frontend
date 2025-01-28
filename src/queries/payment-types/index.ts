import { KEYS } from "@/shared/constants/query-keys";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationOptions } from "@/shared/types/query";
import { CreatePaymentType, PaymentType, UpdatePaymentType } from "./type";
import { createPaymentType, getPaymentTypes, updatePaymentType } from "./api";

export const usePaymentTypes = (options?: UseQueryOptions<PaymentType[]>) => {
  return useQuery<PaymentType[]>({
    ...options,
    queryKey: [KEYS.paymentTypes.list],
    queryFn: getPaymentTypes,
  });
};

export const useCreatePaymentType = (
  options?: MutationOptions<CreatePaymentType>
) => {
  return useMutation({
    ...options,
    mutationFn: createPaymentType,
  });
};

export const useUpdatePaymentType = (
  options?: MutationOptions<UpdatePaymentType>
) => {
  return useMutation({
    ...options,
    mutationFn: updatePaymentType,
  });
};
