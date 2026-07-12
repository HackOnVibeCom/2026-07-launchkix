import { type HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  /** Width (CSS value: "100%", "200px", etc.) */
  width?: string | number;
  /** Height (CSS value: "20px", "100%", etc.) */
  height?: string | number;
  /** Animation enabled */
  animate?: boolean;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  animate = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const inlineStyle = {
    ...style,
    ...(width !== undefined && {
      width: typeof width === "number" ? `${width}px` : width,
    }),
    ...(height !== undefined && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
  };

  return (
    <div
      className={clsx(
        styles.skeleton,
        styles[variant],
        animate && styles.animate,
        className
      )}
      style={inlineStyle}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
}

/** Pre-composed skeleton variants for common use cases */

export function SkeletonText({
  lines = 1,
  lastLineWidth = "80%",
  className,
  ...props
}: Omit<SkeletonProps, "variant"> & {
  lines?: number;
  lastLineWidth?: string;
}) {
  if (lines === 1) {
    return <Skeleton variant="text" className={className} {...props} />;
  }

  return (
    <div className={styles.textLines}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : "100%"}
          className={className}
          {...props}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  showAvatar = false,
  titleWidth = "60%",
  className,
  ...props
}: Omit<SkeletonProps, "variant"> & {
  showAvatar?: boolean;
  titleWidth?: string;
}) {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {showAvatar && (
        <Skeleton variant="circular" width={48} height={48} animate />
      )}
      <div className={styles.cardContent}>
        <Skeleton variant="text" width={titleWidth} height={24} animate />
        <SkeletonText lines={2} animate />
      </div>
    </div>
  );
}
