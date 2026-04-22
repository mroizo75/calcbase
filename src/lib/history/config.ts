const HISTORY_KEY = "calcbase-history";
const MAX_ENTRIES = 20;

export interface HistoryEntry {
  id: string;
  calculator: string;
  title: string;
  summary: string;
  url: string;
  timestamp: number;
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  };

  const deduplicated = history.filter(
    (h) => h.calculator !== entry.calculator || h.summary !== entry.summary,
  );

  const updated = [newEntry, ...deduplicated].slice(0, MAX_ENTRIES);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
