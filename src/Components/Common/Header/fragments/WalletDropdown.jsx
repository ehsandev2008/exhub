import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineArrowsRightLeft,
  HiOutlineClock,
  HiOutlineWallet,
} from "react-icons/hi2";
import { Link } from "react-router";

const WalletDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking or tapping outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (
      window.innerWidth >= 768 &&
      window.matchMedia("(hover: hover)").matches
    ) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (
      window.innerWidth >= 768 &&
      window.matchMedia("(hover: hover)").matches
    ) {
      setIsOpen(false);
    }
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (
      window.innerWidth < 768 ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Wallet Pill Button */}
      <button
        type="button"
        onClick={handleToggleClick}
        className="rounded-full bg-white flex items-center justify-between p-1.5 sm:p-2 gap-2 sm:gap-3 shadow-sm border border-gray-100/90 hover:border-blue-200 transition-all duration-200 cursor-pointer select-none group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center gap-1.5 text-gray-700">
          <div className="p-1 rounded-full bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6665 5H14.9998C16.8408 5 18.3332 6.49238 18.3332 8.33333V15C18.3332 16.8409 16.8408 18.3333 14.9998 18.3333H4.99984C3.15889 18.3333 1.6665 16.8409 1.6665 15V5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M1.6665 4.99999C1.6665 3.15904 3.15889 1.66666 4.99984 1.66666H9.99984C11.8408 1.66666 13.3332 3.15904 13.3332 4.99999H1.6665Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M18.3335 10L18.3335 13.3333H15.0002C14.0797 13.3333 13.3335 12.5871 13.3335 11.6667C13.3335 10.7462 14.0797 10 15.0002 10L18.3335 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="hidden md:inline font-medium text-sm text-gray-500">
            کیف پول:
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-gray-800">
          <span>۳،۵۰۰،۰۰۰</span>
          <span className="text-primary text-xs font-semibold">تومانء</span>
          <FaChevronDown
            className={`w-2.5 h-2.5 text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </div>
      </button>

      {/* Animated Dropdown Menu */}
      <div
        className={`absolute left-0 top-full pt-2 z-50 w-78 sm:w-84 transition-all duration-300 origin-top-left ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md rounded-3xl p-4 shadow-2xl shadow-blue-950/10 border border-gray-100 text-gray-700 select-none">
          {/* Balance Breakdown Card */}
          <div className="bg-gradient-to-br from-[#0650D7]/8 via-[#0650D7]/4 to-transparent rounded-2xl p-3.5 border border-blue-100/60 mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <HiOutlineWallet className="w-4 h-4 text-primary" />
                موجودی کل کیف پول
              </span>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                فعال
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900 tracking-tight flex items-baseline justify-between">
              <span>۳،۵۰۰،۰۰۰</span>
              <span className="text-xs font-medium text-primary">تومان</span>
            </div>

            {/* <div className="mt-2.5 pt-2.5 border-t border-blue-100/60 grid grid-cols-2 gap-2 text-[11.5px]">
              <div>
                <span className="text-gray-400 block">قابل برداشت:</span>
                <span className="font-semibold text-gray-700">
                  ۳،۲۰۰،۰۰۰ تومان
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">مسدود در معاملات:</span>
                <span className="font-semibold text-amber-600">
                  ۳۰۰،۰۰۰ تومان
                </span>
              </div>
            </div> */}
          </div>

          {/* Quick Access Action Items */}
          <div className="space-y-1.5">
            {/* شارژ کیف پول */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HiOutlineArrowDownTray className="w-5 h-5 stroke-2" />
                </div>
                <div>
                  <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-primary transition-colors block">
                    شارژ کیف پول
                  </span>
                  <span className="text-[11px] text-gray-400">
                    افزایش موجودی ریالی آنلاین
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg group-hover:bg-emerald-100 transition-colors">
                واریز آنی
              </span>
            </Link>

            {/* برداشت از کیف پول */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HiOutlineArrowUpTray className="w-5 h-5 stroke-2" />
                </div>
                <div>
                  <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-primary transition-colors block">
                    برداشت از کیف پول
                  </span>
                  <span className="text-[11px] text-gray-400">
                    انتقال به شماره شبا و کارت بانکی
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                پایا / ساتنا
              </span>
            </Link>

            {/* انتقال داخلی */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HiOutlineArrowsRightLeft className="w-5 h-5 stroke-2" />
                </div>
                <div>
                  <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-primary transition-colors block">
                    انتقال داخلی
                  </span>
                  <span className="text-[11px] text-gray-400">
                    انتقال آنی بین کاربران اکس‌هاب
                  </span>
                </div>
              </div>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
                بدون کارمزد
              </span>
            </Link>

            {/* تاریخچه تراکنش‌ها */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HiOutlineClock className="w-5 h-5 stroke-2" />
                </div>
                <div>
                  <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-primary transition-colors block">
                    تاریخچه تراکنش‌ها
                  </span>
                  <span className="text-[11px] text-gray-400">
                    مشاهده ریز واریزها و برداشت‌ها
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer Link */}
          <div className="mt-2.5 pt-2.5 border-t border-gray-100 text-center">
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <span>مشاهده و مدیریت کامل کیف پول</span>
              <span aria-hidden="true">&larr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDropdown;
