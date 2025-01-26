import { Badge } from "@/components/ui/badge";
import { useServiceTypes } from "@/queries/service-types";

type ServiceTypeFilterProps = {
  selectedTypes: string[];
  onToggle: (type: string) => void;
};

export function ServiceTypeFilter({
  selectedTypes,
  onToggle,
}: ServiceTypeFilterProps) {
  const { data: serviceTypes = [] } = useServiceTypes();

  return (
    <div className="flex flex-wrap gap-2">
      {serviceTypes.map(({ id, name }) => (
        <Badge
          key={id}
          variant={selectedTypes.includes(id) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onToggle(id)}
        >
          {name}
        </Badge>
      ))}
    </div>
  );
}
