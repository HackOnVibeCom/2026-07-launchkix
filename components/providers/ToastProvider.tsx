"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  ToastProvider as RadixToastProvider,
  ToastViewport,
  Toast,
} from "@/components/ui/Toast";
import { useToast, type ToastOptions } from "@/components/ui/use-toast";

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  success: (title: string, description?: string, duration?: number) => string;
  error: (title: string, description?: string, duration?: number) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, toast, success, error, dismiss, dismissAll, handleOpenChange } =
    useToast();

  return (
    <ToastContext.Provider value={{ toast, success, error, dismiss, dismissAll }}>
      <RadixToastProvider swipeDirection="right" duration={3000}>
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            open={t.open}
            onOpenChange={(open) => handleOpenChange(t.id, open)}
          />
        ))}
        <ToastViewport />
      </RadixToastProvider>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}
