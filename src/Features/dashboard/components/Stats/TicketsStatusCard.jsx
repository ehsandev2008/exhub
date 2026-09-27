import { TbMessageCircleShare } from "react-icons/tb";

function TicketsStatusCard() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[#777777] text-xs sm:text-sm font-medium">
            وضعیت تیکت ها
          </span>
          <span className="text-gray-900 text-base sm:text-lg font-bold mt-1">
            ۳۲۴ تیکت
          </span>
        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF8E8] text-[#E9A900] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
          <TbMessageCircleShare />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-1 flex-wrap text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 bg-[#DA4649] rounded-full inline-block" />
          <span>۲۳ پاسخ داده نشده</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 bg-[#E9A900] rounded-full inline-block" />
          <span>۸ در حال بررسی</span>
        </div>
      </div>
    </div>
  );
}

export default TicketsStatusCard;
