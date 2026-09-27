import { LuCircleUserRound } from "react-icons/lu";

function AuthStatusCard() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[#777777] text-xs sm:text-sm font-medium">
            وضعیت احراز هویت
          </span>
          <span className="text-gray-900 text-base sm:text-lg font-bold mt-1">
            تایید شده حقوقی
          </span>
        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EAF7EB] text-[#25AA2E] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
          <LuCircleUserRound />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-1">
        <span className="w-1.5 h-3.5 bg-[#25AA2E] rounded-full inline-block" />
        <span className="text-xs text-gray-500 font-medium">ایکس هاب</span>
      </div>
    </div>
  );
}

export default AuthStatusCard;
