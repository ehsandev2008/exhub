import clsx from "clsx";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

function StopPanel({ type = "buy" }) {
  const [stopPrice, setStopPrice] = useState(62000);
  const [limitPrice, setLimitPrice] = useState(61800);
  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(50);

  return (
    <div dir="rtl" className="w-full max-w-90 rounded-[30px] bg-white p-6">
      {/* قیمت فعال‌سازی (Stop) */}
      <div className="mb-4">
        <p className="mb-2 text-right text-xs text-gray-600">قیمت فعال‌سازی (Stop USDT)</p>
        <div className="flex h-12 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-4">
          <button
            type="button"
            onClick={() => setStopPrice((p) => p + 50)}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={20} />
          </button>
          <span className="text-sm text-gray-700 font-mono">
            {stopPrice.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setStopPrice((p) => Math.max(0, p - 50))}
            className="text-primary cursor-pointer"
          >
            <RiSubtractLine size={20} />
          </button>
        </div>
      </div>

      {/* قیمت سفارش (Limit) */}
      <div className="mb-4">
        <p className="mb-2 text-right text-xs text-gray-600">قیمت لیمیت (Limit USDT)</p>
        <div className="flex h-12 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-4">
          <button
            type="button"
            onClick={() => setLimitPrice((p) => p + 50)}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={20} />
          </button>
          <span className="text-sm text-gray-700 font-mono">
            {limitPrice.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setLimitPrice((p) => Math.max(0, p - 50))}
            className="text-primary cursor-pointer"
          >
            <RiSubtractLine size={20} />
          </button>
        </div>
      </div>

      {/* مقدار */}
      <div className="mb-5">
        <p className="mb-2 text-right text-xs text-gray-600">مقدار (USDT)</p>
        <div className="flex h-12 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-4">
          <button
            type="button"
            onClick={() => setAmount((a) => a + 50)}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={20} />
          </button>
          <span className="text-sm text-gray-700 font-mono">
            {amount.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setAmount((a) => Math.max(0, a - 50))}
            className="text-primary cursor-pointer"
          >
            <RiSubtractLine size={20} />
          </button>
        </div>
      </div>

      {/* درصدها */}
      <div className="mb-5 flex justify-between gap-2">
        {[25, 50, 75, 100].map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setPercent(item)}
            className={clsx(
              "h-8 flex-1 rounded-full border text-xs transition-all cursor-pointer",
              percent === item
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-gray-300 bg-[#F1F4F9] text-gray-600",
            )}
          >
            {item}٪
          </button>
        ))}
      </div>

      {/* دکمه اقدام */}
      <button
        type="button"
        className={clsx(
          "h-14 w-full rounded-full text-base text-white transition hover:opacity-90 cursor-pointer shadow-md font-bold",
          type === "sell"
            ? "bg-rose-500 shadow-rose-500/20"
            : "bg-[#20B52A] shadow-emerald-500/20",
        )}
      >
        {type === "sell" ? "ثبت سفارش حد ضرر (Stop Sell)" : "ثبت سفارش استاپ (Stop Buy)"}
      </button>
    </div>
  );
}

export default StopPanel;
