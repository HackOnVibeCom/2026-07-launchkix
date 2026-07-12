"use client";

import { useState } from "react";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "danger";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<ToastOptions & { id: string; open: boolean }>
  >([]);

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options.duration ?? 3000;

    setToasts((prev) => [...prev, { ...options, id, open: true }]);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, open: false } : t))
        );
      }, duration);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
  };

  const dismissAll = () => {
    setToasts((prev) => prev.map((t) => ({ ...t, open: false })));
  };

  // Clean up closed toasts after animation
  const handleOpenChange = (id: string, open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 200); // Match animation duration
    }
  };

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    handleOpenChange,
    // Convenience methods
    success: (title: string, description?: string, duration?: number) =>
      toast({ title, description, variant: "success", duration }),
    error: (title: string, description?: string, duration?: number) =>
      toast({ title, description, variant: "danger", duration }),
  };
}
