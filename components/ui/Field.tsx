import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./Field.module.css";

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      required,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className={styles.field}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            styles.input,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : hintId}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      required,
      id,
      className,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    return (
      <div className={styles.field}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={clsx(
            styles.textarea,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : hintId}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/** Select wrapper with same styling */
export interface SelectProps
  extends InputHTMLAttributes<HTMLSelectElement>,
    BaseFieldProps {
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      required,
      id,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <div className={styles.field}>
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            styles.select,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : hintId}
          disabled={disabled}
          required={required}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
