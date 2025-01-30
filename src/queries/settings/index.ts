import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Setting } from "./type";
import { editSettings, getSettings } from "./api";
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
