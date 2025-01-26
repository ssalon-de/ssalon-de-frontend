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
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";
import Spinner from "@/components/ui/spinner";
import { ServiceTypeFilter } from "./service-type-filter";

const SalesList = () => {
  const client = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedSale, setSelectedSale] = useState<string>();
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    []
  );
  const { date } = useDateStore();

  const {
    data: sales = [],
    isLoading,
    isFetching,
  } = useSales(
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

  const loading = isLoading || isFetching;

  const filteredSales = sales.filter((sale) => {
    if (selectedServiceTypes.length === 0) {
      return true;
    }

    return sale.services.some((service) =>
      selectedServiceTypes.includes(service.id)
    );
  });

  const onAfterMutate = useCallback(
    (type: MutateType) => {
      client.invalidateQueries({
        queryKey: [KEYS.sales.list],
      });

      if (type === "DELETE") {
        setOpenDeleteAlert(false);
      } else if (type === "UPDATE") {
        setOpenDialog(false);
      }
      setSelectedSale(undefined);
    },
    [client]
  );

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

  const toggleServiceType = (serviceType: string) => {
    setSelectedServiceTypes((prev) => {
      if (prev.includes(serviceType)) {
        return prev.filter((item) => item !== serviceType);
      } else {
        return [...prev, serviceType];
      }
    });
  };

  return (
    <>
      <ServiceTypeFilter
        selectedTypes={selectedServiceTypes}
        onToggle={toggleServiceType}
      />
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : sales.length === 0 ? (
            <EmptySales
              isLoading={isLoading}
              onClickButton={() => setOpenDialog(true)}
            />
          ) : (
            filteredSales.map((sale) => (
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
