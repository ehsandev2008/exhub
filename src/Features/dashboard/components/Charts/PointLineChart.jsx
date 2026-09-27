import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toPersianDigits } from "../../../../utils/formatters";
import { defaultDepositData } from "../../constants/chartData";
import ModernChartTooltip from "../Common/ModernChartTooltip";
import ModernDropdown from "../Common/ModernDropdown";

function PointLineChart({
  title = "واریز به حساب",
  color = "#2563EB",
  data = defaultDepositData,
  timeOptions = ["هفتگی", "ماهانه", "روزانه"],
}) {
  const [selectedRange, setSelectedRange] = useState(timeOptions[0]);
  const patternId = `pointGrid-${title.replace(/\s+/g, "-")}`;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100/90 shadow-xs flex flex-col justify-between w-full min-h-[380px] select-none font-['IRANSansXFaNum']">
      {/* Header: Title on Right, Animated Modern Dropdown on Left */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100/80 mb-3 relative z-20">
        <h3 className="font-bold text-base sm:text-lg text-gray-800 tracking-tight">
          {title}
        </h3>

        <ModernDropdown
          options={timeOptions}
          value={selectedRange}
          onChange={setSelectedRange}
        />
      </div>

      {/* Chart Canvas with Equal-Sized Square Dashed Grid matching Image 1 */}
      <div className="relative w-full h-64 sm:h-76 font-['IRANSansXFaNum']">
        {/* Exact Square Dashed Grid Background (38px x 38px uniform squares) */}
        <div className="absolute top-5 bottom-8 left-11 right-4 pointer-events-none overflow-hidden rounded-lg">
          <svg
            className="w-full h-full opacity-80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={patternId}
                width="38"
                height="38"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 38 0 L 0 0 0 38"
                  fill="none"
                  stroke="#DFE5EE"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 15, left: -10, bottom: 8 }}
          >
            {/* X-Axis: Persian Weekdays */}
            <XAxis
              dataKey="name"
              stroke="#CBD5E1"
              tickLine={{ stroke: "#CBD5E1" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tick={{
                fill: "#64748B",
                fontSize: 11,
                fontFamily: "IRANSansXFaNum, sans-serif",
              }}
              tickMargin={10}
            />

            {/* Y-Axis: Persian Numbers */}
            <YAxis
              stroke="#CBD5E1"
              tickLine={{ stroke: "#CBD5E1" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tick={{
                fill: "#64748B",
                fontSize: 11,
                fontFamily: "IRANSansXFaNum, sans-serif",
              }}
              ticks={[100, 500, 1000, 1800, 2500]}
              tickFormatter={(v) => toPersianDigits(v.toLocaleString("fa-IR"))}
            />

            <Tooltip content={<ModernChartTooltip unit="تومان" />} />

            <Line
              type="linear"
              dataKey="value"
              stroke={color}
              strokeWidth={2.8}
              dot={{
                stroke: color,
                strokeWidth: 2.5,
                fill: "#ffffff",
                r: 5,
              }}
              activeDot={{
                stroke: color,
                strokeWidth: 3,
                fill: "#ffffff",
                r: 7.5,
              }}
              animationDuration={1300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PointLineChart;
