import { Link } from "react-router";

function QuickAccessCard() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-xs flex flex-col justify-between select-none">
      <span className="text-[#777777] text-xs sm:text-sm font-medium mb-3">
        دسترسی سریع
      </span>

      <div className="grid grid-cols-2 gap-2">
        <Link
          to="/trade"
          className="h-8 rounded-full bg-[#0650D7] text-white text-xs font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors shadow-xs"
        >
          مرکز تبادل
        </Link>

        <Link
          to="/activities"
          className="h-8 rounded-full border border-gray-200 text-gray-700 text-xs font-medium flex items-center justify-center hover:border-blue-500 hover:text-primary transition-colors bg-white"
        >
          تراکنش ها
        </Link>

        <Link
          to="/bank-center"
          className="h-8 rounded-full border border-gray-200 text-gray-700 text-xs font-medium flex items-center justify-center hover:border-blue-500 hover:text-primary transition-colors bg-white"
        >
          انتقال وجه
        </Link>

        <Link
          to="/inquiry-service"
          className="h-8 rounded-full border border-gray-200 text-gray-700 text-xs font-medium flex items-center justify-center hover:border-blue-500 hover:text-primary transition-colors bg-white"
        >
          استعلام
        </Link>
      </div>
    </div>
  );
}

export default QuickAccessCard;
