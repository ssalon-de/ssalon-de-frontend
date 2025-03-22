import { Badge } from "@/shared/ui/badge";
import Spinner from "@/shared/ui/spinner";
import {
  useVisitTypes,
  useServiceTypes,
  usePaymentTypes,
} from "@/queries/settings";
import { Filter } from "@/shared/types/filter";
import useBadgeCustomStore from "@/zustand/badge-custom";

type SalesFilterProps = {
  selectedFilters: Filter[];
  onToggle: (filter: Filter) => void;
};

export function SalesFilter({ selectedFilters, onToggle }: SalesFilterProps) {
  const badgeCustom = useBadgeCustomStore((state) => state.badgeCustom);
  const { data: serviceTypes = [], isFetching: isServiceTypeFetching } =
    useServiceTypes({
      select: (data) =>
        data.map((service) => ({ ...service, type: "serviceType" })),
    });
  const { data: paymentTypes = [], isFetching: isPaymentTypeFetching } =
    usePaymentTypes({
      select: (data) =>
        data.map((paymentType) => ({ ...paymentType, type: "paymentType" })),
    });
  const { data: visitTypes = [], isFetching: isVisitTypesFetching } =
    useVisitTypes({
      select: (data) =>
        data.map((service) => ({ ...service, type: "visitType" })),
    });

  // const isFirst = { id: "isFirst", name: "첫 방문", type: "firstVisitType" };
  const genders = [
    { id: "M", name: "남성", type: "gender" },
    { id: "F", name: "여성", type: "gender" },
  ];

  console.log(badgeCustom);

  const filterList = [
    ...visitTypes,
    ...serviceTypes,
    ...paymentTypes,
    ...genders,
  ] as Filter[];

  return (
    <div className="flex md:flex-wrap md:mt-[24px] h-auto py-[6px] gap-1 box-border overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hidden">
      {isServiceTypeFetching ||
      isPaymentTypeFetching ||
      isVisitTypesFetching ? (
        <Spinner />
      ) : (
        filterList.map(({ id, name, type }) => (
          <Badge
            key={id}
            variant={
              selectedFilters.some((filter) => filter.id === id)
                ? "default"
                : "outline"
            }
            className="cursor-pointer select-none"
            onClick={() => onToggle({ id, type, name })}
          >
            {name}
          </Badge>
        ))
      )}
    </div>
  );
}
