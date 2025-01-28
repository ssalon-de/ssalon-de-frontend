import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import PaymentTypesHeader from "./payment-types-header";
import PaymentTypeList from "./payment-types-list";

export default function PaymentTypes() {
  return (
    <div className="space-y-6">
      <PaymentTypesHeader />
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <PaymentTypeList />
      </Suspense>
    </div>
  );
}
