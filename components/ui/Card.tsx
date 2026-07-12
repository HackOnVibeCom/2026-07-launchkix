import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";
import patterns from "@/styles/patterns.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply glass card visual treatment */
  glass?: boolean;
  /** Apply edge-light gradient ring */
  edgeLight?: boolean;
  /** Padding size preset */
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      glass = false,
      edgeLight = false,
      padding = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          glass && patterns.glassCard,
          edgeLight && patterns.edgeLight,
          padding !== "none" && styles[`padding-${padding}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
