"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";
import { searchCalculators } from "@/lib/calculators/registry";
import { getHistory, clearHistory, type HistoryEntry } from "@/lib/history/config";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => getHistory().slice(0, 5));
  const ref = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0 ? searchCalculators(query) : [];
  const showHistory = isOpen && query.trim().length === 0 && history.length > 0;
  const showResults = isOpen && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search…"
          className="h-8 w-36 rounded-md border bg-muted/50 pl-8 pr-2 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:w-56 focus:bg-background focus:ring-1 focus:ring-primary/30 lg:w-44 lg:focus:w-64"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setHistory(getHistory().slice(0, 5));
            setIsOpen(true);
          }}
          aria-label="Search calculators"
        />
      </div>

      {showHistory && (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-md border bg-popover p-1 shadow-md">
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              Recent calculations
            </span>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </div>
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={entry.url}
                  className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="font-medium">{entry.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{entry.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-md border bg-popover p-1 shadow-md">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No calculators found.</p>
          ) : (
            <ul>
              {results.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/${calc.slug}`}
                    className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="font-medium">{calc.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{calc.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
