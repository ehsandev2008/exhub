import clsx from "clsx";
import { useState } from "react";
import Limit from "./limit";
import Market from "./market";
import Stop from "./stop";

function BuyTab() {
  const [activeTab, setActiveTab] = useState(3); // Default to Limit order

  return (
    <>
      <div className="flex items-center justify-around mt-5 border-b border-[#D4D4D4]">
        <button
          className={clsx(
            "px-4 py-2 cursor-pointer transition-colors",
            activeTab === 1
              ? "text-primary border-b-2 border-primary font-medium"
              : "text-gray-400 hover:text-gray-600",
          )}
          onClick={() => setActiveTab(1)}
        >
          Stop
        </button>

        <button
          className={clsx(
            "px-4 py-2 cursor-pointer transition-colors",
            activeTab === 2
              ? "text-primary border-b-2 border-primary font-medium"
              : "text-gray-400 hover:text-gray-600",
          )}
          onClick={() => setActiveTab(2)}
        >
          Market
        </button>

        <button
          className={clsx(
            "px-4 py-2 cursor-pointer transition-colors",
            activeTab === 3
              ? "text-primary border-b-2 border-primary font-medium"
              : "text-gray-400 hover:text-gray-600",
          )}
          onClick={() => setActiveTab(3)}
        >
          Limit
        </button>
      </div>

      <div>
        {activeTab === 1 && <Stop />}
        {activeTab === 2 && <Market />}
        {activeTab === 3 && <Limit />}
      </div>
    </>
  );
}

export default BuyTab;
