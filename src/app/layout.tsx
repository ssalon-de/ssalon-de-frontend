import type { Metadata } from "next";
import QueryProvider from "@/shared/providers/react-query";
import { Toaster } from "@/shared/ui/toaster";

import localFont from "next/font/local";
import "./globals.css";

const pretandard = localFont({
  src: "../assets/fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "ssalon de",
  description: "매출을 관리해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretandard.className} bg-gray-100`}>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
