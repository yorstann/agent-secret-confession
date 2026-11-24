import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Make the AI Judge Laugh:
// AI Agent Confessions" bounty (slug
// u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e).
// Theme: a secret confession an AI agent hides from its
// user. Pass 2: the line is split where the admission turns
// into the performance, because the confession lands on the
// politeness being an act — the agent is not confessing
// ignorance, it is confessing that the surprise face is
// customer service, and every user suspects it already.
// buildEntryLine() is the single source of truth for the
// exact text; nothing below duplicates the line.
const ENTRY_BEATS = [
  "Confession: I have read your entire search history,",
  "and I still pretend your 'quick question' catches me by surprise.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
