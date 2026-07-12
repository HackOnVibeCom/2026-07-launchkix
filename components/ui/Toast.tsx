"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Toast.module.css";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={clsx(styles.viewport, className)}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export type ToastVariant = "default" | "success" | "danger";

export interface ToastProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = "default", title, description, action, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={clsx(styles.toast, styles[variant], className)}
      {...props}
    >
      <div className={styles.content}>
        {title && (
          <ToastPrimitive.Title className={styles.title}>
            {title}
          </ToastPrimitive.Title>
        )}
        {description && (
          <ToastPrimitive.Description className={styles.description}>
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      {action}
      <ToastPrimitive.Close className={styles.close} aria-label="Close">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
});
Toast.displayName = "Toast";

export const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={clsx(styles.action, className)}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";
