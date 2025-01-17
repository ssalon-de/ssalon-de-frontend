import { AuthDto, User } from "./type";
import { encryptPassword } from "@/shared/utils/encrypt";

export const login = async (dto: AuthDto): Promise<User> => {
  const encryptedPassword = encryptPassword(dto.password);
  const data = (await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ ...dto, password: encryptedPassword }),
  }).then((res) => {
    const data = res.json();
    return data;
  })) as User;

  return data;
};
