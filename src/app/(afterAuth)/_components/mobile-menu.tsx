"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useLogout } from "@/shared/hooks/use-logout";
import { routes } from "@/shared/constants/routes";
import useUserStore from "@/zustand/user";
import { MobileHeader } from "./mobile-header";
import { APP_NAME } from "@/shared/constants/app";
import { useInitCustomBadge } from "@/shared/hooks/use-init-custom-badge";
import { useInitUserInfo } from "@/shared/hooks/use-init-user-info";
import LoadingButton from "@/shared/ui/loading-button";
import UserProfile from "./user-profile";
import { Logo } from "@/shared/ui/logo";

function MobileMenu() {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const { onLogout, isLogoutIdle } = useLogout();

  const isActive = (path: string) => pathname === path;

  const { isLoading, enabledInitialize } = useInitUserInfo();
  useInitCustomBadge();

  return (
    <>
      <MobileHeader onMenuToggle={() => setIsOpen(true)} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] overflow-y-auto p-0"
        >
          <VisuallyHidden.Root>
            <DialogTitle>{APP_NAME}</DialogTitle>
          </VisuallyHidden.Root>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Logo />
            </div>
            <div className="flex items-center p-4 space-x-4 border-b">
              <UserProfile
                name={user?.name}
                email={user?.email}
                isLoading={enabledInitialize || isLoading}
              />
            </div>
            <nav className="flex-grow py-6 scrollbar-hidden">
              <ul className="space-y-2">
                {routes.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-3 px-6 py-3  text-gray-700 hover:bg-gray-100 ${
                        isActive(item.path) ? "bg-blue-100 text-blue-600" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item?.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-6 py-4 border-t">
              <LoadingButton
                isLoading={!isLogoutIdle}
                variant="outline"
                className="flex items-center justify-center w-full space-x-2"
                onClick={() => {
                  onLogout();
                }}
              >
                <LogOut size={20} />
                <span>로그아웃</span>
              </LoadingButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default memo(MobileMenu);
