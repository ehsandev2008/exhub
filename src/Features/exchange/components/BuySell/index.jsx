import clsx from "clsx";
import { useState } from "react";
import Buy from "./templates/Buy";
import Sell from "./templates/Sell";

function BuySell() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="bg-white rounded-4xl p-6 flex flex-col items-center justify-center border border-gray-100/90 shadow-xs">
      <div className="flex items-center justify-around w-fit rounded-full border border-gray-200 p-1">
        <button
          type="button"
          className={clsx(
            "px-10 py-3 rounded-full transition cursor-pointer text-base font-semibold",
            activeTab === 1
              ? "bg-[#EAF7EB] text-[#25AA2E] shadow-sm"
              : "bg-transparent text-gray-500 hover:text-gray-800",
          )}
          onClick={() => setActiveTab(1)}
        >
          خرید
        </button>

        <button
          type="button"
          className={clsx(
            "px-10 py-3 rounded-full transition cursor-pointer text-base font-semibold",
            activeTab === 2
              ? "bg-rose-50 text-rose-600 shadow-sm"
              : "bg-transparent text-gray-500 hover:text-gray-800",
          )}
          onClick={() => setActiveTab(2)}
        >
          فروش
        </button>
      </div>
      <div className="w-full">
        {activeTab === 1 && <Buy />}
        {activeTab === 2 && <Sell />}
      </div>
    </div>
  );
}

export default BuySell;
