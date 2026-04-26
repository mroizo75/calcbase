"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateRoi } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function RoiCalculatorUi() {
  const searchParams = useSearchParams();
  const [investment, setInvestment] = useState(searchParams.get("investment") ?? "10000");
  const [gain, setGain] = useState(searchParams.get("gain") ?? "15000");

  const numInvestment = parseNumericInput(investment);
  const numGain = parseNumericInput(gain);

  const isValid = numInvestment > 0;
  const { roi, netProfit } = isValid
    ? calculateRoi(numInvestment, numGain)
    : { roi: 0, netProfit: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Investment", value: numInvestment, formatted: formatNumber(numInvestment) },
        { label: "Gain / Return", value: numGain, formatted: formatNumber(numGain) },
        { label: "Net Profit", value: netProfit, formatted: formatNumber(netProfit) },
        { label: "ROI", value: roi, formatted: `${roi}%`, highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `(${formatNumber(numGain)} − ${formatNumber(numInvestment)}) ÷ ${formatNumber(numInvestment)} × 100 = ${roi}%`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("roi-calculator", { investment, gain })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    const { roi: r, netProfit: np } = calculateRoi(numInvestment, numGain);
    addHistoryEntry({
      calculator: "roi-calculator",
      title: "ROI",
      summary: `Investment ${formatNumber(numInvestment)}, Gain ${formatNumber(numGain)} → ${r}% ROI (net ${formatNumber(np)})`,
      url: shareUrl ?? "/roi-calculator",
    });
  }, [numInvestment, numGain, isValid, shareUrl]);

  function handleReset() {
    setInvestment("10000");
    setGain("15000");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="roi-investment">Investment</Label>
            <Input
              id="roi-investment"
              type="text"
              inputMode="decimal"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="Enter total investment"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="roi-gain">Gain / Return</Label>
            <Input
              id="roi-gain"
              type="text"
              inputMode="decimal"
              value={gain}
              onChange={(e) => setGain(e.target.value)}
              placeholder="Enter total gain or return"
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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="ROI Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Understanding ROI</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Return on investment measures how efficiently your money is working. An ROI of {roi}%
              means you earned {formatNumber(netProfit)} in net profit on a {formatNumber(numInvestment)} investment.
              Positive ROI indicates a profitable outcome; negative ROI means you lost money. ROI does
              not account for time — a 50% ROI over five years is very different from 50% over one
              month. Always compare ROI within the same time frame and category.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
