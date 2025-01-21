"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import dayjs from "dayjs";
import { useDeleteSale, useSales } from "@/queries/sales";
import SalesItem from "./sales-item";
import { CreateEditSaleDialog } from "./create-edit-sale-dialog";
import DeleteSaleAlert from "./delete-sale-alert";
import { MutateType } from "@/shared/types/query";

export default function SalesList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedSale, setSelectedSale] = useState<string>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { mutate: deleteSale } = useDeleteSale({
    onSuccess: () => onAfterMutate("DELETE"),
  });

  const { data: sales = [] } = useSales(
    {
      startTime: dayjs(startTime).unix(),
      endTime: dayjs(endTime).unix(),
    },
    {
      enabled: !!startTime && !!endTime,
    }
  );

  const onAfterMutate = (type: MutateType) => {
    setSelectedSale(undefined);
    if (type === "DELETE") {
      setOpenDeleteAlert(false);
    } else if (type === "UPDATE") {
      setOpenDialog(false);
    }
  };

  const handleAction = (type: MutateType) => (id: string) => {
    setSelectedSale(id);
    if (type === "DELETE") {
      setOpenDeleteAlert(true);
    } else if (type === "UPDATE") {
      setOpenDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedSale) {
      deleteSale(selectedSale);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-[200px] flex-wrap">
            <Label htmlFor="startDate" className="mb-2 block">
              시작 날짜
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="endDate" className="mb-2 block">
              종료 날짜
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => {
                setStartTime("");
                setEndTime("");
              }}
              className="w-full sm:w-auto"
            >
              필터 초기화
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {sales.map((sale) => (
            <SalesItem
              key={sale.id}
              {...sale}
              onClickDelete={handleAction("DELETE")}
              onClickEdit={handleAction("UPDATE")}
            />
          ))}
        </div>
      </div>
      <CreateEditSaleDialog
        id={selectedSale}
        open={openDialog}
        onOpenChange={setOpenDialog}
        onAfterMutate={onAfterMutate}
      />
      <DeleteSaleAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
