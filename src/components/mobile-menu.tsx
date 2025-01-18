"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  DollarSign,
  List,
  LogOut,
  Scissors,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/", icon: Home, label: "대시보드" },
    { href: "/sales/new", icon: DollarSign, label: "매출 입력" },
    { href: "/sales", icon: List, label: "매출 목록" },
    { href: "/service-types", icon: Settings, label: "서비스 타입 관리" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed z-40 top-4 right-4 md:hidden"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <VisuallyHidden.Root>
          <DialogTitle>title</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4 border-b">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Scissors className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">HairSalon</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 py-4 px-6 border-b">
            <Avatar>
              <AvatarImage
                // src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">사용자 이름</p>
              <p className="text-sm text-gray-500">user@example.com</p>
            </div>
          </div>
          <nav className="flex-grow py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                      isActive(item.href) ? "bg-blue-100 text-blue-600" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-4 px-6 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => {
                console.log("Logging out");
                setIsOpen(false);
                // Add logout logic here
              }}
            >
              <LogOut size={20} />
              <span>로그아웃</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
