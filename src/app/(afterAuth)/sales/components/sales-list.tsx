"use client";

import { memo, useCallback, useState } from "react";
import dayjs from "dayjs";

import { useDeleteSale, useSales } from "@/queries/sales";
import { MutateType } from "@/shared/types/query";

import SalesItem from "./sales-item";
import EmptySales from "./empty-sales";
import CreateEditSaleDialog from "./create-edit-sale-dialog";
import DeleteSaleAlert from "./delete-sale-alert";
import useDateStore from "@/zustand/date";

const SalesList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedSale, setSelectedSale] = useState<string>();
  const { date } = useDateStore();

  const { data: sales = [], isLoading } = useSales(
    {
      startTime: dayjs(date).startOf("day").unix(),
      endTime: dayjs(date).endOf("day").unix(),
    },
    {
      enabled: !!date,
    }
  );

  const { mutate: deleteSale } = useDeleteSale({
    onSuccess: () => onAfterMutate("DELETE"),
  });

  const onAfterMutate = useCallback((type: MutateType) => {
    setSelectedSale(undefined);
    if (type === "DELETE") {
      setOpenDeleteAlert(false);
    } else if (type === "UPDATE") {
      setOpenDialog(false);
    }
  }, []);

  const handleAction = useCallback(
    (type: MutateType) => (id: string) => {
      setSelectedSale(id);
      if (type === "DELETE") {
        setOpenDeleteAlert(true);
      } else if (type === "UPDATE") {
        setOpenDialog(true);
      }
    },
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (selectedSale) {
      deleteSale(selectedSale);
    }
  }, [selectedSale, deleteSale]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {sales.length === 0 ? (
            <EmptySales
              isLoading={isLoading}
              onClickButton={() => setOpenDialog(true)}
            />
          ) : (
            sales.map((sale) => (
              <SalesItem
                key={sale.id}
                {...sale}
                onClickDelete={handleAction("DELETE")}
                onClickEdit={handleAction("UPDATE")}
              />
            ))
          )}
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
};

export default memo(SalesList);
