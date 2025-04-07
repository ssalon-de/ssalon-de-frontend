import api from "@/shared/lib/axios";

import { AuthDto, SignUpDTO, User } from "./type";
import { encryptPassword } from "@/shared/utils/encrypt";
import { BASE_URL } from "@/shared/constants/env";

export const login = async (dto: AuthDto): Promise<{ user: User }> => {
  try {
    const encryptedPassword = encryptPassword(dto.password);
    const data: { user: User } = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ ...dto, password: encryptedPassword }),
    }).then((res) => {
      const data = res.json();
      return data;
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export async function reissue() {
  try {
    const res = await fetch(`${BASE_URL}/auth/reissue`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo() {
  const { data } = await api({
    method: "GET",
    url: "/auth/info",
  });

  return data;
}

export async function updateUserInfo(dto: User) {
  const { data } = await api({
    method: "PUT",
    url: "/auth/info",
    data: dto,
  });

  return data;
}

export async function signUp(dto: SignUpDTO) {
  const encryptedPassword = encryptPassword(dto.password);

  const { data } = await api({
    method: "POST",
    url: "/auth/sign-up",
    data: {
      ...dto,
      password: encryptedPassword,
    },
  });

  return data;
}
