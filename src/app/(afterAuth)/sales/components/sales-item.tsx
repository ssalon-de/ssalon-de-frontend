"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gender } from "@/queries/sales/type";
import { ServiceType } from "@/queries/service-types/type";
import { Edit2, Trash2 } from "lucide-react";
import { memo } from "react";

import dayjs from "@/shared/utils/dayjs";

type Props = {
  id: string;
  date: string;
  amount: string;
  services: ServiceType[];
  payments: string[];
  gender: Gender;
  description?: string;
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
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-semibold">
              {dayjs(date).format("YY/MM/DD HH:mm")}
            </p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="font-bold text-lg">{amount.toLocaleString()}원</p>
        </div>
        <div className="flex gap-1 mb-4">
          {payments.map((payment) => (
            <Badge key={`${id}${payment}`}>{payment}</Badge>
          ))}
          <Badge variant="outline">{gender === "M" ? "남성" : "여성"}</Badge>
          {services.map((service) => (
            <Badge key={`${id}${service.id}`}>{service.name}</Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
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
