"use client";

import { useRouter } from "next/navigation";
import { memo, PropsWithChildren, useCallback, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableCell, TableRow } from "@/shared/ui/table";
import { ConfirmDialog } from "@/shared/ui/alert-dialog";
import { KEYS } from "@/shared/constants/query-keys";

import { useDeletePaymentType, useUpdatePaymentType } from "@/queries/settings";
import { PaymentType } from "@/queries/settings/type";

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const PaymentTypeItem: React.FC<Props> = ({ id, name }) => {
  const router = useRouter();
  const client = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState("");
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const { mutate: deletePaymentType } = useDeletePaymentType({
    onSuccess: () => {
      afterMutatePaymentType();
    },
  });

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
    client.invalidateQueries({
      queryKey: [KEYS.filters, KEYS.paymentTypes.list],
    });
  }, [client, router]);

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

  const handleClickDelete = useCallback(
    (id: string) => {
      deletePaymentType(id);
    },
    [deletePaymentType]
  );

  return (
    <>
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
                onClick={() => setOpenDeleteConfirm(true)}
                size="sm"
                variant="outline"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={() => handleClickDelete(id)}
        title="결제 유형 삭제"
        description="결제 유형을 삭제하시겠습니까? 삭제 시 관련 데이터를 확인할 수 없습니다."
        confirmText="삭제"
      />
    </>
  );
};

export default memo(PaymentTypeItem);
