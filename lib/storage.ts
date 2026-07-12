/** LauchKix — localStorage helpers for kit history (last 3) */

import type { AppBrief, LaunchKit, GenerationMeta } from "@/types/kit";

export interface StoredKit {
  id: string;
  brief: AppBrief;
  kit: LaunchKit;
  meta: GenerationMeta;
  savedAt: string;
}

const STORAGE_KEY = "lauchkix_history";
const MAX_HISTORY = 3;

function isClient(): boolean {
  return typeof window !== "undefined";
}

/** Load all stored kits from localStorage */
export function loadHistory(): StoredKit[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Save a kit to history (keeps last MAX_HISTORY entries) */
export function saveToHistory(
  brief: AppBrief,
  kit: LaunchKit,
  meta: GenerationMeta
): StoredKit {
  const entry: StoredKit = {
    id: Math.random().toString(36).slice(2, 9),
    brief,
    kit,
    meta,
    savedAt: new Date().toISOString(),
  };

  if (!isClient()) return entry;

  try {
    const history = loadHistory();
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage full or unavailable — fail silently
  }

  return entry;
}

/** Remove a single entry by id */
export function removeFromHistory(id: string): void {
  if (!isClient()) return;
  try {
    const history = loadHistory().filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

/** Clear all history */
export function clearHistory(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
