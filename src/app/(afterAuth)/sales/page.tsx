import { Card, CardContent } from "@/components/ui/card";
import SalesHeader from "./components/sales-header";
import SalesList from "./components/sales-list";

export default function SalesListPage() {
  return (
    <Card className="w-full h-full">
      <SalesHeader />
      <CardContent>
        <SalesList />
      </CardContent>
    </Card>
  );
}
