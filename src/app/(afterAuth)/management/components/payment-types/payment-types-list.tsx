import { BASE_URL } from "@/shared/utils/api";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTypes from "../empty-types";
import PaymentTypesItem from "./payment-types-item";
import { PaymentType } from "@/queries/payment-types/type";

export default async function PaymentTypeList() {
  const store = await cookies();
  const token = store.get("accessToken")?.value ?? "";
  const paymentTypes: PaymentType[] = await fetch(`${BASE_URL}/payment-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  }).then((res) => res.json());

  return (
    <>
      {paymentTypes.length === 0 ? (
        <EmptyTypes />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>결제 유형</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentTypes.map((paymentType, idx) => (
              <PaymentTypesItem
                key={`${paymentType.id}${idx}`}
                {...paymentType}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
