const PRIVATE_V4 =
  /^(127\.|10\.|192\.168\.|169\.254\.|0\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/;

export function countryCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || code === "XX" || code === "T1") return null;
  return code;
}

export function isPublicIp(ip: string): boolean {
  const value = ip.trim().toLowerCase().replace(/^\[|\]$/g, "");
  if (!value || value === "::1" || value === "localhost") return false;
  if (value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80:")) return false;
  if (value.includes(":")) return true;

  if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) return false;
  if (value.split(".").some((part) => Number(part) > 255)) return false;
  if (PRIVATE_V4.test(value)) return false;

  const [a, b] = value.split(".").map(Number);
  if (a === 172 && b >= 16 && b <= 31) return false;
  return true;
}

/** Prefer the address the proxy actually saw, not a spoofed first hop. */
export function publicIpFromHeaders(headerList: Headers): string | null {
  const ordered: string[] = [];
  const connecting = headerList.get("cf-connecting-ip")?.trim();
  const real = headerList.get("x-real-ip")?.trim();
  if (connecting) ordered.push(connecting);
  if (real) ordered.push(real);

  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    for (let index = parts.length - 1; index >= 0; index -= 1) {
      ordered.push(parts[index]);
    }
  }

  return ordered.find((ip) => isPublicIp(ip)) ?? null;
}

export function countryFromHeaders(headerList: Headers): string | null {
  return (
    countryCode(headerList.get("x-vercel-ip-country")) ||
    countryCode(headerList.get("cf-ipcountry")) ||
    countryCode(headerList.get("x-country-code")) ||
    countryCode(headerList.get("x-cb-country"))
  );
}

const ipCountryCache = new Map<string, { code: string | null; at: number }>();
const HIT_MS = 6 * 60 * 60 * 1000;
const MISS_MS = 10 * 60 * 1000;

export async function countryForIp(ip: string): Promise<string | null> {
  if (!isPublicIp(ip)) return null;

  const cached = ipCountryCache.get(ip);
  if (cached) {
    const maxAge = cached.code ? HIT_MS : MISS_MS;
    if (Date.now() - cached.at < maxAge) return cached.code;
  }

  try {
    const response = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) {
      ipCountryCache.set(ip, { code: null, at: Date.now() });
      return null;
    }
    const body = (await response.json()) as { country?: string };
    const code = countryCode(body.country);
    ipCountryCache.set(ip, { code, at: Date.now() });
    return code;
  } catch {
    ipCountryCache.set(ip, { code: null, at: Date.now() });
    return null;
  }
}

export async function resolveVisitorCountry(headerList: Headers): Promise<string | null> {
  const fromHeader = countryFromHeaders(headerList);
  if (fromHeader) return fromHeader;

  const ip = publicIpFromHeaders(headerList);
  if (!ip) return null;
  return countryForIp(ip);
}
