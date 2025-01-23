import { Home, List, Settings, User } from "lucide-react";
import type { Route } from "../types/route";

export const routes: Route[] = [
  { path: "/dashboard", icon: Home, label: "대시보드" },
  { path: "/sales", icon: List, label: "매출 목록" },
  { path: "/service-types", icon: Settings, label: "서비스 관리" },
  { path: "/profile", icon: User, label: "내 정보 관리" },
];
