"use client";

import { memo, useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";

import { useDeleteSale, useSales } from "@/queries/sales";
import { MutateType } from "@/shared/types/query";

import SalesItem from "./sales-item";
import EmptySales from "./empty-sales";
import DeleteSaleAlert from "./delete-sale-alert";
import useDateStore from "@/zustand/date";
import { useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/shared/constants/query-keys";
import Spinner from "@/components/ui/spinner";
import { ServiceTypeFilter } from "./service-type-filter";
import { useRouter } from "next/navigation";
import { Filter } from "@/shared/types/filter";

const SalesList = () => {
  const client = useQueryClient();
  const router = useRouter();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedSale, setSelectedSale] = useState<string>();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
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

  const filteredSales = useMemo(
    () =>
      sales.filter((sale) => {
        const selectedServices = selectedFilters
          .filter((filter) => filter.type === "serviceType")
          .map(({ id }) => id);

        // 서비스 타입이 있다면 필터링
        if (selectedServices.length > 0) {
          return sale.services.some((service) =>
            selectedServices.includes(service.id)
          );
        }

        const selectedGenders = selectedFilters
          .filter((filter) => filter.type === "gender")
          .map(({ id }) => id);

        // 성별이 있다면 필터링
        if (selectedGenders.length > 0) {
          return selectedGenders.includes(sale.gender);
        }

        const selectedPaymentTypes = selectedFilters
          .filter((filter) => filter.type === "paymentType")
          .map(({ id }) => id);

        // 결제 유형이 있다면 필터링
        if (selectedPaymentTypes.length > 0) {
          return selectedPaymentTypes.includes(sale.paymentType.id);
        }

        return true;
      }),
    [sales, selectedFilters]
  );

  const onAfterMutate = useCallback(
    (type: MutateType) => {
      client.invalidateQueries({
        queryKey: [KEYS.sales.list],
      });

      if (type === "DELETE") {
        setOpenDeleteAlert(false);
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
        router.push(`/sales/edit?saleId=${id}`);
      }
    },
    [router]
  );

  const handleConfirmDelete = useCallback(() => {
    if (selectedSale) {
      deleteSale(selectedSale);
    }
  }, [selectedSale, deleteSale]);

  const toggleFilterType = (filter: Filter) => {
    setSelectedFilters((prev) => {
      if (prev.some(({ id }) => id === filter.id)) {
        return prev.filter((item) => item.id !== filter.id);
      } else {
        return [...prev, filter];
      }
    });
  };

  return (
    <>
      <ServiceTypeFilter
        selectedFilters={selectedFilters}
        onToggle={toggleFilterType}
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
              onClickButton={() => router.push("/sales/edit")}
            />
          ) : (
            filteredSales.map((sale) => (
              <SalesItem
                key={sale.id}
                onClickEdit={handleAction("UPDATE")}
                onClickDelete={handleAction("DELETE")}
                {...sale}
              />
            ))
          )}
        </div>
      </div>
      <DeleteSaleAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default memo(SalesList);
