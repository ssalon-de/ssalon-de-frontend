import { Suspense } from "react";
import { MobileMenu } from "./components/mobile-menu";
import { Sidebar } from "./components/sidebar";
import Spinner from "@/components/ui/spinner";

export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1200px] flex h-screen overflow-hidden mx-auto flex-col md:flex-row border-gray-200 border">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 overflow-auto p-6 bg-white">
        <Suspense fallback={<Spinner />}>
          <div className="container mx-auto w-full">{children}</div>
        </Suspense>
      </main>
    </div>
  );
}
