"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CopyButton } from "@/components/ui/CopyButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { fadeUp } from "@/lib/motion";
import patterns from "@/styles/patterns.module.css";
import styles from "./SectionCard.module.css";

interface SectionCardProps {
  title: string;
  /** Plain text for the copy button */
  copyValue: string;
  /** Rendered content inside the card */
  children: ReactNode;
  /** Called when user clicks Regenerate */
  onRegenerate?: () => Promise<void>;
  /** Show an "AI-generated" trust badge */
  showBadge?: boolean;
  className?: string;
}

export function SectionCard({
  title,
  copyValue,
  children,
  onRegenerate,
  showBadge = true,
  className,
}: SectionCardProps) {
  const [regenerating, setRegenerating] = useState(false);

  async function handleRegenerate() {
    if (!onRegenerate || regenerating) return;
    setRegenerating(true);
    try {
      await onRegenerate();
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className={clsx(
        styles.card,
        patterns.glassCard,
        patterns.edgeLight,
        className
      )}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{title}</h3>
          {showBadge && (
            <Badge variant="default" size="sm">
              AI-generated
            </Badge>
          )}
        </div>
        <div className={styles.actions}>
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              loading={regenerating}
              onClick={handleRegenerate}
              aria-label={`Regenerate ${title}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13.5 8A5.5 5.5 0 1 1 8 2.5c1.8 0 3.4.87 4.4 2.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 2v3h3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Regenerate
            </Button>
          )}
          <CopyButton value={copyValue} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className={clsx(styles.content, regenerating && styles.contentLoading)}>
        {children}
      </div>
    </motion.div>
  );
}
