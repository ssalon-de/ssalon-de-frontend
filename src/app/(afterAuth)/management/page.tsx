import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceTypes from "./components/service-types";
import PaymentTypes from "./components/payment-types";
import Settings from "./components/settings";
import React from "react";

type Content = "settings" | "service-types" | "payment-types";

const contents: Record<Content, { label: string; content: React.ReactNode }> = {
  settings: {
    label: "설정",
    content: <Settings />,
  },
  "payment-types": {
    label: "결제 유형",
    content: <PaymentTypes />,
  },

  "service-types": {
    label: "서비스 유형",
    content: <ServiceTypes />,
  },
};

export default function ManagementPage() {
  return (
    <Tabs defaultValue="settings">
      <TabsList className="mb-2">
        {Object.entries(contents).map(([key, { label }]) => (
          <TabsTrigger key={`trigger${key}`} value={key}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(contents).map(([key, { content }]) => (
        <TabsContent key={`content${key}`} value={key}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
