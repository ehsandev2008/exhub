import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { defaultVolumeData } from "../../constants/chartData";
import { toPersianDigits } from "../../../../utils/formatters";

function VolumeDonutChart({
  data = defaultVolumeData,
  totalVolumeText = "۲.۴ میلیارد",
  subtitle = "بر اساس درصد خرید و فروش",
}) {
  const buyItem = data.find((d) => d.name === "خرید") || data[0];
  const sellItem = data.find((d) => d.name === "فروش") || data[1];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100/90 shadow-xs flex flex-col justify-between w-full min-h-[380px] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col">
        <h3 className="text-gray-800 font-bold text-base sm:text-lg tracking-tight">
          حجم کل معاملات
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{subtitle}</p>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative w-full h-60 sm:h-64 my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={6}
              cornerRadius={16}
              animationDuration={1300}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `٪${toPersianDigits(value)}`,
                name,
              ]}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "IRANSansXFaNum, sans-serif",
                direction: "rtl",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11.5px] text-gray-400 font-medium">
            حجم کل معاملات
          </span>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight mt-0.5 font-sans">
            {totalVolumeText}
          </span>
        </div>
      </div>

      {/* Bottom Rounded Legend Pill */}
      <div className="w-full bg-[#F1F5F9]/80 rounded-full py-2.5 px-4 sm:px-6 flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#25AA2E]" />
          <span>
            {buyItem.name}:{" "}
            <span className="font-bold text-gray-800 font-sans">
              ٪{toPersianDigits(buyItem.value)}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DA4649]" />
          <span>
            {sellItem.name}:{" "}
            <span className="font-bold text-gray-800 font-sans">
              ٪{toPersianDigits(sellItem.value)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default VolumeDonutChart;
