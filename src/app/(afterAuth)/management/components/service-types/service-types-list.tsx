import { ServiceType } from "@/queries/settings/type";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { serverFetch } from "@/shared/utils/server-fetch";

import ServiceItem from "./service-types-item";
import EmptyTypes from "../empty-types";

export default async function ServiceList() {
  const serviceTypes = await serverFetch<ServiceType[]>("/service-types");

  return (
    <>
      {serviceTypes.length === 0 ? (
        <EmptyTypes />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>서비스</TableHead>
              <TableHead>가격</TableHead>
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
