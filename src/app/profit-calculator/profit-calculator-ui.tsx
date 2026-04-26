"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateMargin, calculateMarkup, calculateMarkupFromPercent } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";
import { round } from "@/lib/utils/math";

type ProfitMode = "fromRevenue" | "fromMargin" | "fromMarkup";

export function ProfitCalculatorUi() {
  const searchParams = useSearchParams();
  const [cost, setCost] = useState(searchParams.get("cost") ?? "60");
  const [revenue, setRevenue] = useState(searchParams.get("revenue") ?? "100");
  const [targetMargin, setTargetMargin] = useState(searchParams.get("margin") ?? "30");
  const [targetMarkup, setTargetMarkup] = useState(searchParams.get("markup") ?? "50");
  const [mode, setMode] = useState<ProfitMode>(() => {
    const m = searchParams.get("mode");
    if (m === "fromMargin" || m === "fromMarkup") return m;
    return "fromRevenue";
  });

  const numCost = parseNumericInput(cost);
  const numRevenue = parseNumericInput(revenue);
  const numTargetMargin = parseNumericInput(targetMargin);
  const numTargetMarkup = parseNumericInput(targetMarkup);

  let results: CalculatorResult[] = [];
  let formulaUsed = "";

  if (mode === "fromRevenue" && numCost >= 0 && numRevenue > 0) {
    const { profit, marginPercent } = calculateMargin(numRevenue, numCost);
    const { markupPercent } = calculateMarkup(numCost, numRevenue);
    results = [
      { label: "Revenue", value: numRevenue, formatted: formatNumber(numRevenue) },
      { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
      { label: "Profit", value: profit, formatted: formatNumber(profit), highlight: true },
      { label: "Margin", value: marginPercent, formatted: `${marginPercent}%` },
      { label: "Markup", value: markupPercent, formatted: `${markupPercent}%` },
    ];
    formulaUsed = `${formatNumber(numRevenue)} − ${formatNumber(numCost)} = ${formatNumber(profit)} profit (${marginPercent}% margin, ${markupPercent}% markup)`;
  } else if (mode === "fromMargin" && numCost > 0 && numTargetMargin > 0 && numTargetMargin < 100) {
    const sellingPrice = round(numCost / (1 - numTargetMargin / 100));
    const profit = round(sellingPrice - numCost);
    const { markupPercent } = calculateMarkup(numCost, sellingPrice);
    results = [
      { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
      { label: "Target Margin", value: numTargetMargin, formatted: `${numTargetMargin}%` },
      { label: "Selling Price", value: sellingPrice, formatted: formatNumber(sellingPrice), highlight: true },
      { label: "Profit", value: profit, formatted: formatNumber(profit) },
      { label: "Markup", value: markupPercent, formatted: `${markupPercent}%` },
    ];
    formulaUsed = `${formatNumber(numCost)} ÷ (1 − ${numTargetMargin}%) = ${formatNumber(sellingPrice)}`;
  } else if (mode === "fromMarkup" && numCost > 0 && numTargetMarkup >= 0) {
    const { sellingPrice, profit } = calculateMarkupFromPercent(numCost, numTargetMarkup);
    const { marginPercent } = calculateMargin(sellingPrice, numCost);
    results = [
      { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
      { label: "Target Markup", value: numTargetMarkup, formatted: `${numTargetMarkup}%` },
      { label: "Selling Price", value: sellingPrice, formatted: formatNumber(sellingPrice), highlight: true },
      { label: "Profit", value: profit, formatted: formatNumber(profit) },
      { label: "Margin", value: marginPercent, formatted: `${marginPercent}%` },
    ];
    formulaUsed = `${formatNumber(numCost)} × (1 + ${numTargetMarkup}%) = ${formatNumber(sellingPrice)}`;
  }

  const shareUrl = results.length > 0
    ? buildShareUrl("profit-calculator",
        mode === "fromRevenue"
          ? { cost, revenue, mode }
          : mode === "fromMargin"
            ? { cost, margin: targetMargin, mode }
            : { cost, markup: targetMarkup, mode })
    : undefined;

  useEffect(() => {
    if (mode === "fromRevenue" && numCost >= 0 && numRevenue > 0) {
      const { profit, marginPercent } = calculateMargin(numRevenue, numCost);
      addHistoryEntry({
        calculator: "profit-calculator",
        title: "Profit",
        summary: `Revenue ${formatNumber(numRevenue)}, Cost ${formatNumber(numCost)} → ${formatNumber(profit)} profit (${marginPercent}%)`,
        url: shareUrl ?? "/profit-calculator",
      });
    } else if (mode === "fromMargin" && numCost > 0 && numTargetMargin > 0 && numTargetMargin < 100) {
      const sp = round(numCost / (1 - numTargetMargin / 100));
      addHistoryEntry({
        calculator: "profit-calculator",
        title: "Profit",
        summary: `Cost ${formatNumber(numCost)} @ ${numTargetMargin}% margin → ${formatNumber(sp)}`,
        url: shareUrl ?? "/profit-calculator",
      });
    } else if (mode === "fromMarkup" && numCost > 0 && numTargetMarkup >= 0) {
      const { sellingPrice: sp } = calculateMarkupFromPercent(numCost, numTargetMarkup);
      addHistoryEntry({
        calculator: "profit-calculator",
        title: "Profit",
        summary: `Cost ${formatNumber(numCost)} @ ${numTargetMarkup}% markup → ${formatNumber(sp)}`,
        url: shareUrl ?? "/profit-calculator",
      });
    }
  }, [numCost, numRevenue, numTargetMargin, numTargetMarkup, mode, shareUrl]);

  function handleReset() {
    setCost("60");
    setRevenue("100");
    setTargetMargin("30");
    setTargetMarkup("50");
    setMode("fromRevenue");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <fieldset>
            <legend className="text-sm font-medium leading-none">Mode</legend>
            <div className="mt-1 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMode("fromRevenue")}
                className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                  mode === "fromRevenue"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                From Revenue
              </button>
              <button
                type="button"
                onClick={() => setMode("fromMargin")}
                className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                  mode === "fromMargin"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                From Margin
              </button>
              <button
                type="button"
                onClick={() => setMode("fromMarkup")}
                className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                  mode === "fromMarkup"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                From Markup
              </button>
            </div>
          </fieldset>

          <div>
            <Label htmlFor="profit-cost">Cost</Label>
            <Input
              id="profit-cost"
              type="text"
              inputMode="decimal"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          {mode === "fromRevenue" && (
            <div>
              <Label htmlFor="profit-revenue">Revenue (Selling Price)</Label>
              <Input
                id="profit-revenue"
                type="text"
                inputMode="decimal"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Enter revenue or selling price"
                className="mt-1 text-lg tabular-nums"
              />
            </div>
          )}

          {mode === "fromMargin" && (
            <div>
              <Label htmlFor="profit-margin">Target Margin (%)</Label>
              <Input
                id="profit-margin"
                type="text"
                inputMode="decimal"
                value={targetMargin}
                onChange={(e) => setTargetMargin(e.target.value)}
                placeholder="e.g. 30"
                className="mt-1 text-lg tabular-nums"
              />
            </div>
          )}

          {mode === "fromMarkup" && (
            <div>
              <Label htmlFor="profit-markup">Target Markup (%)</Label>
              <Input
                id="profit-markup"
                type="text"
                inputMode="decimal"
                value={targetMarkup}
                onChange={(e) => setTargetMarkup(e.target.value)}
                placeholder="e.g. 50"
                className="mt-1 text-lg tabular-nums"
              />
            </div>
          )}

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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Profit Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Understanding profit</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Profit is the amount remaining after subtracting costs from revenue. Margin expresses
              that profit as a percentage of revenue, while markup expresses it as a percentage of
              cost. A 30% margin means you keep 30 cents of every dollar in revenue. Use &ldquo;From
              Margin&rdquo; to find the selling price needed for a target margin, or &ldquo;From
              Markup&rdquo; to price based on a cost-plus strategy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
