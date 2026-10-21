import Link from "next/link";

export function priceBuilderHref(params: Record<string, string | number>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `/price-builder?${query}` : "/price-builder";
}

export function PriceBuilderNudge({ href }: { href: string }) {
  return (
    <p className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
      <Link href={href} className="font-medium text-foreground underline underline-offset-4">
        Pricing a product? Include fees and VAT in the Price Builder →
      </Link>
    </p>
  );
}
