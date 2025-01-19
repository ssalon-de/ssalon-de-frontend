import { Badge } from "@/components/ui/badge";

type ServiceType = "커트" | "염색" | "펌" | "기타";

const serviceColors: Record<ServiceType, string> = {
  커트: "bg-blue-500",
  염색: "bg-purple-500",
  펌: "bg-pink-500",
  기타: "bg-gray-500",
};

export function ServiceLabel({ type }: { type: ServiceType }) {
  return <Badge className={`${serviceColors[type]} text-white`}>{type}</Badge>;
}
