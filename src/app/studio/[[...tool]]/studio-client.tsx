"use client";

import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

function isAbortError(reason: unknown): boolean {
  if (!reason || typeof reason !== "object") return false;
  const err = reason as { name?: string; code?: number; message?: string };
  return (
    err.name === "AbortError" ||
    err.code === 20 ||
    (typeof err.message === "string" && err.message.includes("signal is aborted"))
  );
}

export function StudioClient() {
  useEffect(() => {
    const onUnhandled = (event: PromiseRejectionEvent) => {
      if (!isAbortError(event.reason)) return;
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", onUnhandled);
    return () => window.removeEventListener("unhandledrejection", onUnhandled);
  }, []);

  return <NextStudio config={config} />;
}
