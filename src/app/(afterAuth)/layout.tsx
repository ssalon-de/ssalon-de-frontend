import { MobileMenu } from "@/components/mobile-menu";
import { Sidebar } from "@/components/sidebar";

export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 overflow-auto p-6">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
}
