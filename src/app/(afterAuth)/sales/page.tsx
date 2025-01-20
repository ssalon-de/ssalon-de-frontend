import { Card } from "@/components/ui/card";
import SalesHeader from "./components/sales-header";
import SalesList from "./components/sales-list";

export default function SalesListPage() {
  return (
    <Card>
      <SalesHeader />
      <div className="space-y-4">
        <SalesList />
      </div>
    </Card>
  );
}
