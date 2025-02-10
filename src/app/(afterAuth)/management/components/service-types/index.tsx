import { Suspense } from "react";
import Spinner from "@/shared/ui/spinner";
import ServiceTypesHeader from "./service-types-header";
import ServiceList from "./service-types-list";

export default function ServiceTypes() {
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
