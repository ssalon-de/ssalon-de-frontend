import { ServiceType } from "@/queries/service-types/type";
import { BASE_URL } from "@/shared/utils/api";
import ServiceItem from "./service-types-item";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTypes from "../empty-types";

export default async function ServiceList() {
  const store = await cookies();
  const token = store.get("accessToken")?.value ?? "";
  const serviceTypes: ServiceType[] = await fetch(`${BASE_URL}/service-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  }).then((res) => res.json());

  return (
    <>
      {serviceTypes.length === 0 ? (
        <EmptyTypes />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>서비스</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceTypes.map((serviceType, idx) => (
              <ServiceItem key={`${serviceType.id}${idx}`} {...serviceType} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
