// import { logout } from "@/queries/auth/api";
// import useUserStore from "@/zustand/user";
import { useCallback } from "react";
// import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export const useLogout = () => {
  // const { setUser } = useUserStore();
  // const router = useRouter();

  const handleLogout = useCallback(async () => {
    // const res = await logout();
    // if (res.ok) {
    //   setUser({ email: "", name: "", company: "", createdAt: "" });
    //   router.push("/login");
    // }
    await signOut({ callbackUrl: "/login" });
  }, []);

  return handleLogout;
};
