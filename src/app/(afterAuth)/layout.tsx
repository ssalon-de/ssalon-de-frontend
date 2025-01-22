import { MobileMenu } from "./components/mobile-menu";
import { Sidebar } from "./components/sidebar";

export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1200px] flex h-screen overflow-hidden mx-auto">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 overflow-auto p-6 bg-white">
        <div className="container mx-auto w-full h-full">{children}</div>
      </main>
    </div>
  );
}
