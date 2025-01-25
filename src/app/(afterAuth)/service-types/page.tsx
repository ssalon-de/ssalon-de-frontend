import ServiceList from "./components/service-types-list";
import ServiceTypesHeader from "./components/service-types-header";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceTypesHeader />
      <ServiceList />
    </div>
  );
}
