import { logout } from "@/queries/auth/api";
import useUserStore from "@/zustand/user";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    const res = await logout();

    if (res.ok) {
      setUser({ email: "", name: "", company: "", createdAt: "" });
      router.push("/login");
    }
  }, [setUser, router]);

  return handleLogout;
};
