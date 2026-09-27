import { ToastDemo } from "../../Components/UI/Toast";
import PointLineChart from "../../Features/dashboard/components/Charts/PointLineChart";
import SmoothAreaChart from "../../Features/dashboard/components/Charts/SmoothAreaChart";
import VolumeDonutChart from "../../Features/dashboard/components/Charts/VolumeDonutChart";
import AuthStatusCard from "../../Features/dashboard/components/Stats/AuthStatusCard";
import QuickAccessCard from "../../Features/dashboard/components/Stats/QuickAccessCard";
import TetherPriceCard from "../../Features/dashboard/components/Stats/TetherPriceCard";
import TicketsStatusCard from "../../Features/dashboard/components/Stats/TicketsStatusCard";
import {
  defaultBuyData,
  defaultDepositData,
  defaultSellData,
  defaultWithdrawData,
} from "../../Features/dashboard/constants/chartData";

function DashboardTemplate() {
  return (
    <div
      className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10"
      dir="rtl"
    >
      {/* ================= 1. TOP STATS CARDS (4 COLUMNS) ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        {/* وضعیت احراز هویت */}
        <AuthStatusCard />

        {/* وضعیت تیکت ها */}
        <TicketsStatusCard />

        {/* دسترسی سریع */}
        <QuickAccessCard />

        {/* قیمت تتر */}
        <TetherPriceCard />
      </section>

      {/* ================= 2. SMOOTH AREA CHARTS (BUY & SELL) ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        {/* میزان خرید */}
        <SmoothAreaChart
          title="میزان خرید"
          color="#2563EB"
          gradientId="buyAreaGrad"
          data={defaultBuyData}
        />

        {/* میزان فروش */}
        <SmoothAreaChart
          title="میزان فروش"
          color="#F59E0B"
          gradientId="sellAreaGrad"
          data={defaultSellData}
        />
      </section>

      {/* ================= 3. POINT LINE CHARTS (DEPOSIT & WITHDRAWAL) ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        {/* واریز به حساب */}
        <PointLineChart
          title="واریز به حساب"
          color="#2563EB"
          data={defaultDepositData}
        />

        {/* برداشت از حساب */}
        <PointLineChart
          title="برداشت از حساب"
          color="#F59E0B"
          data={defaultWithdrawData}
        />
      </section>

      {/* ================= 4. BOTTOM DONUT CHART (TRADING VOLUME) ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        {/* حجم کل معاملات */}
        <VolumeDonutChart />
      </section>

      {/* ================= 5. INTERACTIVE TOAST SHOWCASE ================= */}
      <section className="w-full">
        <ToastDemo />
      </section>
    </div>
  );
}

export default DashboardTemplate;
