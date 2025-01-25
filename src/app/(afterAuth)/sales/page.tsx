import SalesHeader from "./components/sales-header";
import SalesList from "./components/sales-list";

export default function SalesListPage() {
  return (
    <div className="space-y-6">
      <SalesHeader />
      <SalesList />
    </div>
  );
}
