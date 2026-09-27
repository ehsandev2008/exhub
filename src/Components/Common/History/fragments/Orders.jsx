import { FiClock, FiX } from "react-icons/fi";
import { formatNumber, formatEnglishNumber } from "../../../../lib/Hooks/useCryptoTicker";

function Orders({ orders = [], onCancelOrder }) {
  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto w-full" dir="rtl">
      {/* Desktop & Tablet Table */}
      <table className="w-full text-right border-collapse min-w-[720px]">
        <thead>
          <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium">
            <th className="py-3.5 px-3">زمان ثبت</th>
            <th className="py-3.5 px-3">جفت ارز</th>
            <th className="py-3.5 px-3">نوع سفارش</th>
            <th className="py-3.5 px-3">قیمت واحد</th>
            <th className="py-3.5 px-3">مقدار</th>
            <th className="py-3.5 px-3">پر شده</th>
            <th className="py-3.5 px-3">مجموع ارزش</th>
            <th className="py-3.5 px-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-xs sm:text-sm text-gray-700">
          {orders.map((order) => {
            const isBuy = order.side === "buy";
            const filledPercent = Math.round(
              (order.filled / order.amount) * 100,
            );

            return (
              <tr
                key={order.id}
                className="hover:bg-gray-50/70 transition-colors"
              >
                {/* Date / Time */}
                <td className="py-3.5 px-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <FiClock className="size-3.5 text-gray-400" />
                    <span>{order.date}</span>
                  </div>
                </td>

                {/* Trading Pair */}
                <td
                  className="py-3.5 px-3 font-semibold text-gray-800 whitespace-nowrap font-mono"
                  dir="ltr"
                >
                  {order.pair}
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
                    {isBuy ? "خرید" : "فروش"}{" "}
                    {order.type === "limit" ? "محدود" : "فوری"}
                  </span>
                </td>

                {/* Price */}
                <td
                  className="py-3.5 px-3 font-mono text-gray-800 whitespace-nowrap"
                  dir="ltr"
                >
                  <div className="text-right">
                    <span>${formatEnglishNumber(order.price, 2)}</span>
                    <span className="block text-[10px] text-gray-400 font-sans mt-0.5">
                      {formatNumber(order.price * 92850, 0)} تومان
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td
                  className="py-3.5 px-3 font-mono text-gray-700 whitespace-nowrap"
                  dir="ltr"
                >
                  {formatEnglishNumber(order.amount, 4)}{" "}
                  {order.pair.split("/")[0]}
                </td>

                {/* Filled percentage with bar */}
                <td className="py-3.5 px-3 whitespace-nowrap min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isBuy ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${filledPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                      %{filledPercent}
                    </span>
                  </div>
                </td>

                {/* Total Value */}
                <td
                  className="py-3.5 px-3 font-mono text-gray-800 whitespace-nowrap"
                  dir="ltr"
                >
                  ${formatEnglishNumber(order.price * order.amount, 2)}
                </td>

                {/* Cancel Action */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <button
                    onClick={() => onCancelOrder && onCancelOrder(order.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                  >
                    <FiX className="size-3.5" />
                    <span>لغو</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
