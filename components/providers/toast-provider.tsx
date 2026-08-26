"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = ToastInput & { id: number };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<number, number>());

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const pushToast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const duration = input.duration ?? 3200;
    setToasts((current) => [...current, { ...input, id }]);

    const timer = window.setTimeout(() => removeToast(id), duration);
    timers.current.set(id, timer);
  }, [removeToast]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      toast: pushToast,
      success: (title, description) => pushToast({ title, description, variant: "success" }),
      error: (title, description) => pushToast({ title, description, variant: "error" }),
      info: (title, description) => pushToast({ title, description, variant: "info" }),
    }),
    [pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <div className="fixed bottom-5 right-5 z-[100] flex w-[min(100vw-2rem,24rem)] flex-col gap-3">
              {toasts.map((toast) => (
                <ToastCard key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const tone =
    toast.variant === "error"
      ? "border-rose-200 bg-rose-50 text-rose-900"
      : toast.variant === "info"
        ? "border-sky-200 bg-sky-50 text-sky-900"
        : "border-emerald-200 bg-emerald-50 text-emerald-900";

  const Icon = toast.variant === "error" ? AlertCircle : toast.variant === "info" ? Info : CheckCircle2;

  return (
    <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${tone}`}>
      <div className="mt-0.5 rounded-full bg-white/80 p-2">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description ? <p className="mt-0.5 text-sm opacity-80">{toast.description}</p> : null}
      </div>
      <button onClick={onDismiss} className="rounded-full p-1 text-current opacity-60 transition hover:bg-white/60 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
