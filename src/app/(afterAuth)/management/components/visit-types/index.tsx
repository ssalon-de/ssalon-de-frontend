import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import VisitTypesList from "./visit-types-list";
import VisitTypesHeader from "./visit-types-header";

export default function VisitTypes() {
  return (
    <div className="space-y-6">
      <VisitTypesHeader />
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <VisitTypesList />
      </Suspense>
    </div>
  );
}
