import ServiceList from "./components/service-types-list";
import ServiceTypesHeader from "./components/service-types-header";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceTypesHeader />
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <ServiceList />
      </Suspense>
    </div>
  );
}
