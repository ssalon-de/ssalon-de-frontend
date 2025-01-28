"use client";

import { memo, PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useDeleteServiceType,
  useUpdateServiceType,
} from "@/queries/service-types";
import { ServiceType } from "@/queries/service-types/type";

type Props = PropsWithChildren<{
  id: string;
  name: string;
  price: number;
}>;

const ServiceItem: React.FC<Props> = ({ id, name, price }) => {
  const router = useRouter();
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

  const afterMutateServiceType = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleClickEdit = useCallback((serviceType: ServiceType) => {
    setIsEdit(true);
    setEditingId(serviceType.id);
    setEditingName(serviceType.name);
    setEditingPrice(serviceType.price);
  }, []);

  const handleClickSave = useCallback(() => {
    updateServiceType({
      id: editingId,
      name: editingName,
      price: editingPrice,
    });
  }, [editingId, editingName, editingPrice, updateServiceType]);

  const handleClickDelete = useCallback(
    (id: string) => {
      deleteServiceType(id);
    },
    [deleteServiceType]
  );

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
      <TableCell className="flex justify-end gap-1 text-right">
        {isEdit && editingId === id ? (
          <Button size="sm" onClick={handleClickSave} variant="outline">
            <Save className="w-4 h-4" />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleClickEdit({ id, name, price })}
              size="sm"
              variant="outline"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleClickDelete(id)}
              size="sm"
              variant="outline"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(ServiceItem);
