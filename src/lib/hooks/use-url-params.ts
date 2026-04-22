"use client";

import { useSearchParams } from "next/navigation";

export function useUrlParam(key: string, fallback: string): string {
  const searchParams = useSearchParams();
  return searchParams.get(key) ?? fallback;
}

export function useUrlParams(defaults: Record<string, string>): Record<string, string> {
  const searchParams = useSearchParams();
  const result: Record<string, string> = {};
  for (const [key, fallback] of Object.entries(defaults)) {
    result[key] = searchParams.get(key) ?? fallback;
  }
  return result;
}
