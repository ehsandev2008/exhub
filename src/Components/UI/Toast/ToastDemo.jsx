import { useState } from "react";
import { toast } from "../../../lib/Hooks/useToast";
import { FiBell, FiAlertTriangle, FiAlertCircle, FiCheckCircle, FiCompass } from "react-icons/fi";

const POSITIONS = [
  { id: "top-right", label: "بالا راست (پیش‌فرض)" },
  { id: "top-left", label: "بالا چپ" },
  { id: "top-center", label: "بالا وسط" },
  { id: "bottom-right", label: "پایین راست" },
  { id: "bottom-left", label: "پایین چپ" },
  { id: "bottom-center", label: "پایین وسط" },
];

export function ToastDemo() {
  const [activePos, setActivePos] = useState("top-right");

  const handleShowSuccess = () => {
    toast.success(
      "تاییدیه تراکنش!",
      "تراکنش به مبلغ ۵۰۰،۰۰۰ تومان با موفقیت به کیف پول مقصد منتقل شد",
      { position: activePos }
    );
  };

  const handleShowError = () => {
    toast.error(
      "خطای سیستمی!",
      "در پردازش درخواست خطایی رخ داد. لطفاً موجودی خود را بررسی کرده و مجدداً تلاش کنید.",
      { position: activePos }
    );
  };

  const handleShowWarning = () => {
    toast.warning(
      "هشدار!",
      "موجودی کیف پول شما برای انجام این تراکنش کافی نیست. لطفاً حساب خود را شارژ کنید.",
      { position: activePos }
    );
  };

  const handleShowInfo = () => {
    toast.info(
      "اطلاعیه!",
      "نسخه جدید پلتفرم Hub- با ویژگی‌های جدید منتشر شد. برای مشاهده تغییرات کلیک کنید.",
      {
        position: activePos,
        action: {
          label: "مشاهده تغییرات",
          onClick: () => alert("به صفحه تغییرات منتقل شدید!"),
        },
      }
    );
  };

  return (
    <div
      className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col gap-4 font-['IRANSansXFaNum']"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-6 bg-[#0650D7] rounded-full" />
          <h3 className="font-bold text-base sm:text-lg text-gray-900">
            تست و بررسی تست Toast های سفارشی
          </h3>
        </div>

        {/* Position Selector */}
        <div className="flex items-center gap-2">
          <FiCompass className="text-gray-400 size-4 shrink-0" />
          <span className="text-xs text-gray-500 font-medium shrink-0">
            موقعیت نمایش:
          </span>
          <select
            value={activePos}
            onChange={(e) => setActivePos(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-gray-700 outline-none focus:border-[#0650D7] cursor-pointer"
          >
            {POSITIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Success Trigger */}
        <button
          type="button"
          onClick={handleShowSuccess}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#20AE3C] hover:bg-[#1CA036] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-green-600/25 transition-all cursor-pointer"
        >
          <FiCheckCircle className="size-4" />
          <span>تاییدیه تراکنش (Success)</span>
        </button>

        {/* Error Trigger */}
        <button
          type="button"
          onClick={handleShowError}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#EE3434] hover:bg-[#DE2828] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/25 transition-all cursor-pointer"
        >
          <FiAlertCircle className="size-4" />
          <span>خطای سیستمی (Error)</span>
        </button>

        {/* Warning Trigger */}
        <button
          type="button"
          onClick={handleShowWarning}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#F55E22] hover:bg-[#E55014] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-600/25 transition-all cursor-pointer"
        >
          <FiAlertTriangle className="size-4" />
          <span>هشدار (Warning)</span>
        </button>

        {/* Info Trigger */}
        <button
          type="button"
          onClick={handleShowInfo}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#085AE2] hover:bg-[#064BC4] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
        >
          <FiBell className="size-4" />
          <span>اطلاعیه (Info)</span>
        </button>
      </div>
    </div>
  );
}

export default ToastDemo;
