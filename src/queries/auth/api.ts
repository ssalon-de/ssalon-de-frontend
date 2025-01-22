import { AuthDto, User } from "./type";
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
    return status;
  } catch (error) {
    throw error;
  }
}
