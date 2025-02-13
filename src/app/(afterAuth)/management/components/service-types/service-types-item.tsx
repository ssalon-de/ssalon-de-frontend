"use client";

import { memo, PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useDeleteServiceType, useUpdateServiceType } from "@/queries/settings";
import { ServiceType } from "@/queries/settings/type";

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const ServiceItem: React.FC<Props> = ({ id, name }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");

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
  }, []);

  const handleClickSave = useCallback(() => {
    updateServiceType({
      id: editingId,
      name: editingName,
    });
  }, [editingId, editingName, updateServiceType]);

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
      <TableCell className="flex justify-end gap-1 text-right">
        {isEdit && editingId === id ? (
          <Button size="sm" onClick={handleClickSave} variant="outline">
            <Save className="w-4 h-4" />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleClickEdit({ id, name })}
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
