"use client";

import { logout } from "@/api/auth/logout";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = async () => {
    const status = await logout();
    if (status === 200) {
      router.push("/login");
    }
  };
  return (
    <div>
      dashboard
      <br />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
