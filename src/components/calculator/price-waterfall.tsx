import type { WaterfallLine } from "@/lib/utils/price-builder";
import { formatNumber } from "@/lib/utils/format-number";

const barClass: Record<WaterfallLine["id"], string> = {
  customer: "bg-foreground",
  vat: "bg-foreground/25",
  platform: "bg-foreground/45",
  payment: "bg-foreground/60",
  costs: "bg-foreground/80",
  profit: "bg-primary",
};

export function PriceWaterfall({ lines }: { lines: WaterfallLine[] }) {
  const customer = lines.find((line) => line.id === "customer")?.amount ?? 0;
  const segments = lines.filter((line) => line.id !== "customer" && line.amount > 0);

  return (
    <div>
      <table className="w-full text-sm">
        <caption className="sr-only">Where the customer payment goes</caption>
        <tbody>
          {lines.map((line) => (
            <tr key={line.id} className={line.id === "profit" ? "border-t font-semibold" : undefined}>
              <th scope="row" className="py-1.5 text-left font-medium">
                {line.label}
              </th>
              <td className="py-1.5 text-right tabular-nums">
                {line.id !== "customer" && line.id !== "profit" && line.amount > 0 ? "−" : ""}
                £{formatNumber(line.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {customer > 0 ? (
        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className={barClass[segment.id]}
              style={{ width: `${Math.min(100, (segment.amount / customer) * 100)}%` }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
