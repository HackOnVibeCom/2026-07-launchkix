/** Shared product types — expanded in Phase 1 with full LaunchKit schema */

export type Platform = "ios" | "android";

export type Tone = "professional" | "playful" | "bold" | "friendly";

export type LaunchGoal = "downloads" | "waitlist" | "paid";

export type KitLanguage = "en" | "es" | "fr";

export interface AppBrief {
  name: string;
  tagline: string;
  description: string;
  platforms: Platform[];
  category: string;
  targetAudience: string;
  tone: Tone;
  goal: LaunchGoal;
  language?: KitLanguage;
}

// Full LaunchKit shape lands in Phase 1 alongside Zod schemas
export type LaunchKit = Record<string, unknown>;
