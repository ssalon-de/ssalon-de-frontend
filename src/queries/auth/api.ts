import apiClient from "@/shared/utils/api";
import { AuthDto, SignUpDTO, User } from "./type";
import { encryptPassword } from "@/shared/utils/encrypt";

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

export async function logout() {
  try {
    const { status } = await fetch("/api/logout", {
      method: "POST",
    });
    console.log("logout status", status);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function reissue() {
  try {
    const { status } = await fetch("/api/reissue", {
      method: "POST",
    });

    console.log("reissue status", status);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo() {
  try {
    return apiClient.get<User>("/auth/info");
  } catch (error) {
    throw error;
  }
}

export async function updateUserInfo(dto: User) {
  try {
    return apiClient.put<User>("/auth/info", dto);
  } catch (error) {
    throw error;
  }
}

export async function signUp(dto: SignUpDTO) {
  try {
    const encryptedPassword = encryptPassword(dto.password);

    return apiClient.post<User>("/auth/sign-up", {
      ...dto,
      password: encryptedPassword,
    });
  } catch (error) {
    throw error;
  }
}
