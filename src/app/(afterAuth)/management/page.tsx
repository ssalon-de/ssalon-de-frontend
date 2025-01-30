import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceTypes from "./components/service-types";
import PaymentTypes from "./components/payment-types";
import Settings from "./components/settings";

export default function ManagementPage() {
  return (
    <Tabs defaultValue="service-types">
      <TabsList className="mb-2">
        <TabsTrigger value="service-types">서비스 타입</TabsTrigger>
        <TabsTrigger value="payment-types">결제 유형</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="service-types">
        <ServiceTypes />
      </TabsContent>
      <TabsContent value="payment-types">
        <PaymentTypes />
      </TabsContent>
      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
