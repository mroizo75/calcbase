"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchCalculators } from "@/lib/calculators/registry";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const results = query.trim().length > 0 ? searchCalculators(query) : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search calculators…"
          className="pl-9"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Search calculators"
        />
      </div>
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
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
