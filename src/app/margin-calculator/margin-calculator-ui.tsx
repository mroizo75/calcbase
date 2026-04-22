"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateMargin } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function MarginCalculatorUi() {
  const searchParams = useSearchParams();
  const [revenue, setRevenue] = useState(searchParams.get("revenue") ?? "100");
  const [cost, setCost] = useState(searchParams.get("cost") ?? "60");

  const numRevenue = parseNumericInput(revenue);
  const numCost = parseNumericInput(cost);

  const isValid = numRevenue > 0;
  const { profit, marginPercent } = isValid
    ? calculateMargin(numRevenue, numCost)
    : { profit: 0, marginPercent: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Revenue", value: numRevenue, formatted: formatNumber(numRevenue) },
        { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
        { label: "Profit", value: profit, formatted: formatNumber(profit) },
        { label: "Profit Margin", value: marginPercent, formatted: `${marginPercent}%`, highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `(${formatNumber(numRevenue)} − ${formatNumber(numCost)}) ÷ ${formatNumber(numRevenue)} × 100 = ${marginPercent}%`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("margin-calculator", { revenue, cost })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    addHistoryEntry({
      calculator: "margin-calculator",
      title: "Profit Margin",
      summary: `Revenue ${formatNumber(numRevenue)}, Cost ${formatNumber(numCost)} → ${marginPercent}% margin`,
      url: shareUrl ?? "/margin-calculator",
    });
  }, [numRevenue, numCost, isValid, marginPercent, shareUrl]);

  function handleReset() {
    setRevenue("100");
    setCost("60");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="margin-revenue">Revenue (Selling Price)</Label>
            <Input
              id="margin-revenue"
              type="text"
              inputMode="decimal"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Enter revenue or selling price"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="margin-cost">Cost</Label>
            <Input
              id="margin-cost"
              type="text"
              inputMode="decimal"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Reset
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Profit Margin Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Understanding profit margin</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Profit margin tells you what percentage of each dollar in revenue you keep as profit.
              A {marginPercent}% margin on {formatNumber(numRevenue)} in revenue means you retain{" "}
              {formatNumber(profit)} after covering the {formatNumber(numCost)} cost. Margin is always
              calculated relative to revenue — not cost. This is the key difference between margin
              and markup.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
