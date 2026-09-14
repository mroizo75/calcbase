import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

export const client: SanityClient = createClient({
  projectId: projectId || "disabled",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

/** Server-only write client. Requires SANITY_API_WRITE_TOKEN. */
export function getWriteClient() {
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
