import {
  queryOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { MutationOptions } from "@/shared/types/query";
import { SignUpDTO, User } from "./type";
import { getUserInfo, signUp, updateUserInfo } from "./api";
import { KEYS } from "@/shared/constants/query-keys";

type UserQueryOptions = Omit<UseQueryOptions<User>, "queryKey">;
export const getUserQueryOptions = (options?: UserQueryOptions) =>
  queryOptions({
    ...options,
    queryKey: [KEYS.user.info],
  });

export const useUserInfo = (options?: UserQueryOptions) => {
  const queryOptions = getUserQueryOptions(options);
  return useQuery<User>({
    ...queryOptions,
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
