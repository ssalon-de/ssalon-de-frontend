import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationOptions } from "@/shared/types/query";
import { SignUpDTO, User } from "./type";
import { getUserInfo, signUp, updateUserInfo } from "./api";
import { KEYS } from "@/shared/constants/query-keys";

export const useUserInfo = (
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">
) => {
  return useQuery<User>({
    ...options,
    queryKey: [KEYS.user.info],
    queryFn: getUserInfo,
  });
};

export const useUpdateUserInfo = (options?: MutationOptions<User>) => {
  return useMutation({
    ...options,
    mutationFn: updateUserInfo,
  });
};

export const useSignUp = (options?: MutationOptions<SignUpDTO>) => {
  return useMutation({
    ...options,
    mutationKey: [KEYS.user.signUp],
    mutationFn: signUp,
  });
};
