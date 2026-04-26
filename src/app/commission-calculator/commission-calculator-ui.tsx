"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateCommission } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

const RATE_PRESETS = [1, 2, 3, 5, 6, 8, 10, 15, 20];

export function CommissionCalculatorUi() {
  const searchParams = useSearchParams();
  const [salesAmount, setSalesAmount] = useState(searchParams.get("salesAmount") ?? "50000");
  const [commissionRate, setCommissionRate] = useState(searchParams.get("rate") ?? "5");

  const numSalesAmount = parseNumericInput(salesAmount);
  const numCommissionRate = parseNumericInput(commissionRate);

  const isValid = numSalesAmount > 0 && numCommissionRate >= 0;
  const { commission, netAfterCommission } = isValid
    ? calculateCommission(numSalesAmount, numCommissionRate)
    : { commission: 0, netAfterCommission: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Sales Amount", value: numSalesAmount, formatted: formatNumber(numSalesAmount) },
        { label: "Commission Rate", value: numCommissionRate, formatted: `${numCommissionRate}%` },
        { label: "Commission Earned", value: commission, formatted: formatNumber(commission), highlight: true },
        { label: "Net After Commission", value: netAfterCommission, formatted: formatNumber(netAfterCommission) },
      ]
    : [];

  const formulaUsed = isValid
    ? `${formatNumber(numSalesAmount)} × ${numCommissionRate}% = ${formatNumber(commission)}`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("commission-calculator", { salesAmount, rate: commissionRate })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    const { commission: c, netAfterCommission: net } = calculateCommission(numSalesAmount, numCommissionRate);
    addHistoryEntry({
      calculator: "commission-calculator",
      title: "Commission",
      summary: `${formatNumber(numSalesAmount)} @ ${commissionRate}% → ${formatNumber(c)} commission (${formatNumber(net)} net)`,
      url: shareUrl ?? "/commission-calculator",
    });
  }, [numSalesAmount, numCommissionRate, isValid, commissionRate, shareUrl]);

  function handlePreset(presetRate: number) {
    setCommissionRate(String(presetRate));
  }

  function handleReset() {
    setSalesAmount("50000");
    setCommissionRate("5");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="commission-sales">Sales Amount</Label>
            <Input
              id="commission-sales"
              type="text"
              inputMode="decimal"
              value={salesAmount}
              onChange={(e) => setSalesAmount(e.target.value)}
              placeholder="Enter total sales amount"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="commission-rate">Commission Rate (%)</Label>
            <Input
              id="commission-rate"
              type="text"
              inputMode="decimal"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              placeholder="e.g. 5"
              className="mt-1 tabular-nums"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {RATE_PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handlePreset(r)}
                  className={`min-h-[36px] min-w-[44px] rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    parseFloat(commissionRate) === r
                      ? "border-primary bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Commission Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">How commissions work</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A commission is a percentage of the sale amount paid to a salesperson, agent, or
              intermediary. At {commissionRate}%, a {formatNumber(numSalesAmount)} sale generates{" "}
              {formatNumber(commission)} in commission, leaving {formatNumber(netAfterCommission)} net.
              Commission rates vary widely — real estate agents typically earn 5–6%, SaaS sales reps
              8–12%, and affiliate marketers 5–30%. Always clarify whether commission is calculated on
              revenue or gross profit.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
