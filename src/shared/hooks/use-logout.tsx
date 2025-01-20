import { logout } from "@/queries/auth/api";
import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleLogout = useCallback(async () => {
    const status = await logout();
    if (status === 200) {
      setUser({ email: "" });
      router.push("/");
    }
  }, [router, setUser]);

  return handleLogout;
};
