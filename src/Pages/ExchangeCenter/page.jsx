import HistoryTab from "../../Components/Common/History/HistoryTab";
import BuySell from "../../Features/exchange/components/BuySell";
import CryptoStatus from "../../Features/exchange/components/CryptoStatus";
import OrderBook from "../../Features/exchange/components/OrderBook";
import TradingChart from "../../Features/exchange/components/TradingChart";

function Page() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4 md:p-6 min-h-screen bg-slate-50" dir="rtl">
      {/* Top / Main Exchange Section */}
      <div className="flex flex-col xl:flex-row items-start gap-4 w-full">
        {/* Right Section on Desktop (Buy / Sell Panel) */}
        <aside className="w-full xl:w-80 shrink-0 order-2 xl:order-1">
          <BuySell />
        </aside>

        {/* Center / Left Section (CryptoStatus, Chart, OrderBook) */}
        <main className="flex flex-col gap-4 flex-1 w-full order-1 xl:order-2 overflow-hidden">
          {/* Top Status Bar (24h stats, live price flash) */}
          <div className="w-full">
            <CryptoStatus />
          </div>

          {/* Middle Row: OrderBook + TradingChart */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full flex-1">
            {/* Order Book */}
            <div className="w-full lg:w-72 xl:w-76 shrink-0 order-2 lg:order-1">
              <OrderBook />
            </div>

            {/* TradingView Chart + 12-Icon Toolbar */}
            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <TradingChart />
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Section: Orders & History Tab */}
      <div className="w-full">
        <HistoryTab />
      </div>
    </div>
  );
}

export default Page;
