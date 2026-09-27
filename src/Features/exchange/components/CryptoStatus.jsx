import { useEffect, useState } from "react";
import { useCryptoTicker } from "../hooks/useCryptoTicker";
import { formatPersianPrice } from "../../../utils/formatters";

function CryptoStatus() {
  const { ticker, tomanPrice } = useCryptoTicker("btcusdt");
  const [flashColor, setFlashColor] = useState("");

  // Flash color on price direction change
  useEffect(() => {
    const color =
      ticker.direction === "up"
        ? "text-emerald-500 bg-emerald-50/80"
        : ticker.direction === "down"
          ? "text-rose-500 bg-rose-50/80"
          : "";

    if (!color) return;

    const timer = setTimeout(() => {
      setFlashColor(color);
    }, 0);

    const clearTimer = setTimeout(() => {
      setFlashColor("");
    }, 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, [ticker.price, ticker.direction]);

  const isPositive = ticker.priceChangePercent >= 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl lg:rounded-full bg-white shadow-xs border border-gray-100/90 transition-all select-none">
      {/* Coin Brand & Icon */}
      <div className="flex items-center gap-3">
        <img
          src="/bitCoin.png"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
          alt="بیت کوین"
        />
        <div className="flex flex-col">
          <span className="font-bold text-base sm:text-lg text-gray-800">
            بیت کوین
          </span>
          <span className="text-xs text-gray-400 font-medium font-mono" dir="ltr">
            BTC
          </span>
        </div>
      </div>

      {/* 24H Change */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-[#777777] text-xs sm:text-sm font-normal mb-1">
          تغییرات ۲۴H
        </span>
        <span
          className={`font-bold text-sm sm:text-base transition-colors ${
            isPositive ? "text-[#37BC74]" : "text-rose-500"
          }`}
          dir="rtl"
        >
          {isPositive ? "+" : ""}
          {formatPersianPrice(ticker.priceChangePercent, 2)}٪
        </span>
      </div>

      {/* 24H High Price */}
      <div className="hidden sm:flex flex-col items-center justify-center">
        <span className="text-[#777777] text-xs sm:text-sm font-normal mb-1">
          بالاترین قیمت
        </span>
        <span className="text-base sm:text-lg text-gray-800 font-semibold" dir="rtl">
          ${formatPersianPrice(ticker.highPrice, 2)}
        </span>
      </div>

      {/* 24H Volume */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <span className="text-[#777777] text-xs sm:text-sm font-normal mb-1">
          حجم ۲۴H
        </span>
        <span className="text-base sm:text-lg text-gray-800 font-semibold" dir="rtl">
          {formatPersianPrice(ticker.volume, 2)}
        </span>
      </div>

      {/* Live Main Price (USD & Tomans) with real-time flash */}
      <div className="flex flex-col items-end justify-center">
        <div
          className={`text-xl sm:text-2xl font-bold px-2 py-0.5 rounded-lg transition-all duration-300 ${
            flashColor || (isPositive ? "text-primary" : "text-rose-600")
          }`}
          dir="rtl"
        >
          {formatPersianPrice(ticker.price, 2)}
        </div>
        <span className="text-[#777777] text-xs sm:text-sm font-normal mt-0.5">
          {formatPersianPrice(tomanPrice, 0)} تومان
        </span>
      </div>
    </div>
  );
}

export default CryptoStatus;
