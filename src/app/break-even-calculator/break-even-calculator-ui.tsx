"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { BreakEvenChart } from "./break-even-chart";
import { calculateBreakeven } from "@/lib/utils/math";
import { formatNumber, formatInteger, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function BreakEvenCalculatorUi() {
  const searchParams = useSearchParams();
  const [fixedCosts, setFixedCosts] = useState(searchParams.get("fixed") ?? "10000");
  const [variableCost, setVariableCost] = useState(searchParams.get("variable") ?? "25");
  const [sellingPrice, setSellingPrice] = useState(searchParams.get("price") ?? "50");

  const numFixed = parseNumericInput(fixedCosts);
  const numVariable = parseNumericInput(variableCost);
  const numSelling = parseNumericInput(sellingPrice);

  const contributionMargin = numSelling - numVariable;
  const isValid = numFixed > 0 && numSelling > 0;
  const isPossible = contributionMargin > 0;

  const { breakEvenUnits, breakEvenRevenue } = isValid && isPossible
    ? calculateBreakeven(numFixed, numVariable, numSelling)
    : { breakEvenUnits: 0, breakEvenRevenue: 0 };

  const results: CalculatorResult[] = [];
  let formulaUsed = "";

  if (isValid && isPossible) {
    results.push(
      { label: "Fixed Costs", value: numFixed, formatted: formatNumber(numFixed) },
      { label: "Contribution Margin / Unit", value: contributionMargin, formatted: formatNumber(contributionMargin) },
      { label: "Break-even Units", value: breakEvenUnits, formatted: formatInteger(breakEvenUnits), highlight: true },
      { label: "Break-even Revenue", value: breakEvenRevenue, formatted: formatNumber(breakEvenRevenue), highlight: true },
    );
    formulaUsed = `${formatNumber(numFixed)} ÷ (${formatNumber(numSelling)} − ${formatNumber(numVariable)}) = ${formatInteger(breakEvenUnits)} units`;
  } else if (isValid && !isPossible) {
    results.push(
      { label: "Fixed Costs", value: numFixed, formatted: formatNumber(numFixed) },
      { label: "Contribution Margin / Unit", value: contributionMargin, formatted: formatNumber(contributionMargin) },
      { label: "Break-even", value: 0, formatted: "Not possible", highlight: true },
    );
    formulaUsed = "Selling price must exceed variable cost per unit";
  }

  const shareUrl = isValid && isPossible
    ? buildShareUrl("break-even-calculator", { fixed: fixedCosts, variable: variableCost, price: sellingPrice })
    : undefined;

  useEffect(() => {
    if (!isValid || !isPossible) return;
    addHistoryEntry({
      calculator: "break-even-calculator",
      title: "Break-even",
      summary: `Fixed ${formatNumber(numFixed)} → ${formatInteger(breakEvenUnits)} units (${formatNumber(breakEvenRevenue)})`,
      url: shareUrl ?? "/break-even-calculator",
    });
  }, [numFixed, numVariable, numSelling, isValid, isPossible, breakEvenUnits, breakEvenRevenue, shareUrl]);

  function handleReset() {
    setFixedCosts("10000");
    setVariableCost("25");
    setSellingPrice("50");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-5 pt-6">
            <div>
              <Label htmlFor="be-fixed">Fixed Costs</Label>
              <Input
                id="be-fixed"
                type="text"
                inputMode="decimal"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
                placeholder="e.g. 10000"
                className="mt-1 text-lg tabular-nums"
              />
              <p className="mt-1 text-xs text-muted-foreground">Rent, salaries, insurance, etc.</p>
            </div>

            <div>
              <Label htmlFor="be-variable">Variable Cost per Unit</Label>
              <Input
                id="be-variable"
                type="text"
                inputMode="decimal"
                value={variableCost}
                onChange={(e) => setVariableCost(e.target.value)}
                placeholder="e.g. 25"
                className="mt-1 text-lg tabular-nums"
              />
              <p className="mt-1 text-xs text-muted-foreground">Materials, packaging, shipping per unit.</p>
            </div>

            <div>
              <Label htmlFor="be-selling">Selling Price per Unit</Label>
              <Input
                id="be-selling"
                type="text"
                inputMode="decimal"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g. 50"
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
          <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Break-even Analysis" />
          <Card className="bg-muted/30">
            <CardContent className="pt-5">
              <h3 className="mb-2 text-sm font-semibold">Understanding break-even</h3>
              {isPossible && isValid ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each unit sold at {formatNumber(numSelling)} with a variable cost of{" "}
                  {formatNumber(numVariable)} contributes {formatNumber(contributionMargin)} toward
                  covering your {formatNumber(numFixed)} in fixed costs. You need to sell{" "}
                  {formatInteger(breakEvenUnits)} units ({formatNumber(breakEvenRevenue)} in revenue) before
                  every additional sale becomes pure profit.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Break-even requires that each unit sold contributes positively toward covering fixed
                  costs. This means the selling price per unit must be higher than the variable cost
                  per unit. If it is not, you lose money on every sale regardless of volume.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isValid && isPossible && (
        <BreakEvenChart
          fixedCosts={numFixed}
          variableCost={numVariable}
          sellingPrice={numSelling}
          breakEvenUnits={breakEvenUnits}
        />
      )}
    </div>
  );
}
