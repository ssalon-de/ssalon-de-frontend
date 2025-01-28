import { KEYS } from "@/shared/constants/query-keys";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  createServiceType,
  deleteServiceType,
  getServiceTypes,
  updateServiceType,
} from "./api";
import { CreateServiceType, ServiceType } from "./type";
import { MutationOptions } from "@/shared/types/query";

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
