import clsx from "clsx";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
function BuyPanel({ type = "buy" }) {
  const [price, setPrice] = useState(3564656.7898);
  const [amount, setAmount] = useState(3564);
  const [percent, setPercent] = useState(50);
  const [network, setNetwork] = useState(0);

  const increasePrice = () => {
    setPrice((prev) => prev + 1);
  };

  const decreasePrice = () => {
    setPrice((prev) => Math.max(0, prev - 1));
  };

  const increaseAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(0, prev - 1));
  };

  const networks = ["TRC", "TRC", "TRC"];

  return (
    <div dir="rtl" className="w-full max-w-90 rounded-[30px] bg-white p-6">
      {/* قیمت واحد */}
      <div className="mb-6">
        <p className="mb-2 text-right text-sm text-gray-700">قیمت واحد (IRT)</p>

        <div className="flex h-13.5 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-5">
          <button
            onClick={increasePrice}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={24} />
          </button>

          <span className="text-sm text-gray-700">
            {price.toLocaleString("fa-IR")}
          </span>

          <button
            onClick={decreasePrice}
            className="text-primary cursor-pointer"
          >
            <RiSubtractLine size={24} />
          </button>
        </div>
      </div>

      {/* مقدار USDT */}
      <div className="mb-7">
        <p className="mb-2 text-right text-sm text-gray-700">مقدار (USDT)</p>

        <div className="flex h-13.5 items-center justify-between rounded-full border border-gray-300 bg-[#F1F4F9] px-5">
          <button
            onClick={increaseAmount}
            className="text-primary cursor-pointer"
          >
            <RiAddLine size={24} />
          </button>

          <span className="text-sm text-gray-700">
            {amount.toLocaleString("fa-IR")}
          </span>

          <button
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
          className="h-0.75 w-full cursor-pointer accent-pribg-primary bg-transparent"
        />
      </div>

      {/* درصدها */}
      <div className="mb-5 flex justify-between gap-2">
        {[25, 50, 75, 100].map((item) => (
          <button
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

      {/* مجموع ارزش */}
      <div className="mb-5 flex h-14.5 items-center justify-between rounded-2xl bg-[#F7F7F7] px-4">
        <span className="text-sm text-gray-500">مجموع ارزش</span>

        <span className="text-sm text-gray-500">IRT</span>
      </div>

      {/* موجودی USDT */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-700">موجودی (USDT)</span>

        <span className="text-gray-700">۱۲.۰۵۶.۰۴۹</span>
      </div>

      {/* موجودی BTC */}
      <div className="mb-6 flex items-center justify-between text-sm">
        <span className="text-gray-700">موجودی (BTC)</span>

        <span className="text-gray-700">۱۲.۰۵۶.۰۴۹</span>
      </div>

      {/* شبکه انتقال */}
      <div className="mb-5 flex gap-3">
        {networks.map((item, index) => (
          <button
            key={index}
            onClick={() => setNetwork(index)}
            className={clsx(
              "h-10 flex-1 rounded-full text-sm transition-all",
              network === index
                ? "bg-[#FFF8E8] text-[#E9A900]"
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
        {type === "sell" ? "فروش تتر" : "خرید تتر"}
      </button>
    </div>
  );
}

export default BuyPanel;
