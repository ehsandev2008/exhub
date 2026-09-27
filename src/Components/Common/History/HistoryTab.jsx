import clsx from "clsx";
import { useState } from "react";
import Empty from "./fragments/Empty";
import Orders from "./fragments/Orders";
import History from "./fragments/History";

const initialOrders = [
  {
    id: "ord-101",
    date: "1403/06/19 - 14:22",
    pair: "BTC/USDT",
    type: "limit",
    side: "buy",
    price: 62850.0,
    amount: 0.15,
    filled: 0.045,
    status: "open",
  },
  {
    id: "ord-102",
    date: "1403/06/19 - 13:05",
    pair: "BTC/USDT",
    type: "limit",
    side: "sell",
    price: 64100.0,
    amount: 0.28,
    filled: 0.18,
    status: "open",
  },
];

const initialHistory = [
  {
    id: "tx-501",
    date: "1403/06/19 - 12:45",
    pair: "BTC/USDT",
    side: "buy",
    price: 63120.5,
    amount: 0.12,
    fee: 0.0001,
    total: 7574.46,
    status: "completed",
  },
  {
    id: "tx-502",
    date: "1403/06/18 - 18:20",
    pair: "BTC/USDT",
    side: "sell",
    price: 63450.0,
    amount: 0.25,
    fee: 0.0002,
    total: 15862.5,
    status: "completed",
  },
  {
    id: "tx-503",
    date: "1403/06/17 - 09:12",
    pair: "ETH/USDT",
    side: "buy",
    price: 3450.2,
    amount: 1.5,
    fee: 0.001,
    total: 5175.3,
    status: "completed",
  },
  {
    id: "tx-504",
    date: "1403/06/16 - 21:30",
    pair: "BTC/USDT",
    side: "buy",
    price: 61980.0,
    amount: 0.5,
    fee: 0.0004,
    total: 30990.0,
    status: "completed",
  },
];

function HistoryTab() {
  const [activeTab, setActiveTab] = useState(1);
  const [orders, setOrders] = useState(initialOrders);
  const [history, setHistory] = useState(initialHistory);

  const handleCancelOrder = (id) => {
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setOrders([]);
    setHistory([]);
  };

  const handleRestore = () => {
    setOrders(initialOrders);
    setHistory(initialHistory);
  };

  const bothEmpty = orders.length === 0 && history.length === 0;

  return (
    <div className="w-full bg-white rounded-3xl mt-6 p-4 sm:p-6 border border-gray-100 shadow-xs" dir="rtl">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          {/* Tab 1: تاریخچه */}
          <button
            className={clsx(
              "px-4 py-2 text-sm font-semibold transition cursor-pointer relative",
              activeTab === 1
                ? "text-primary"
                : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => setActiveTab(1)}
          >
            <span className="flex items-center gap-1.5">
              تاریخچه معامله
              {history.length > 0 && (
                <span className="text-[11px] px-1.5 py-0.2 bg-blue-50 text-primary rounded-full font-mono">
                  {history.length}
                </span>
              )}
            </span>
            {activeTab === 1 && (
              <span className="absolute bottom-[-9px] right-0 left-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>

          {/* Tab 2: سفارشات باز */}
          <button
            className={clsx(
              "px-4 py-2 text-sm font-semibold transition cursor-pointer relative",
              activeTab === 2
                ? "text-primary"
                : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => setActiveTab(2)}
          >
            <span className="flex items-center gap-1.5">
              سفارشات باز
              {orders.length > 0 && (
                <span className="text-[11px] px-1.5 py-0.2 bg-blue-50 text-primary rounded-full font-mono">
                  {orders.length}
                </span>
              )}
            </span>
            {activeTab === 2 && (
              <span className="absolute bottom-[-9px] right-0 left-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Quick Demo State Switcher (Clear/Restore) */}
        <div className="flex items-center gap-2 text-xs">
          {bothEmpty ? (
            <button
              onClick={handleRestore}
              className="text-primary hover:underline text-xs cursor-pointer"
            >
              نمایش مجدد داده‌های نمونه
            </button>
          ) : (
            <button
              onClick={handleClearAll}
              className="text-gray-400 hover:text-rose-500 text-xs transition-colors cursor-pointer"
              title="پاک کردن داده‌ها برای تست حالت خالی"
            >
              خالی کردن همه
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-3">
        {activeTab === 1 && (
          history.length > 0 ? (
            <History transactions={history} />
          ) : (
            <Empty message="در حال حاضر تاریخچه تراکنشی ثبت نشده است" />
          )
        )}

        {activeTab === 2 && (
          orders.length > 0 ? (
            <Orders orders={orders} onCancelOrder={handleCancelOrder} />
          ) : (
            <Empty message="در حال حاضر سفارشی را به صورت باز ندارید" />
          )
        )}
      </div>
    </div>
  );
}

export default HistoryTab;
