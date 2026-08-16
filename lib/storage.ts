import type { HistoryItem } from "./types";

const STORAGE_KEY = "warikan-history";

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistHistory(items: HistoryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function saveHistory(item: HistoryItem): HistoryItem[] {
  const current = loadHistory();
  const updated = [item, ...current];
  persistHistory(updated);
  return updated;
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  const updated = loadHistory().filter((item) => item.id !== id);
  persistHistory(updated);
  return updated;
}

export function clearAllHistory(): HistoryItem[] {
  persistHistory([]);
  return [];
}

export function createHistoryItem(
  data: Omit<HistoryItem, "id" | "savedAt">
): HistoryItem {
  return {
    ...data,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };
}
