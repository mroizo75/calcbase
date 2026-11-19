"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { CurrencyToggle } from "@/components/calculator/currency-toggle";
import { calculateCommission, calculateSalesNeeded } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { formatMoney } from "@/lib/currency/currency";
import { useCurrency } from "@/lib/currency/use-currency";
import type { CalculatorResult } from "@/lib/calculators/types";

const RATE_PRESETS = [1, 2, 3, 5, 6, 8, 10, 15, 20];

export function ReverseCommissionCalculatorUi() {
  const { symbol } = useCurrency();
  const money = (v: number) => formatMoney(v, symbol, formatNumber(v));
  const [targetCommission, setTargetCommission] = useState("930");
  const [commissionRate, setCommissionRate] = useState("3");

  const numTarget = parseNumericInput(targetCommission);
  const numRate = parseNumericInput(commissionRate);

  const isValid = numTarget > 0 && numRate > 0;
  const { requiredSales } = isValid ? calculateSalesNeeded(numTarget, numRate) : { requiredSales: 0 };
  const checkCommission = isValid ? calculateCommission(requiredSales, numRate).commission : 0;

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Target Commission", value: numTarget, formatted: money(numTarget) },
        { label: "Commission Rate", value: numRate, formatted: `${numRate}%` },
        { label: "Sales Needed", value: requiredSales, formatted: money(requiredSales), highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `${money(numTarget)} ÷ ${numRate}% = ${money(requiredSales)} (check: ${money(checkCommission)} commission)`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("reverse-commission-calculator", { commission: targetCommission, rate: commissionRate })
    : undefined;

  function handleReset() {
    setTargetCommission("930");
    setCommissionRate("3");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="reverse-commission">Commission You Want ({symbol})</Label>
            <Input
              id="reverse-commission"
              type="text"
              inputMode="decimal"
              value={targetCommission}
              onChange={(e) => setTargetCommission(e.target.value)}
              placeholder="e.g. 930"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="reverse-commission-rate">Commission Rate (%)</Label>
            <Input
              id="reverse-commission-rate"
              type="text"
              inputMode="decimal"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              placeholder="e.g. 3"
              className="mt-1 tabular-nums"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {RATE_PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setCommissionRate(String(r))}
                  className={`min-h-[44px] min-w-[44px] rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
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
            className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Reset
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <CurrencyToggle />
        </div>
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Sales Needed" />
        <Card>
          <CardContent className="pt-5">
            <h2 className="mb-2 text-sm font-semibold">Reverse commission examples</h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>{symbol}930 commission at 3% needs {symbol}31,000 in sales</li>
              <li>{symbol}1,200 commission at 10% needs {symbol}12,000 in sales</li>
              <li>{symbol}2,500 commission at 5% needs {symbol}50,000 in sales</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To work it out by hand: divide the commission by the rate as a decimal. Example:
              {" "}{symbol}930 ÷ 0.03 = {symbol}31,000.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Related:{" "}
              <Link href="/commission-calculator" className="underline underline-offset-4 hover:text-foreground">
                Commission Calculator
              </Link>
              {" · "}
              <Link href="/profit-calculator" className="underline underline-offset-4 hover:text-foreground">
                Profit Calculator
              </Link>
              {" · "}
              <Link href="/guides/how-to-calculate-sales-commission" className="underline underline-offset-4 hover:text-foreground">
                How to Calculate Sales Commission
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Why it matters</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A sales target is often set from a commission goal. At {commissionRate}%, earning{" "}
              {money(numTarget)} in commission means selling {money(requiredSales)}. Check the rate and whether
              your plan pays on gross or net sales, because the same commission can need very different sales figures.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
