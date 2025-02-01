"use client";

import useUserStore from "@/zustand/user";
import { Scissors } from "lucide-react";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();
  const { user } = useUserStore();
  return (
    <div className="flex items-center" onClick={() => router.push("/")}>
      <Scissors className="w-8 h-8 text-blue-600" />
      <span className="ml-2 text-xl font-bold text-gray-800">
        {user.company}
      </span>
    </div>
  );
}
