import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  CreatePaymentType,
  CreateServiceType,
  PaymentType,
  ServiceType,
  Setting,
  UpdatePaymentType,
  UpdateVisitTypeDto,
  VisitType,
} from "./type";
import {
  createPaymentType,
  createServiceType,
  createVisitType,
  deletePaymentType,
  deleteServiceType,
  deleteVisitType,
  editSettings,
  getPaymentTypes,
  getServiceTypes,
  getSettings,
  getVisitTypes,
  updatePaymentType,
  updateServiceType,
  updateVisitType,
} from "./api";
import { KEYS } from "@/shared/constants/query-keys";
import { MutationOptions } from "@/shared/types/query";

export const useSettings = (
  options?: Omit<UseQueryOptions<Setting[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Setting[]>({
    ...options,
    queryKey: [KEYS.settings.list],
    queryFn: getSettings,
  });
};

export const useEditSettings = (options?: MutationOptions<Setting[]>) => {
  return useMutation({
    ...options,
    mutationFn: editSettings,
  });
};

/** visit-types */
export const useVisitTypes = (
  options?: Omit<UseQueryOptions<VisitType[]>, "queryKey" | "queryFn">
) => {
  return useQuery<VisitType[]>({
    ...options,
    queryKey: [KEYS.settings.visitTypes],
    queryFn: getVisitTypes,
  });
};

export const useCreateVisitType = (options?: MutationOptions<string>) => {
  return useMutation({
    ...options,
    mutationFn: createVisitType,
  });
};

export const useUpdateVisitType = (
  options?: MutationOptions<UpdateVisitTypeDto>
) => {
  return useMutation({
    ...options,
    mutationFn: updateVisitType,
  });
};

export const useDeleteVisitType = (options?: MutationOptions<string>) => {
  return useMutation({
    ...options,
    mutationFn: deleteVisitType,
  });
};

/** service-types */
export const useServiceTypes = (
  options?: Omit<UseQueryOptions<ServiceType[]>, "queryKey" | "queryFn">
) => {
  return useQuery<ServiceType[]>({
    ...options,
    queryKey: [KEYS.serviceTypes.list],
    queryFn: getServiceTypes,
  });
};

export const useCreateServiceType = (
  options?: MutationOptions<CreateServiceType>
) => {
  return useMutation({
    ...options,
    mutationFn: createServiceType,
  });
};

export const useUpdateServiceType = (
  options?: MutationOptions<ServiceType>
) => {
  return useMutation({
    ...options,
    mutationFn: updateServiceType,
  });
};

export const useDeleteServiceType = (options?: MutationOptions<string>) => {
  return useMutation({
    ...options,
    mutationFn: deleteServiceType,
  });
};

/** payment-types */
export const usePaymentTypes = (
  options?: Omit<UseQueryOptions<PaymentType[]>, "queryKey" | "queryFn">
) => {
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

export const useDeletePaymentType = (options?: MutationOptions<string>) => {
  return useMutation({
    ...options,
    mutationFn: deletePaymentType,
  });
};
