import { useMemo } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useCryptoTicker } from "../hooks/useCryptoTicker";
import { formatPersianPrice } from "../../../utils/formatters";

function OrderBook() {
  const { ticker, tomanPrice } = useCryptoTicker("btcusdt");

  // Generate realistic order book bids and asks synced around the live price
  const { asks, bids } = useMemo(() => {
    const basePrice = ticker.price || 63245.18;
    const askList = [];
    const bidList = [];

    // 6 Asks (Sell orders)
    for (let i = 6; i >= 1; i--) {
      const p = basePrice + i * (basePrice * 0.00035);
      const amount = 0.2154;
      const total = p * amount;
      askList.push({
        price: p,
        amount,
        total,
      });
    }

    // 10 Bids (Buy orders)
    for (let i = 1; i <= 10; i++) {
      const p = basePrice - i * (basePrice * 0.00035);
      const amount = 0.2154;
      const total = p * amount;
      bidList.push({
        price: p,
        amount,
        total,
      });
    }

    return { asks: askList, bids: bidList };
  }, [ticker.price]);

  const isUp = ticker.direction === "up" || ticker.priceChangePercent >= 0;

  return (
    <div
      className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-xs flex flex-col select-none w-full h-full"
      dir="rtl"
    >
      {/* Title */}
      <div className="pb-3 border-b border-gray-200/80">
        <h3 className="font-bold text-lg text-gray-800 text-center sm:text-right">
          دفتر سفارش
        </h3>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-400 py-2.5 border-b border-gray-100 font-medium text-center">
        <span className="text-right">قیمت(USDT)</span>
        <span className="text-center">مقدار(BTC)</span>
        <span className="text-left">مجموع(USDT)</span>
      </div>

      {/* Asks (Sell Orders - Red) */}
      <div className="space-y-1.5 my-2">
        {asks.map((order, idx) => (
          <div
            key={`ask-${idx}`}
            className="grid grid-cols-3 text-xs py-0.5 px-0.5"
            dir="rtl"
          >
            <span className="text-rose-500 font-medium text-right">
              {formatPersianPrice(order.price, 2)}
            </span>
            <span className="text-gray-700 font-medium text-center">
              {formatPersianPrice(order.amount, 4)}
            </span>
            <span className="text-rose-500 font-medium text-left">
              {formatPersianPrice(order.total, 2)}
            </span>
          </div>
        ))}
      </div>

      {/* Middle Current Price Box */}
      <div className="my-2.5 px-4 py-3 rounded-2xl border border-[#777777] bg-white flex items-center justify-end transition-all">
        {/* Price & Tomans on the Right in RTL */}
        <div className="flex flex-col text-end ml-5">
          <span className="font-bold text-xl text-primary leading-tight">
            {formatPersianPrice(ticker.price, 2)}
          </span>
          <span className="text-xs text-gray-400 font-normal mt-0.5">
            {formatPersianPrice(tomanPrice, 0)} تومان
          </span>
        </div>

        {/* Outlined Arrow Button on the Left in RTL */}
        <div className="w-10 h-10 rounded-xl border border-[#777777] flex items-center justify-center text-gray-600 transition-colors">
          {isUp ? (
            <FaArrowUp className="size-4" />
          ) : (
            <FaArrowDown className="size-4" />
          )}
        </div>
      </div>

      {/* Bids (Buy Orders - Green) */}
      <div className="space-y-1.5 my-2">
        {bids.map((order, idx) => (
          <div
            key={`bid-${idx}`}
            className="grid grid-cols-3 text-xs py-0.5 px-0.5"
            dir="rtl"
          >
            <span className="text-emerald-500 font-medium text-right">
              {formatPersianPrice(order.price, 2)}
            </span>
            <span className="text-gray-700 font-medium text-center">
              {formatPersianPrice(order.amount, 4)}
            </span>
            <span className="text-emerald-500 font-medium text-left">
              {formatPersianPrice(order.total, 2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderBook;
