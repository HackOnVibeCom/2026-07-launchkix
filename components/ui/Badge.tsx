import { type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Badge.module.css";

export type BadgeVariant = "default" | "accent" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(styles.badge, styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
