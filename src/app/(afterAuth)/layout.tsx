import { Suspense } from "react";
import { MobileMenu } from "./components/mobile-menu";
import { Sidebar } from "./components/sidebar";
import Spinner from "@/shared/ui/spinner";

export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1200px] md:h-screen h-full min-h-screen flex mx-auto flex-col md:flex-row border-gray-200 border relative overflow-hidden ">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 overflow-auto p-6 bg-white relative">
        <Suspense fallback={<Spinner />}>
          <div className="container mx-auto w-full mt-[70px] md:mt-0">
            {children}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
