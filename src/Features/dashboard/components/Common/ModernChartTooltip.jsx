import { toPersianDigits } from "../../../../utils/formatters";

function ModernChartTooltip({ active, payload, label, unit = "تومان" }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const val = item.value;
    const formattedVal = val.toLocaleString("fa-IR");

    return (
      <div
        className="bg-gray-900/95 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-1 z-50 select-none animate-in fade-in duration-150 font-['IRANSansXFaNum']"
        dir="rtl"
      >
        {label && (
          <span className="text-gray-300 text-[11px] font-medium border-b border-white/10 pb-1">
            {toPersianDigits(label)}
          </span>
        )}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: item.color || item.stroke || "#2563EB" }}
          />
          <span className="font-bold text-sm tracking-tight">
            {toPersianDigits(formattedVal)}
          </span>
          <span className="text-[11px] text-gray-300 font-normal">{unit}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default ModernChartTooltip;
