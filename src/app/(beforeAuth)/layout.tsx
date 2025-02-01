export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen overflow-auto bg-gray-50">
      {children}
    </div>
  );
}
