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

function resolveReadToken(): string | undefined {
  // Private Sanity datasets return empty results without a token.
  return process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN || undefined;
}

export function isSanityConfigured(): boolean {
  return Boolean(resolveProjectId());
}

/**
 * Server read client. Uses a token when available so private datasets work on /news.
 */
export function getSanityClient(): SanityClient {
  const projectId = resolveProjectId();
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID)");
  }

  const token = resolveReadToken();

  return createClient({
    projectId,
    dataset,
    apiVersion,
    // Token + CDN is fine; without token private datasets appear empty.
    useCdn: !token,
    token,
    perspective: "published",
  });
}

/**
 * Backward-compatible default client (prefer getSanityClient() on server pages).
 */
export const client: SanityClient = createClient({
  projectId: resolveProjectId() || "disabled",
  dataset,
  apiVersion,
  useCdn: !resolveReadToken(),
  token: resolveReadToken(),
  perspective: "published",
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
