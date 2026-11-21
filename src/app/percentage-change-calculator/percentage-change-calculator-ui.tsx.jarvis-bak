"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculatePercentageChange, applyPercentageChange } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

type ChangeMode = "find-change" | "apply-change";

const MODES: { id: ChangeMode; label: string; description: string }[] = [
  { id: "find-change", label: "Find % Change", description: "From A to B → what % change?" },
  { id: "apply-change", label: "Apply % Change", description: "Value + % change → new value?" },
];

export function PercentageChangeCalculatorUi() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<ChangeMode>(
    (searchParams.get("mode") as ChangeMode) ?? "find-change",
  );
  const [fromInput, setFromInput] = useState(searchParams.get("from") ?? "80");
  const [toInput, setToInput] = useState(searchParams.get("to") ?? "100");
  const [valueInput, setValueInput] = useState(searchParams.get("value") ?? "42000");
  const [changeInput, setChangeInput] = useState(searchParams.get("change") ?? "8");

  const from = parseNumericInput(fromInput);
  const to = parseNumericInput(toInput);
  const value = parseNumericInput(valueInput);
  const change = parseNumericInput(changeInput);

  let results: CalculatorResult[] = [];
  let formulaUsed = "";
  let shareUrl: string | undefined;
  let isValid = false;
  let insightText = "";

  if (mode === "find-change" && from !== 0) {
    const pctChange = calculatePercentageChange(from, to);
    const isIncrease = pctChange >= 0;
    isValid = true;
    results = [
      { label: "Original Value", value: from, formatted: formatNumber(from) },
      { label: "New Value", value: to, formatted: formatNumber(to) },
      {
        label: isIncrease ? "Percentage Increase" : "Percentage Decrease",
        value: pctChange,
        formatted: `${pctChange >= 0 ? "+" : ""}${pctChange}%`,
        highlight: true,
      },
      { label: "Absolute Change", value: to - from, formatted: formatNumber(to - from) },
    ];
    formulaUsed = `((${formatNumber(to)} − ${formatNumber(from)}) ÷ ${formatNumber(Math.abs(from))}) × 100 = ${pctChange >= 0 ? "+" : ""}${pctChange}%`;
    shareUrl = buildShareUrl("percentage-change-calculator", { mode, from: fromInput, to: toInput });
    insightText = isIncrease
      ? `A change from ${formatNumber(from)} to ${formatNumber(to)} is a ${pctChange}% increase. The value grew by ${formatNumber(to - from)}.`
      : `A change from ${formatNumber(from)} to ${formatNumber(to)} is a ${Math.abs(pctChange)}% decrease. The value fell by ${formatNumber(Math.abs(to - from))}.`;
  } else if (mode === "apply-change" && value !== 0) {
    const newValue = applyPercentageChange(value, change);
    const isIncrease = change >= 0;
    isValid = true;
    results = [
      { label: "Original Value", value: value, formatted: formatNumber(value) },
      { label: "Percentage Change", value: change, formatted: `${change >= 0 ? "+" : ""}${change}%` },
      { label: "New Value", value: newValue, formatted: formatNumber(newValue), highlight: true },
      { label: "Difference", value: newValue - value, formatted: formatNumber(newValue - value) },
    ];
    formulaUsed = `${formatNumber(value)} × (1 ${change >= 0 ? "+" : "−"} ${Math.abs(change)} ÷ 100) = ${formatNumber(newValue)}`;
    shareUrl = buildShareUrl("percentage-change-calculator", { mode, value: valueInput, change: changeInput });
    insightText = isIncrease
      ? `After a ${change}% increase, ${formatNumber(value)} becomes ${formatNumber(newValue)} — a gain of ${formatNumber(newValue - value)}.`
      : `After a ${Math.abs(change)}% decrease, ${formatNumber(value)} becomes ${formatNumber(newValue)} — a reduction of ${formatNumber(Math.abs(newValue - value))}.`;
  }

  useEffect(() => {
    if (!isValid || results.length === 0) return;
    const summary = results.map((r) => `${r.label}: ${r.formatted}`).join(", ");
    addHistoryEntry({
      calculator: "percentage-change-calculator",
      title: "Percentage Change",
      summary,
      url: shareUrl ?? "/percentage-change-calculator",
    });
  }, [isValid, formulaUsed, shareUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleReset() {
    setFromInput("80");
    setToInput("100");
    setValueInput("42000");
    setChangeInput("8");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              mode === m.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            {m.label}
            <span className="ml-1.5 hidden text-xs opacity-70 sm:inline">— {m.description}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-5 pt-6">
            {mode === "find-change" && (
              <>
                <div>
                  <Label htmlFor="pch-from">Original Value (Old)</Label>
                  <Input
                    id="pch-from"
                    type="text"
                    inputMode="decimal"
                    value={fromInput}
                    onChange={(e) => setFromInput(e.target.value)}
                    placeholder="e.g. 80"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
                <div>
                  <Label htmlFor="pch-to">New Value</Label>
                  <Input
                    id="pch-to"
                    type="text"
                    inputMode="decimal"
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                    placeholder="e.g. 100"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
              </>
            )}
            {mode === "apply-change" && (
              <>
                <div>
                  <Label htmlFor="pch-value">Original Value</Label>
                  <Input
                    id="pch-value"
                    type="text"
                    inputMode="decimal"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    placeholder="e.g. 42000"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
                <div>
                  <Label htmlFor="pch-change">
                    Percentage Change (%)
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      use negative for decrease
                    </span>
                  </Label>
                  <Input
                    id="pch-change"
                    type="text"
                    inputMode="decimal"
                    value={changeInput}
                    onChange={(e) => setChangeInput(e.target.value)}
                    placeholder="e.g. 8 or -15"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
              </>
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
          <ResultCard
            results={results}
            formulaUsed={formulaUsed}
            shareUrl={shareUrl}
            title="Percentage Change"
          />
          {isValid && insightText && (
            <Card className="bg-muted/30">
              <CardContent className="pt-5">
                <h3 className="mb-2 text-sm font-semibold">Interpretation</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{insightText}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
