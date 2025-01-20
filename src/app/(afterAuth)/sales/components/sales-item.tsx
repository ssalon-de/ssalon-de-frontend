"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceType } from "@/queries/service-types/type";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
  date: string;
  amount: number;
  services: ServiceType[];
  description?: string;
};

export default function SalesItem({
  id,
  date,
  amount,
  services,
  description,
}: Props) {
  const [selectedSaleId, setSelectedSaleId] = useState<null | string>(null);
  const handleEdit = () => {
    setSelectedSaleId(id);
  };

  const handleDelete = () => {};

  const onAfterEdit = () => {
    setSelectedSaleId(null);
  };

  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-semibold">{new Date(date).toLocaleString()}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="font-bold text-lg">{amount.toLocaleString()}원</p>
        </div>
        <div className="mb-2">
          <p className="text-sm font-medium">서비스</p>
          <p>
            {services.map((service) => (
              <Badge key={service.id}>{service.name}</Badge>
            ))}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleEdit} size="sm" variant="outline">
            <Edit2 className="w-4 h-4 mr-1" /> 수정
          </Button>
          <Button onClick={handleDelete} size="sm" variant="outline">
            <Trash2 className="w-4 h-4 mr-1" /> 삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
