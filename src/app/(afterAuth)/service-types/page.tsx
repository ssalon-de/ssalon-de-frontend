import { Card, CardContent } from "@/components/ui/card";
import ServiceList from "./components/service-types-list";
import ServicTypesHeader from "./components/service-types-header";

export default function Page() {
  return (
    <Card className="w-full h-full  overflow-auto">
      <ServicTypesHeader />
      <CardContent>
        <ServiceList />
      </CardContent>
    </Card>
  );
}
