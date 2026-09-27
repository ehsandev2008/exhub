import { useState, useEffect, useCallback } from "react";

// Global Toast State & Event Bus
let listeners = [];
let toasts = [];
let defaultPosition = "top-right"; // 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

const notify = () => {
  listeners.forEach((listener) => listener([...toasts]));
};

export const subscribeToToasts = (listener) => {
  listeners.push(listener);
  listener([...toasts]);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

/**
 * Global toast dispatcher callable from anywhere (components, utilities, async actions)
 */
export const toast = (options) => {
  const id =
    options.id ||
    `toast-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  const newToast = {
    id,
    type: options.type || "info", // 'success' | 'error' | 'warning' | 'info'
    title: options.title || "",
    message: options.message || "",
    duration: options.duration !== undefined ? options.duration : 5000, // ms, 0 = persistent
    position: options.position || defaultPosition,
    action: options.action || null, // { label: string, onClick: func }
    showProgress: options.showProgress !== false,
    dismissible: options.dismissible !== false,
  };

  // Limit max concurrent toasts to prevent screen flooding
  if (toasts.length >= 5) {
    toasts.shift();
  }

  toasts = [...toasts, newToast];
  notify();
  return id;
};

// Shorthand helper methods
toast.success = (title, message, options = {}) =>
  toast({ ...options, type: "success", title, message });

toast.error = (title, message, options = {}) =>
  toast({ ...options, type: "error", title, message });

toast.warning = (title, message, options = {}) =>
  toast({ ...options, type: "warning", title, message });

toast.info = (title, message, options = {}) =>
  toast({ ...options, type: "info", title, message });

toast.dismiss = (id) => {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
};

toast.clearAll = () => {
  toasts = [];
  notify();
};

toast.setPosition = (position) => {
  defaultPosition = position;
};

export const getDefaultPosition = () => defaultPosition;

/**
 * React Hook for consuming and dispatching toasts inside React components
 */
export function useToast() {
  const [activeToasts, setActiveToasts] = useState(toasts);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((updated) => {
      setActiveToasts(updated);
    });
    return unsubscribe;
  }, []);

  const showToast = useCallback((options) => toast(options), []);

  const success = useCallback(
    (title, message, options) => toast.success(title, message, options),
    []
  );

  const error = useCallback(
    (title, message, options) => toast.error(title, message, options),
    []
  );

  const warning = useCallback(
    (title, message, options) => toast.warning(title, message, options),
    []
  );

  const info = useCallback(
    (title, message, options) => toast.info(title, message, options),
    []
  );

  const dismiss = useCallback((id) => toast.dismiss(id), []);

  const clearAll = useCallback(() => toast.clearAll(), []);

  return {
    toasts: activeToasts,
    toast,
    showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    clearAll,
  };
}

export default useToast;
