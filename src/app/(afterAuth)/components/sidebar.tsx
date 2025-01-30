"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/shared/hooks/use-logout";
import { useStore } from "@/shared/hooks/use-store";
import useUserStore from "@/zustand/user";
import { routes } from "@/shared/constants/routes";
import SimpleCalendar from "./calendar";

export function Sidebar() {
  const user = useStore(useUserStore, (state) => state.user);
  const pathname = usePathname();
  const handleLogout = useLogout();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex md:flex-col w-64 h-screen bg-gray-50 shadow-lg border-gray-200 border">
      <div className="flex-none p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            {user?.company}
          </span>
        </Link>
      </div>

      <div className="flex-none p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-medium text-gray-700">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow p-4 overflow-auto">
        <ul className="space-y-2">
          {routes.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item?.icon && <item.icon size={20} />}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-none p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>로그아웃</span>
        </Button>
      </div>
      <div className="flex-none p-4 border-t border-gray-200">
        <SimpleCalendar />
      </div>
    </aside>
  );
}
