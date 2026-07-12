import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

export type ButtonVariant = "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "accent",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.btn,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="32 32"
              />
            </svg>
          </span>
        )}
        <span className={clsx(loading && styles.labelLoading)}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

/** Helper to build button className for link/anchor components */
export function buttonClassName(
  variant: ButtonVariant = "accent",
  size: ButtonSize = "md",
  extra?: string
) {
  return clsx(styles.btn, styles[variant], styles[size], extra);
}
