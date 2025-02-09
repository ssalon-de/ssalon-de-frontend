import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Setting, UpdateVisitTypeDto, VisitType } from "./type";
import {
  createVisitType,
  deleteVisitType,
  editSettings,
  getSettings,
  getVisitTypes,
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
