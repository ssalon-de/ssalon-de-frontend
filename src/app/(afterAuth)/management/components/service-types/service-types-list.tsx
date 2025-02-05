import { ServiceType } from "@/queries/service-types/type";
import ServiceItem from "./service-types-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTypes from "../empty-types";
import { serverFetch } from "@/shared/utils/serverFetch";

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
