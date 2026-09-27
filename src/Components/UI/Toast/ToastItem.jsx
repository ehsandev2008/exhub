import { useState, useMemo, useCallback } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "../../../lib/Hooks/useToast";

// Themes matching image designs (media_1790449341895.png)
const TOAST_THEMES = {
  success: {
    bgGradient: "bg-[#20AE3C]",
    shadow: "shadow-2xl shadow-green-700/35",
    iconBoxBg: "bg-[#27BE45]",
    iconBorder: "border-t border-r border-white/35",
    renderIcon: () => (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <svg
          className="w-5 h-5 text-[#20AE3C]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ),
  },
  error: {
    bgGradient: "bg-[#EE3434]",
    shadow: "shadow-2xl shadow-red-700/35",
    iconBoxBg: "bg-[#F74747]",
    iconBorder: "border-t border-r border-white/35",
    renderIcon: () => (
      <div className="w-10 h-10 rounded-[14px] bg-white flex items-center justify-center shadow-sm">
        <span className="text-[#EE3434] text-2xl font-black font-sans leading-none pb-0.5">
          !
        </span>
      </div>
    ),
  },
  warning: {
    bgGradient: "bg-[#F55E22]",
    shadow: "shadow-2xl shadow-orange-700/35",
    iconBoxBg: "bg-[#FF6E31]",
    iconBorder: "border-t border-r border-white/35",
    renderIcon: () => (
      <div className="w-11 h-11 flex items-center justify-center">
        <svg
          className="w-10 h-10 drop-shadow-xs"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2.5L1.5 20.5C1.1 21.2 1.6 22 2.4 22H21.6C22.4 22 22.9 21.2 22.5 20.5L12 2.5Z"
            fill="#ffffff"
          />
          <path
            d="M12 9V14"
            stroke="#F55E22"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17.5" r="1.3" fill="#F55E22" />
        </svg>
      </div>
    ),
  },
  info: {
    bgGradient: "bg-[#085AE2]",
    shadow: "shadow-2xl shadow-blue-700/35",
    iconBoxBg: "bg-[#186EF9]",
    iconBorder: "border-t border-r border-white/35",
    renderIcon: () => (
      <div className="w-11 h-11 flex items-center justify-center">
        <svg
          className="w-9 h-9 text-white fill-current drop-shadow-xs"
          viewBox="0 0 24 24"
        >
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
        </svg>
      </div>
    ),
  },
};

// Directional Animation Maps
const ANIM_CLASSES = {
  "top-right": { enter: "toast-anim-in-right", exit: "toast-anim-out-right" },
  "bottom-right": { enter: "toast-anim-in-right", exit: "toast-anim-out-right" },
  "top-left": { enter: "toast-anim-in-left", exit: "toast-anim-out-left" },
  "bottom-left": { enter: "toast-anim-in-left", exit: "toast-anim-out-left" },
  "top-center": { enter: "toast-anim-in-top", exit: "toast-anim-out-top" },
  "bottom-center": { enter: "toast-anim-in-bottom", exit: "toast-anim-out-bottom" },
};

function ToastItem({ toast: item }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const duration = item.duration !== undefined ? item.duration : 5000;
  const position = item.position || "top-right";

  const theme = useMemo(
    () => TOAST_THEMES[item.type] || TOAST_THEMES.info,
    [item.type]
  );

  const animPair = useMemo(
    () => ANIM_CLASSES[position] || ANIM_CLASSES["top-right"],
    [position]
  );

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      toast.dismiss(item.id);
    }, 320);
  }, [item.id]);

  const handleMouseEnter = () => {
    if (duration > 0) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (duration > 0) setIsPaused(false);
  };

  return (
    <div
      dir="rtl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[420px] sm:w-[420px] rounded-[26px] p-4 sm:p-5 text-white select-none overflow-hidden pointer-events-auto font-['IRANSansXFaNum'] transition-transform duration-200 hover:scale-[1.015] ${
        theme.bgGradient
      } ${theme.shadow} ${isClosing ? animPair.exit : animPair.enter}`}
    >
      {/* Subtle Topographical Contoured Waves Background matching image */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 420 110"
        preserveAspectRatio="none"
      >
        <path
          d="M-20,25 C60,5 140,45 220,25 C300,5 380,45 460,25"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
        <path
          d="M-20,52 C70,26 150,72 230,46 C310,22 390,68 470,46"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
        <path
          d="M-20,78 C50,96 130,58 210,82 C290,106 370,62 450,82"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
        <path
          d="M-20,105 C80,80 160,115 240,95 C320,75 400,110 480,95"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
        />
      </svg>

      {/* Main Toast Content: Right Icon Card + Left Text (RTL) */}
      <div className="relative z-10 flex items-center justify-between gap-3.5">
        {/* Right side: 3D Elevated Squircle Icon Card */}
        <div
          className={`shrink-0 w-16 h-16 sm:w-17 sm:h-17 rounded-[22px] flex items-center justify-center shadow-lg shadow-black/20 ${theme.iconBoxBg} ${theme.iconBorder} transform rotate-[3.5deg] hover:rotate-0 transition-transform duration-300`}
        >
          {theme.renderIcon()}
        </div>

        {/* Center / Left side: Title & Message */}
        <div className="flex-1 flex flex-col justify-center min-w-0 pr-1">
          {item.title && (
            <h4 className="font-bold text-base sm:text-[17px] text-white tracking-tight leading-snug">
              {item.title}
            </h4>
          )}

          {item.message && (
            <p className="text-white/95 text-xs sm:text-[13px] font-normal leading-relaxed mt-1 line-clamp-3">
              {item.message}
            </p>
          )}

          {/* Optional Action Button / Link */}
          {item.action && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                item.action.onClick?.();
                handleClose();
              }}
              className="mt-2 text-xs font-bold text-white underline underline-offset-4 hover:text-white/80 transition-colors w-fit cursor-pointer flex items-center gap-1"
            >
              <span>{item.action.label}</span>
              <span className="text-[10px]">←</span>
            </button>
          )}
        </div>

        {/* Dismiss 'X' Button in Top-Left Corner */}
        {item.dismissible && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="بستن اعلان"
            className="shrink-0 self-start -mt-1 -ml-1 w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* High-Performance Smooth CSS Progress Bar at Bottom Edge */}
      {item.showProgress && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-black/20 overflow-hidden">
          <div
            className="h-full bg-white/75 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            style={{
              animation: `toastProgressBar ${duration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
              transformOrigin: "right", // In RTL, shrinks towards the right!
            }}
            onAnimationEnd={handleClose}
          />
        </div>
      )}
    </div>
  );
}

export default ToastItem;
