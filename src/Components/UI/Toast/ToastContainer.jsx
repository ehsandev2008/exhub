import { useState, useEffect } from "react";
import { subscribeToToasts } from "../../../lib/Hooks/useToast";
import ToastItem from "./ToastItem";

const POSITION_CLASSES = {
  "top-right": "top-4 right-4 sm:top-6 sm:right-6 items-end",
  "top-left": "top-4 left-4 sm:top-6 sm:left-6 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6 items-center",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6 items-end",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 items-center",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((updatedToasts) => {
      setToasts(updatedToasts);
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  // Group toasts by position
  const grouped = toasts.reduce((acc, item) => {
    const pos = item.position || "top-right";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(item);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(grouped).map(([pos, posToasts]) => {
        const positionClass =
          POSITION_CLASSES[pos] || POSITION_CLASSES["top-right"];
        const isBottom = pos.startsWith("bottom");

        return (
          <div
            key={pos}
            className={`fixed z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-[calc(100vw-32px)] sm:max-w-fit ${positionClass}`}
          >
            {/* If at bottom, reverse so newer toasts appear cleanly stacked */}
            {(isBottom ? [...posToasts].reverse() : posToasts).map(
              (toastItem) => (
                <ToastItem key={toastItem.id} toast={toastItem} />
              )
            )}
          </div>
        );
      })}
    </>
  );
}

export default ToastContainer;
