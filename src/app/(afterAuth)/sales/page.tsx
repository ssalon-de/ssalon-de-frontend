"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceLabel } from "@/components/service-label";
import apiClient from "@/shared/utils/api";

const mockSales = [
  {
    id: 1,
    date: "2023-06-01",
    time: "10:00",
    amount: 50000,
    serviceType: "커트",
    customerInfo: "20대 남성",
  },
  {
    id: 2,
    date: "2023-06-01",
    time: "14:30",
    amount: 100000,
    serviceType: "염색",
    customerInfo: "30대 여성, 단골",
  },
  {
    id: 3,
    date: "2023-06-02",
    time: "11:00",
    amount: 80000,
    serviceType: "펌",
    customerInfo: "40대 여성",
  },
  {
    id: 4,
    date: "2023-06-03",
    time: "16:00",
    amount: 60000,
    serviceType: "커트",
    customerInfo: "50대 남성, 새 고객",
  },
];

export default function Sales() {
  const getSales = async () => {
    const res = await apiClient.get("/sales/cm5yzg3lp0001vhswo5jvx6ax");
    console.log(res);
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">매출 목록</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>날짜</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>서비스 유형</TableHead>
                  <TableHead>고객 정보</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.time}</TableCell>
                    <TableCell>{sale.amount.toLocaleString()}원</TableCell>
                    <TableCell>
                      <ServiceLabel
                        type={
                          sale.serviceType as "커트" | "염색" | "펌" | "기타"
                        }
                      />
                    </TableCell>
                    <TableCell>{sale.customerInfo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
