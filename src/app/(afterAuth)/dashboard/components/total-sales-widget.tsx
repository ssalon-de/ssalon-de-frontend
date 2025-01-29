"use client";

export function TotalSalesWidget() {
  const salesData = [
    { type: "카드", amount: 5000000 },
    { type: "현금", amount: 2000000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
    { type: "네이버 페이", amount: 500000 },
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4 max-h-[450px] overflow-auto">
      <div className="text-2xl font-bold">
        총 매출: {totalSales.toLocaleString()}원
      </div>
      <div className="space-y-2">
        {salesData.map((item, idx) => (
          <div key={`${item.type}${idx}`} className="flex justify-between">
            <span>{item.type}</span>
            <span>{item.amount.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}
