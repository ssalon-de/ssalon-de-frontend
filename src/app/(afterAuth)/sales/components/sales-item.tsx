"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentType } from "@/queries/payment-types/type";
import { Gender } from "@/queries/sales/type";
import { ServiceType } from "@/queries/service-types/type";
import { Edit2, Trash2 } from "lucide-react";
import { memo } from "react";

type Props = {
  id: string;
  date: string;
  amount: number;
  services: ServiceType[];
  paymentType: PaymentType;
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
  paymentType,
  gender,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-semibold">{new Date(date).toLocaleString()}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="font-bold text-lg">{amount.toLocaleString()}원</p>
        </div>
        <div className="flex gap-1">
          <Badge variant="outline">{paymentType.name}</Badge>
          <Badge variant="outline">{gender === "M" ? "남성" : "여성"}</Badge>
          {services.map((service) => (
            <Badge key={service.id}>{service.name}</Badge>
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
