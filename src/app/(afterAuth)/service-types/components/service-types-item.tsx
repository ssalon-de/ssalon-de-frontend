"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useDeleteServiceType,
  useUpdateServiceType,
} from "@/queries/service-types";
import { ServiceType } from "@/queries/service-types/type";
import { KEYS } from "@/shared/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Save, Trash2 } from "lucide-react";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  id: string;
  name: string;
  price: number;
}>;

export default function ServiceItem({ id, name, price }: Props) {
  const client = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");
  const [editingPrice, setEditingPrice] = useState(0);

  const { mutate: deleteServiceType } = useDeleteServiceType({
    onSuccess: () => {
      afterMutateServiceType();
    },
  });

  const { mutate: updateServiceType } = useUpdateServiceType({
    onSuccess: () => {
      setIsEdit(false);
      setEditingId("");
      setEditingName("");
      setEditingPrice(0);
      afterMutateServiceType();
    },
  });

  const afterMutateServiceType = () => {
    client.invalidateQueries({
      queryKey: [KEYS.serviceTypes.list],
    });
  };

  const handleClickEdit = (serviceType: ServiceType) => {
    setIsEdit(true);
    setEditingId(serviceType.id);
    setEditingName(serviceType.name);
    setEditingPrice(serviceType.price);
  };

  const handleClickSave = () => {
    updateServiceType({
      id: editingId,
      name: editingName,
      price: editingPrice,
    });
  };

  const handleClickDelete = (id: string) => {
    deleteServiceType(id);
  };

  return (
    <TableRow key={id}>
      <TableCell>
        {editingId === id ? (
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell>
        {editingId === id ? (
          <Input
            type="number"
            value={editingPrice}
            onChange={(e) => setEditingPrice(+e.target.value)}
          />
        ) : (
          `${price.toLocaleString()}원`
        )}
      </TableCell>
      <TableCell className="text-right flex gap-1 justify-end">
        {isEdit && editingId === id ? (
          <Button size="sm" onClick={handleClickSave} variant="outline">
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleClickEdit({ id, name, price })}
              size="sm"
              variant="outline"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleClickDelete(id)}
              size="sm"
              variant="outline"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
