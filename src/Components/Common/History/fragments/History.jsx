import { FiCheckCircle, FiClock } from "react-icons/fi";
import { formatNumber, formatEnglishNumber } from "../../../../utils/formatters";

function History({ transactions = [] }) {
  if (!transactions || transactions.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto w-full" dir="rtl">
      <table className="w-full text-right border-collapse min-w-[720px]">
        <thead>
          <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium">
            <th className="py-3.5 px-3">زمان معامله</th>
            <th className="py-3.5 px-3">جفت ارز</th>
            <th className="py-3.5 px-3">نوع معامله</th>
            <th className="py-3.5 px-3">قیمت معامله شده</th>
            <th className="py-3.5 px-3">حجم معامله</th>
            <th className="py-3.5 px-3">کارمزد</th>
            <th className="py-3.5 px-3">مجموع ارزش</th>
            <th className="py-3.5 px-3 text-center">وضعیت</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-xs sm:text-sm text-gray-700">
          {transactions.map((tx) => {
            const isBuy = tx.side === "buy";

            return (
              <tr
                key={tx.id}
                className="hover:bg-gray-50/70 transition-colors"
              >
                {/* Date */}
                <td className="py-3.5 px-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <FiClock className="size-3.5 text-gray-400" />
                    <span>{tx.date}</span>
                  </div>
                </td>

                {/* Trading Pair */}
                <td className="py-3.5 px-3 font-semibold text-gray-800 whitespace-nowrap font-mono" dir="ltr">
                  {tx.pair}
                </td>

                {/* Side */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      isBuy
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}
                  >
                    {isBuy ? "خرید" : "فروش"}
                  </span>
                </td>

                {/* Executed Price */}
                <td className="py-3.5 px-3 font-mono text-gray-800 whitespace-nowrap" dir="ltr">
                  <div className="text-right">
                    <span>${formatEnglishNumber(tx.price, 2)}</span>
                    <span className="block text-[10px] text-gray-400 font-sans mt-0.5">
                      {formatNumber(tx.price * 92850, 0)} تومان
                    </span>
                  </div>
                </td>

                {/* Volume / Amount */}
                <td className="py-3.5 px-3 font-mono text-gray-700 whitespace-nowrap" dir="ltr">
                  {formatEnglishNumber(tx.amount, 4)} {tx.pair.split("/")[0]}
                </td>

                {/* Fee */}
                <td className="py-3.5 px-3 font-mono text-gray-400 whitespace-nowrap" dir="ltr">
                  {formatEnglishNumber(tx.fee, 4)} USDT
                </td>

                {/* Total Value */}
                <td className="py-3.5 px-3 font-mono text-gray-800 font-semibold whitespace-nowrap" dir="ltr">
                  ${formatEnglishNumber(tx.total, 2)}
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">
                    <FiCheckCircle className="size-3.5" />
                    <span>موفق</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default History;
