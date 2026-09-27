import { Tooltip } from "react-tooltip";
import { useSidebarStore } from "../../../store/sidebarStore";
import SidebarLinks from "./SidebarLinks";

const SideBar = () => {
  const {
    isOpenMobile,
    closeMobile,
    isCollapsedDesktop,
    toggleDesktopCollapse,
  } = useSidebarStore();

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      closeMobile();
    } else {
      toggleDesktopCollapse();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 bg-black/30 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
          isOpenMobile
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        id="sidebar"
        className={`fixed md:sticky top-0 right-0 z-50 h-dvh md:h-[calc(100dvh-2.5rem)] bg-white flex flex-col justify-between select-none border-l border-gray-100/80 shadow-[0_0_30px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out animate-sidebar-enter rounded-none rounded-l-3xl md:rounded-4xl ms-0 md:ms-6 my-0 md:my-5 ${
          /* Desktop width */
          isCollapsedDesktop ? "md:w-20" : "md:w-64"
        } ${
          /* Mobile translation */
          isOpenMobile
            ? "translate-x-0 w-72 sm:w-80 shadow-2xl"
            : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Section: Logo & Mobile Close */}
        <div className="pt-6 pb-6 px-4 flex items-center justify-between ps-3.5">
          <div className="flex items-center justify-start transition-all duration-300">
            <img
              src="/logo.png"
              alt="ایکس هاب"
              className={`object-contain transition-all duration-300 ${
                isCollapsedDesktop ? "h-9 w-auto" : "h-11 w-auto"
              }`}
            />
          </div>

          {/* Mobile Close X Button */}
          <button
            type="button"
            onClick={closeMobile}
            className="md:hidden size-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="بستن سایدبار"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Middle Section: Navigation Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3.5 py-1 pb-14 custom-scrollbar">
          <SidebarLinks />
        </div>

        {/* Close / Collapse Button with overlay.png background */}
        <div className="absolute left-0 bottom-18 z-30 flex items-center justify-end pr-2 w-15 h-29 pointer-events-none">
          {/* Overlay Tab Background */}
          <img
            src="/overlay.png"
            alt=""
            className="absolute inset-0 w-15 h-29 select-none pointer-events-none"
          />

          {/* Action Button inside the socket */}
          <button
            type="button"
            onClick={handleToggle}
            className="relative z-10 w-11 h-11 bg-primary hover:bg-primary-hover active:scale-95 text-white rounded-[18px] flex items-center justify-center shadow-md shadow-blue-600/25 transition-all duration-200 cursor-pointer pointer-events-auto"
            title={
              isCollapsedDesktop ? "گسترش سایدبار" : "بستن / جمع کردن سایدبار"
            }
            aria-label="بستن یا جمع کردن سایدبار"
          >
            {/* In RTL: Arrow pointing right '>' means collapse to right edge, arrow left '<' means expand */}
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsedDesktop ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Tooltip for collapsed sidebar icons */}
      <Tooltip
        id="sidebar-tooltip"
        place="left"
        className="!bg-gray-900 !text-white !text-xs !py-1.5 !px-3 !rounded-xl !shadow-xl !z-50 !font-sans !font-medium"
      />
    </>
  );
};

export default SideBar;
