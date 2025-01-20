import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CreateSaleDto, GetSalesParams, Sale, UpdateSaleDto } from "./type";
import { KEYS } from "@/shared/constants/query-keys";
import { createSale, deleteSale, getSales, updateSale } from "./api";
import { MutationOptions } from "@/shared/types/query";

export const useSales = (
  params: GetSalesParams,
  options?: UseQueryOptions<Sale[]>
) => {
  return useQuery<Sale[]>({
    ...options,
    queryKey: [KEYS.sales.list, params.startTime, params.endTime],
    queryFn: () => getSales(params),
  });
};

export const useCreateSale = (options?: MutationOptions<CreateSaleDto>) => {
  return useMutation({
    ...options,
    mutationFn: createSale,
  });
};

export const useUpdateSale = (options?: MutationOptions<UpdateSaleDto>) => {
  return useMutation({
    ...options,
    mutationFn: updateSale,
  });
};

export const useDeleteSale = (options?: MutationOptions<string>) => {
  return useMutation({
    ...options,
    mutationFn: deleteSale,
  });
};
