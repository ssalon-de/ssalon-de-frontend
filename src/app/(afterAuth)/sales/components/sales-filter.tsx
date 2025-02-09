import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import { usePaymentTypes } from "@/queries/payment-types";
import { useServiceTypes } from "@/queries/service-types";
import { useVisitTypes } from "@/queries/settings";
import { Filter } from "@/shared/types/filter";

type SalesFilterProps = {
  selectedFilters: Filter[];
  onToggle: (filter: Filter) => void;
};

export function SalesFilter({ selectedFilters, onToggle }: SalesFilterProps) {
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

  const filterList = [
    ...visitTypes,
    ...serviceTypes,
    ...paymentTypes,
    ...genders,
  ] as Filter[];

  return (
    <div className="flex flex-wrap gap-2">
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
            className="cursor-pointer"
            onClick={() => onToggle({ id, type, name })}
          >
            {name}
          </Badge>
        ))
      )}
    </div>
  );
}
