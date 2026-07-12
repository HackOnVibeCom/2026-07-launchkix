import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.container, styles[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
