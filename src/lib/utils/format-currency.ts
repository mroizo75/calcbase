type CurrencyCode = "USD" | "GBP" | "EUR" | "AUD" | "CAD";

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  AUD: "A$",
  CAD: "C$",
};

export function formatCurrency(
  value: number,
  currency: CurrencyCode = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getCurrencySymbol(currency: CurrencyCode = "USD"): string {
  return CURRENCY_SYMBOLS[currency];
}

export { type CurrencyCode };
