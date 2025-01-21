import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServiceList from "./components/service-types-list";
import ServicTypesHeader from "./components/service-types-header";

export default function Page() {
  return (
    <Card>
      <ServicTypesHeader />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>서비스</TableHead>
              <TableHead>가격</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ServiceList />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
