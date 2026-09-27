import { useState } from "react";
import { FiCheck, FiCopy, FiRefreshCw, FiX } from "react-icons/fi";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { toPersianDigits } from "../../../../utils/formatters";
import { useTetherWebSocket } from "../../hooks/useTetherWebSocket";
import ModernDropdown from "../Common/ModernDropdown";

// Helper to format string numbers with 3-digit comma separation
const formatWithCommas = (val) => {
  if (val === null || val === undefined || val === "") return "";
  const clean = val.toString().replace(/\D/g, "");
  if (!clean) return "";
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function CustomTetherTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const val = Number(item.value);
    return (
      <div
        className="bg-white/95 text-gray-900 text-xs px-2.5 py-1.5 rounded-xl shadow-lg backdrop-blur-md border border-blue-100 flex items-center gap-1.5 font-['IRANSansXFaNum'] select-none"
        dir="rtl"
      >
        <span className="font-bold text-[#0650D7]">
          {toPersianDigits(val.toLocaleString("en-US"))}
        </span>
        <span className="text-[11px] text-gray-500 font-medium">تومان</span>
      </div>
    );
  }
  return null;
}

function TetherPriceCard() {
  const {
    price,
    direction,
    chartData,
    selectedRange,
    setSelectedRange,
    timeOptions,
  } = useTetherWebSocket("wss://back.exhub.ir/ws/price/");

  const [showCalculator, setShowCalculator] = useState(false);
  const [calcMode, setCalcMode] = useState("usdtToToman"); // 'usdtToToman' | 'tomanToUsdt'
  const [calcInput, setCalcInput] = useState("100");
  const [copied, setCopied] = useState(false);

  // Parse raw input value depending on mode
  const getRawNumericValue = (inputStr) => {
    if (!inputStr) return 0;
    const cleaned = inputStr.replace(/,/g, "");
    return parseFloat(cleaned) || 0;
  };

  const numInput = getRawNumericValue(calcInput);

  // Conversion calculations
  const convertedValue =
    calcMode === "usdtToToman"
      ? Math.round(numInput * price)
      : Math.round((numInput / (price || 1)) * 100) / 100;

  // Handle switching calculator mode with clean defaults
  const handleModeChange = (newMode) => {
    setCalcMode(newMode);
    if (newMode === "tomanToUsdt") {
      setCalcInput("10,000,000");
    } else {
      setCalcInput("100");
    }
  };

  // Handle typing inside the input field
  const handleInputChange = (e) => {
    const rawVal = e.target.value;
    if (calcMode === "tomanToUsdt") {
      // In Toman mode, strictly separate 3 digits with commas from the right
      const digitsOnly = rawVal.replace(/\D/g, "");
      setCalcInput(formatWithCommas(digitsOnly));
    } else {
      // In USDT mode, allow numeric with optional decimal point
      const cleaned = rawVal.replace(/[^0-9.]/g, "");
      const parts = cleaned.split(".");
      if (parts.length > 2) return;
      setCalcInput(cleaned);
    }
  };

  // Quick preset pills
  const handleQuickAdd = (amount) => {
    const current = getRawNumericValue(calcInput);
    const nextVal = current + amount;
    if (calcMode === "tomanToUsdt") {
      setCalcInput(formatWithCommas(nextVal.toString()));
    } else {
      setCalcInput(nextVal.toString());
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(convertedValue.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0650D7] text-white rounded-3xl p-5 shadow-lg shadow-blue-700/25 flex flex-col justify-between relative select-none min-h-[190px] sm:min-h-[200px] font-['IRANSansXFaNum']">
      {/* Top Header: Price & Buttons */}
      <div className="flex items-start justify-between relative z-20">
        {/* Right side: Title & Live Price */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-blue-100 text-xs font-normal">قیمت تتر</span>
            {/* Live Indicator Pulse Dot */}
            <span className="flex h-2 w-2 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  direction === "up" ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  direction === "up" ? "bg-emerald-300" : "bg-rose-300"
                }`}
              />
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight">
              {toPersianDigits(price.toLocaleString("en-US"))}
            </span>
            <span className="text-xs sm:text-sm text-blue-200 font-medium">
              تومان
            </span>
          </div>
        </div>

        {/* Left side: Calculator button & Timeframe Dropdown */}
        <div className="flex flex-col items-end gap-1.5 relative">
          <button
            type="button"
            onClick={() => setShowCalculator(true)}
            className="bg-white text-[#0650D7] text-xs font-bold px-3.5 py-1.5 rounded-full hover:bg-blue-50 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            ماشین حساب
          </button>

          {/* Timeframe Dropdown */}
          <ModernDropdown
            options={timeOptions}
            value={selectedRange}
            onChange={setSelectedRange}
            className="z-30"
            buttonClassName="!text-blue-100 hover:!text-white !bg-blue-800/40 hover:!bg-blue-800/70 border border-blue-400/25 !px-2.5 !py-0.5 !text-xs !rounded-full shadow-xs"
            menuClassName="!bg-white !text-gray-800 !shadow-2xl border border-gray-100/90 !rounded-2xl"
          />
        </div>
      </div>

      {/* Sparkline Wave Chart at Bottom - Raised to center with linear crypto trend matching reference */}
      <div className="w-full h-24 sm:h-28  overflow-hidden rounded-b-3xl relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 6, left: 6, bottom: 8 }}
          >
            <defs>
              <linearGradient id="tetherFillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            {/* Generous vertical offset so chart sits comfortably in the middle, never hugging the bottom */}
            <YAxis
              domain={[
                (dataMin) => Math.round(dataMin - 12000),
                (dataMax) => Math.round(dataMax + 3500),
              ]}
              hide={true}
            />
            <Tooltip content={<CustomTetherTooltip />} />
            <Area
              type="linear"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2.2}
              fill="url(#tetherFillGrad)"
              // Highlight peak point with white square marker as in reference image (media_1790437379491.png)
              dot={(props) => {
                if (props.index === chartData.length - 1) {
                  return (
                    <rect
                      key="peak-dot"
                      x={props.cx - 3.5}
                      y={props.cy - 3.5}
                      width={7}
                      height={7}
                      fill="#ffffff"
                      stroke="#0650D7"
                      strokeWidth={1.5}
                      rx={1.5}
                    />
                  );
                }
                return <svg key={props.index} />;
              }}
              activeDot={{
                r: 4.5,
                fill: "#ffffff",
                stroke: "#0650D7",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ================= MODERN CALCULATOR MODAL ================= */}
      {showCalculator && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          dir="rtl"
          onClick={() => setShowCalculator(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-sm shadow-2xl border border-gray-100 text-gray-800 flex flex-col gap-4 relative font-['IRANSansXFaNum']"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-5 bg-[#0650D7] rounded-full" />
                <h4 className="font-bold text-base text-gray-900">
                  ماشین‌حساب هوشمند تتر
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCalculator(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX className="size-4" />
              </button>
            </div>

            {/* Current Exchange Rate Banner */}
            <div className="bg-blue-50/80 rounded-2xl p-2.5 flex items-center justify-between text-xs border border-blue-100">
              <span className="text-gray-600 font-medium">
                نرخ لحظه‌ای معامله:
              </span>
              <span className="font-bold text-[#0650D7]">
                {toPersianDigits(price.toLocaleString("en-US"))} تومان
              </span>
            </div>

            {/* Mode Switcher (USDT -> Toman OR Toman -> USDT) */}
            <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleModeChange("usdtToToman")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  calcMode === "usdtToToman"
                    ? "bg-white text-[#0650D7] shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                تتر به تومان
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("tomanToUsdt")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  calcMode === "tomanToUsdt"
                    ? "bg-white text-[#0650D7] shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                تومان به تتر
              </button>
            </div>

            {/* Custom Input Field with 3-digit comma separation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 font-medium">
                {calcMode === "usdtToToman"
                  ? "مقدار تتر (USDT)"
                  : "مبلغ (تومان)"}
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:border-[#0650D7] focus-within:bg-white transition-all shadow-inner">
                <input
                  type="text"
                  inputMode={calcMode === "tomanToUsdt" ? "numeric" : "decimal"}
                  value={calcInput}
                  onChange={handleInputChange}
                  placeholder="۰"
                  className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none text-left"
                  dir="ltr"
                />
                <span className="text-xs font-medium text-gray-400 shrink-0 mr-2">
                  {calcMode === "usdtToToman" ? "USDT" : "تومان"}
                </span>
              </div>
            </div>

            {/* Quick Increment Pills */}
            <div className="flex items-center gap-1.5 justify-between">
              {(calcMode === "usdtToToman"
                ? [50, 100, 500, 1000]
                : [1000000, 5000000, 10000000, 50000000]
              ).map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleQuickAdd(amount)}
                  className="flex-1 py-1.5 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-[#0650D7] text-gray-600 text-[11px] font-medium transition cursor-pointer text-center"
                >
                  +
                  {calcMode === "tomanToUsdt"
                    ? `${toPersianDigits((amount / 1000000).toString())} م`
                    : toPersianDigits(amount.toString())}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCalcInput("0")}
                className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-400 text-xs transition cursor-pointer"
                title="پاک کردن"
              >
                <FiRefreshCw className="size-3" />
              </button>
            </div>

            {/* Output Result Card with 3-digit comma separation */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">
                  {calcMode === "usdtToToman"
                    ? "ارزش ریالی نهایی:"
                    : "معادل دریافتی تتر:"}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    {calcMode === "usdtToToman"
                      ? toPersianDigits(convertedValue.toLocaleString("en-US"))
                      : toPersianDigits(
                          convertedValue.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }),
                        )}
                  </span>
                  <span className="text-xs font-semibold text-[#0650D7]">
                    {calcMode === "usdtToToman" ? "تومان" : "USDT"}
                  </span>
                </div>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-10 h-10 rounded-2xl bg-white border border-blue-200 text-[#0650D7] hover:bg-[#0650D7] hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="کپی نتیجه"
              >
                {copied ? (
                  <FiCheck className="size-4 text-emerald-600" />
                ) : (
                  <FiCopy className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TetherPriceCard;
