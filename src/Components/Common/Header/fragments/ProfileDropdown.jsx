import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  HiCheckCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineCreditCard,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { Link } from "react-router";

const ProfileDropdown = () => {
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
    if (window.innerWidth >= 768 && window.matchMedia("(hover: hover)").matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && window.matchMedia("(hover: hover)").matches) {
      setIsOpen(false);
    }
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (window.innerWidth < 768 || !window.matchMedia("(hover: hover)").matches) {
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
      {/* Profile Pill Button */}
      <button
        type="button"
        onClick={handleToggleClick}
        className="rounded-full bg-white flex items-center justify-between p-1 sm:p-1.5 gap-2 sm:gap-2.5 shadow-sm border border-gray-100/90 hover:border-blue-200 transition-all duration-200 cursor-pointer select-none group"
        aria-expanded={isOpen}
        aria-label="منوی پروفایل کاربری"
      >
        <FaChevronDown
          className={`w-2.5 h-2.5 text-gray-400 transition-transform duration-300 ml-1.5 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />

        <div className="relative">
          <img
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-blue-50"
            src="/profile.png"
            alt="پروفایل کاربر"
          />
          {/* Online green indicator dot */}
          <span className="absolute bottom-0 left-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
        </div>
      </button>

      {/* Animated Dropdown Menu */}
      <div
        className={`absolute left-0 top-full pt-2 z-50 w-72 sm:w-80 transition-all duration-300 origin-top-left ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md rounded-3xl p-3.5 shadow-2xl shadow-blue-950/10 border border-gray-100 text-gray-700 select-none">
          {/* User Profile Header Card */}
          <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50/40 rounded-2xl border border-gray-100 mb-2 flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                className="size-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                src="/profile.png"
                alt="کاربر"
              />
              <span className="absolute bottom-0 left-0 size-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 truncate">
                  احسان حسینی
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-100/70 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <HiCheckCircle className="size-3 text-emerald-600" />
                  سطح ۲
                </span>
              </div>
              <span
                className="text-[11.5px] text-gray-400 font-mono block mt-0.5"
                dir="ltr"
              >
                ۰۹۱۲ ••• ۴۵۶۷
              </span>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-0.5 py-1">
            {/* ویرایش پروفایل */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-primary transition-colors">
                <HiOutlineUserCircle className="size-5 stroke-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-[13px] font-medium">
                  ویرایش اطلاعات پروفایل
                </span>
              </div>
            </Link>

            {/* امنیت و احراز هویت */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-primary transition-colors">
                <HiOutlineShieldCheck className="size-5 stroke-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-[13px] font-medium">
                  امنیت و احراز هویت
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 font-medium px-2 py-0.5 rounded-lg">
                تأیید دو مرحله‌ای
              </span>
            </Link>

            {/* نشست‌های فعال */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-primary transition-colors">
                <HiOutlineDevicePhoneMobile className="size-5 stroke-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-[13px] font-medium">نشست‌های فعال</span>
              </div>
              <span className="text-[11px] text-primary bg-blue-50 font-medium px-2 py-0.5 rounded-lg">
                ۲ دستگاه
              </span>
            </Link>

            {/* حساب‌ها و کارت‌های بانکی */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-primary transition-colors">
                <HiOutlineCreditCard className="size-5 stroke-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-[13px] font-medium">
                  کارت‌ها و حساب‌های بانکی
                </span>
              </div>
            </Link>

            {/* تنظیمات اعلانات */}
            <Link
              to="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-primary transition-colors">
                <HiOutlineBell className="size-5 stroke-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-[13px] font-medium">
                  تنظیمات اعلانات و پیام‌ها
                </span>
              </div>
            </Link>

            {/* خط جداکننده */}
            <div className="h-px bg-gray-100 my-1.5" />

            {/* خروج از حساب کاربری */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <HiOutlineArrowRightOnRectangle className="size-5 stroke-1.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                <span className="text-[13px] font-medium">
                  خروج از حساب کاربری
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
