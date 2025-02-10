"use client";

import { memo, PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableCell, TableRow } from "@/shared/ui/table";
import { VisitType } from "@/queries/settings/type";
import { useDeleteVisitType, useUpdateVisitType } from "@/queries/settings";

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const VisitTypesItem: React.FC<Props> = ({ id, name }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");

  const { mutate: deleteVisitType } = useDeleteVisitType({
    onSuccess: () => {
      afterMutateVisitType();
    },
  });

  const { mutate: updateVisitType } = useUpdateVisitType({
    onSuccess: () => {
      setIsEdit(false);
      setEditingId("");
      setEditingName("");
      afterMutateVisitType();
    },
  });

  const afterMutateVisitType = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleClickEdit = useCallback((visitType: VisitType) => {
    setIsEdit(true);
    setEditingId(visitType.id);
    setEditingName(visitType.name);
  }, []);

  const handleClickSave = useCallback(() => {
    updateVisitType({
      id: editingId,
      name: editingName,
    });
  }, [editingId, editingName, updateVisitType]);

  const handleClickDelete = useCallback(
    (id: string) => {
      deleteVisitType(id);
    },
    [deleteVisitType]
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

export default memo(VisitTypesItem);
