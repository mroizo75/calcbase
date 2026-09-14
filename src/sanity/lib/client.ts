import { createClient, type SanityClient } from "next-sanity";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

function resolveProjectId(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    undefined
  );
}

export function isSanityConfigured(): boolean {
  return Boolean(resolveProjectId());
}

/** Prefer this on the server so env is read at request/build time correctly. */
export function getSanityClient(): SanityClient {
  const projectId = resolveProjectId();
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID)");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}

/**
 * Backward-compatible default client.
 * Uses a placeholder projectId when unset so Studio/config imports don't crash;
 * public pages must gate with isSanityConfigured() first.
 */
export const client: SanityClient = createClient({
  projectId: resolveProjectId() || "disabled",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

/** Server-only write client. Requires SANITY_API_WRITE_TOKEN. */
export function getWriteClient() {
  const projectId = resolveProjectId();
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
