"use client";

import { Card, CardContent } from "@/components/ui/card";
import { VAT_PRESETS } from "@/lib/calculators/registry";
import { addVat, removeVat } from "@/lib/utils/math";
import { formatNumber } from "@/lib/utils/format-number";

interface VatComparisonTableProps {
  amount: number;
  mode: "add" | "remove";
}

export function VatComparisonTable({ amount, mode }: VatComparisonTableProps) {
  if (amount <= 0) return null;

  const rows = VAT_PRESETS.map((preset) => {
    if (mode === "add") {
      const { gross, vatAmount } = addVat(amount, preset.rate);
      return { label: preset.label, rate: preset.rate, net: amount, vat: vatAmount, gross };
    }
    const { net, vatAmount } = removeVat(amount, preset.rate);
    return { label: preset.label, rate: preset.rate, net, vat: vatAmount, gross: amount };
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="mb-1 text-lg font-semibold">VAT Comparison Across Countries</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {mode === "add"
            ? `How ${formatNumber(amount)} net looks with different VAT rates`
            : `What ${formatNumber(amount)} gross breaks down to at different VAT rates`}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 pr-4 font-medium text-muted-foreground">Country</th>
                <th className="pb-2 pr-4 text-right font-medium text-muted-foreground">Rate</th>
                <th className="pb-2 pr-4 text-right font-medium text-muted-foreground">Net</th>
                <th className="pb-2 pr-4 text-right font-medium text-muted-foreground">VAT</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">Gross</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="py-2.5 pr-4 font-medium">{row.label}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{row.rate}%</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{formatNumber(row.net)}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums text-muted-foreground">{formatNumber(row.vat)}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums">{formatNumber(row.gross)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
