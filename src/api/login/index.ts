import apiClient from "@/shared/utils/api";
import { AuthDto, LoginResponse } from "./type";
import { encryptPassword } from "@/shared/utils/encrypt";

export const login = async (dto: AuthDto) => {
  const encryptedPassword = encryptPassword(dto.password);
  const data = await apiClient.post<LoginResponse>("/auth/login", {
    email: dto.email,
    password: encryptedPassword,
  });

  if (data?.accessToken) {
    apiClient.setAccessToken(data.accessToken);
  }

  return data;
};
