import Spinner from "@/components/ui/spinner";
import { useTotalAmount } from "@/queries/sales";
import useDateStore from "@/zustand/date";
import dayjs from "dayjs";

export function TotalSales() {
  const { date } = useDateStore();
  const {
    data: amount = 0,
    isLoading,
    isFetching,
  } = useTotalAmount(dayjs(date).format("YYYY-MM-DDTHH:mm"));
  const loading = isLoading || isFetching;

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-medium">총 매출</span>
      {loading ? (
        <Spinner />
      ) : (
        <p className="text-2xl font-bold">{amount.toLocaleString()}원</p>
      )}
    </div>
  );
}
