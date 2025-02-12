import SalesHeader from "./components/sales-header";
import SalesList from "./components/sales-list";

export default function SalesListPage() {
  return (
    <div className="flex flex-col gap-3">
      <SalesHeader />
      <SalesList />
    </div>
  );
}
