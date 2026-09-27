// Utility functions for number and currency formatting in Persian (IRANSans / Toman / USD)

export const USD_TO_TOMAN = 92850;

const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toPersianDigits = (n) => {
  if (n === null || n === undefined) return "";
  return n.toString().replace(/\d/g, (d) => farsiDigits[d]);
};

export const formatPersianPrice = (num, decimals = 2, separator = ".") => {
  if (num === null || num === undefined || isNaN(num)) return "۰";
  const parts = Number(num).toFixed(decimals).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const formatted = decimals > 0 ? `${intPart}.${parts[1]}` : intPart;
  return toPersianDigits(formatted);
};

export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) return "۰";
  const n = Number(num);
  return n.toLocaleString("fa-IR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatEnglishNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) return "0.00";
  const n = Number(num);
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
