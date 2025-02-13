"use client";

import { memo, PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useUpdatePaymentType } from "@/queries/settings";
import { PaymentType } from "@/queries/settings/type";

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const PaymentTypeItem: React.FC<Props> = ({ id, name }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");

  const { mutate: update } = useUpdatePaymentType({
    onSuccess: () => {
      setIsEdit(false);
      setEditingId("");
      setEditingName("");
      afterMutatePaymentType();
    },
  });

  const afterMutatePaymentType = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleClickEdit = useCallback((paymentType: PaymentType) => {
    setIsEdit(true);
    setEditingId(paymentType.id);
    setEditingName(paymentType.name);
  }, []);

  const handleClickSave = useCallback(() => {
    update({
      id: editingId,
      name: editingName,
    });
  }, [editingId, editingName, update]);

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
          <Button
            onClick={() => handleClickEdit({ id, name })}
            size="sm"
            variant="outline"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(PaymentTypeItem);
