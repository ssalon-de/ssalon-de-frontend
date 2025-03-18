"use client";

import { memo, PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useDeleteServiceType, useUpdateServiceType } from "@/queries/settings";
import { ServiceType } from "@/queries/settings/type";
import { ConfirmDialog } from "@/shared/ui/alert-dialog";
import useIsEditSettingsStore from "@/zustand/edit-setting";

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const ServiceItem: React.FC<Props> = ({ id, name }) => {
  const router = useRouter();
  const editSettingId = useIsEditSettingsStore((state) => state.editSettingId);
  const setEditSettingId = useIsEditSettingsStore(
    (state) => state.setEditSettingId
  );
  const [isEdit, setIsEdit] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingPrice, setEditingPrice] = useState<number | undefined>();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const { mutate: deleteServiceType } = useDeleteServiceType({
    onSuccess: () => {
      afterMutateServiceType();
    },
  });

  const { mutate: updateServiceType } = useUpdateServiceType({
    onSuccess: () => {
      setIsEdit(false);
      setEditingName("");
      setEditingPrice(0);
      afterMutateServiceType();
      setEditSettingId("");
    },
  });

  const afterMutateServiceType = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleClickEdit = useCallback(
    (serviceType: ServiceType) => {
      setIsEdit(true);
      setEditingName(serviceType.name);
      setEditingPrice(serviceType.price ?? undefined);
      setEditSettingId(serviceType.id);
    },
    [setEditSettingId]
  );

  const handleClickSave = useCallback(() => {
    updateServiceType({
      id: editSettingId,
      name: editingName,
      price: editingPrice ?? undefined,
    });
  }, [editSettingId, editingName, editingPrice, updateServiceType]);

  const handleClickDelete = useCallback(
    (id: string) => {
      deleteServiceType(id);
    },
    [deleteServiceType]
  );

  return (
    <>
      <TableRow key={id}>
        <TableCell>
          {editSettingId === id ? (
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="(필수) 서비스 유형"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
              />
              <Input
                placeholder="(선택) 가격을 입력해주세요."
                type="number"
                value={editingPrice ?? undefined}
                onChange={(e) => setEditingPrice(+e.target.value)}
              />
            </div>
          ) : (
            name
          )}
        </TableCell>
        <TableCell className="flex justify-end gap-1 text-right">
          {isEdit && editSettingId === id ? (
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
        title="서비스 유형 삭제"
        description="서비스 유형을 삭제하시겠습니까? 삭제 시 관련 데이터를 확인할 수 없습니다."
        confirmText="삭제"
      />
    </>
  );
};

export default memo(ServiceItem);
