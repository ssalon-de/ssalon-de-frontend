import { Home, List, Settings } from "lucide-react";
import type { Route } from "../types/route";

export const routes: Route[] = [
  { path: "/dashboard", icon: Home, label: "대시보드" },
  { path: "/sales", icon: List, label: "매출 목록" },
  { path: "/service-types", icon: Settings, label: "서비스 관리" },
];
