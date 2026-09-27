import clsx from "clsx";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

function MarketPanel({ type = "buy" }) {
  const [amount, setAmount] = useState(1500);
  const [percent, setPercent] = useState(50);
  const [network, setNetwork] = useState(0);

  const increaseAmount = () => {
    setAmount((prev) => prev + 10);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(0, prev - 10));
  };

  const networks = ["TRC", "ERC", "BEP20"];

  return (
    <div dir="rtl" className="w-full max-w-90 rounded-[30px] bg-white p-6">
      {/* قیمت لحظه‌ای بازار */}
      <div className="mb-6">
        <p className="mb-2 text-right text-sm text-gray-700">قیمت (قیمت بازار)</p>
        <div className="flex h-13.5 items-center justify-center rounded-full border border-gray-300 bg-[#F1F4F9] px-5">
          <span className="text-sm font-medium text-gray-500">
            بهترین قیمت لحظه‌ای بازار
          </span>
        </div>
      </div>

      {/* مقدار USDT */}
      <div className="mb-7">
        <p className="mb-2 text-right text-sm text-gray-700">مقدار (USDT)</p>

        <div className="flex h-13.5 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-5">
          <button
            type="button"
            onClick={increaseAmount}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={24} />
          </button>

          <span className="text-sm text-gray-700 font-mono">
            {amount.toLocaleString("fa-IR")}
          </span>

          <button
            type="button"
            onClick={decreaseAmount}
            className="text-primary cursor-pointer"
          >
            <RiSubtractLine size={24} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="h-0.75 w-full cursor-pointer accent-primary bg-transparent"
        />
      </div>

      {/* درصدها */}
      <div className="mb-5 flex justify-between gap-2">
        {[25, 50, 75, 100].map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setPercent(item)}
            className={clsx(
              "h-9.5 flex-1 rounded-full border text-sm transition-all cursor-pointer",
              percent === item
                ? "border-primary bg-primary text-white shadow-[0_8px_20px_rgba(6,80,215,0.25)]"
                : "border-gray-300 bg-[#F1F4F9] text-gray-600",
            )}
          >
            {item}٪
          </button>
        ))}
      </div>

      {/* مجموع ارزش تقریبی */}
      <div className="mb-5 flex h-14.5 items-center justify-between rounded-2xl bg-[#F7F7F7] px-4">
        <span className="text-sm text-gray-500">ارزش تقریبی بر پایه بازار</span>
        <span className="text-sm text-gray-500 font-mono">IRT</span>
      </div>

      {/* شبکه انتقال */}
      <div className="mb-5 flex gap-3">
        {networks.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setNetwork(index)}
            className={clsx(
              "h-10 flex-1 rounded-full text-sm transition-all cursor-pointer",
              network === index
                ? "bg-[#FFF8E8] text-[#E9A900] font-medium"
                : "bg-[#F5F5F5] text-gray-500",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* دکمه اقدام */}
      <button
        type="button"
        className={clsx(
          "h-15 w-full rounded-full text-base text-white transition hover:opacity-90 cursor-pointer shadow-md font-bold",
          type === "sell"
            ? "bg-rose-500 shadow-rose-500/20"
            : "bg-[#20B52A] shadow-emerald-500/20",
        )}
      >
        {type === "sell" ? "فروش فوری (Market)" : "خرید فوری (Market)"}
      </button>
    </div>
  );
}

export default MarketPanel;
