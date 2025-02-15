export default function BeforeAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 overflow-hidden">
      {children}
    </div>
  );
}
