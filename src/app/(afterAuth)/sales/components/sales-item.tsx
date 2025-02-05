"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gender } from "@/queries/sales/type";
import { ServiceType } from "@/queries/service-types/type";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { memo } from "react";

type Props = {
  id: string;
  date: string;
  amount: string;
  services: ServiceType[];
  payments: string[];
  gender: Gender;
  description?: string;
  isFirst: boolean;
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
};

const SalesItem: React.FC<Props> = ({
  id,
  date,
  amount,
  services,
  description,
  payments,
  gender,
  isFirst,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-semibold">
              {dayjs(date).format("YY/MM/DD HH:mm")}
            </p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="text-lg font-bold">
            {Number(amount).toLocaleString()}원
          </p>
        </div>
        <div className="flex gap-1 mb-4">
          {isFirst && <Badge>첫 방문</Badge>}
          <Badge variant="outline">{gender === "M" ? "남성" : "여성"}</Badge>
          {payments.map((payment) => (
            <Badge
              key={`${id}${payment}`}
              className="text-blue-800 bg-blue-200"
            >
              {payment}
            </Badge>
          ))}
          {services.map((service) => (
            <Badge
              key={`${id}${service.id}`}
              variant="secondary"
              className="text-pink-800 bg-pink-200"
            >
              {service.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center"></div>
          <div className="flex space-x-2">
            <Button onClick={() => onClickEdit(id)} size="sm" variant="outline">
              <Edit2 className="w-4 h-4 mr-1" />
            </Button>
            <Button
              onClick={() => onClickDelete(id)}
              size="sm"
              variant="outline"
            >
              <Trash2 className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(SalesItem);
