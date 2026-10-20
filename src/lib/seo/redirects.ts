/** Permanent redirects for URLs we no longer publish. */
export const permanentRedirects: { source: string; destination: string }[] = [
  { source: "/margin-vs-markup-calculator", destination: "/margin-markup-converter" },
  { source: "/percentage-calculator", destination: "/percentage-change-calculator" },
  { source: "/roi-calculator", destination: "/guides/how-to-calculate-roi" },
  { source: "/gst-calculator", destination: "/vat-calculator" },
  { source: "/sales-tax-calculator", destination: "/guides/vat-vs-sales-tax" },
  { source: "/news/calculate-pre-vat-price", destination: "/remove-vat" },
  { source: "/news/margin-vs-markup-practical-examples", destination: "/guides/margin-vs-markup" },
  { source: "/news/markup-vs-margin", destination: "/guides/margin-vs-markup" },
  { source: "/news/how-to-calculate-commission", destination: "/commission-calculator" },
];

export const retiredArticleDestinations: Record<string, string> = Object.fromEntries(
  permanentRedirects
    .filter((redirect) => redirect.source.startsWith("/news/"))
    .map((redirect) => [redirect.source.slice("/news/".length), redirect.destination]),
);
