import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function ModernDropdown({
  options = [],
  value,
  onChange,
  className = "",
  buttonClassName = "",
  menuClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors py-1 px-2.5 rounded-xl cursor-pointer ${buttonClassName}`}
        aria-expanded={isOpen}
      >
        <FaChevronDown
          className={`w-2.5 h-2.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="font-medium font-['IRANSansXFaNum']">{value}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-1.5 z-50 min-w-[130px] sm:min-w-[145px] bg-white rounded-2xl shadow-xl shadow-slate-900/15 border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-['IRANSansXFaNum'] ${menuClassName}`}
          dir="rtl"
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-right px-3.5 py-2 text-xs sm:text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-[#0650D7] text-white font-semibold"
                    : "text-gray-700 hover:bg-blue-50/70 hover:text-[#0650D7]"
                }`}
              >
                <span>{opt}</span>
                {isSelected && (
                  <span className="text-xs mr-1 font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ModernDropdown;
