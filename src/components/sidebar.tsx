"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  DollarSign,
  List,
  ChevronLeft,
  ChevronRight,
  Scissors,
  LogOut,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/api/auth/logout";

function SimpleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-semibold text-gray-700">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            key={index + 1}
            className="text-sm p-1 hover:bg-blue-100 rounded-full transition-colors cursor-pointer"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    const status = await logout();
    if (status === 200) {
      router.push("/");
    }
  };

  const navItems = [
    { href: "/", icon: Home, label: "대시보드" },
    { href: "/sales/new", icon: DollarSign, label: "매출 입력" },
    { href: "/sales", icon: List, label: "매출 목록" },
    { href: "/service-types", icon: Settings, label: "서비스 관리" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 h-screen bg-gray-50 shadow-lg">
      <div className="flex-none p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">HairSalon</span>
        </Link>
      </div>

      <div className="flex-none p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-700">사용자 이름</p>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow p-4 overflow-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
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
