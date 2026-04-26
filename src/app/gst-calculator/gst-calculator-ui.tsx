"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { addVat, removeVat } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

type GstMode = "add" | "remove";

interface GstPreset {
  country: string;
  rate: number;
  label: string;
}

const GST_PRESETS: GstPreset[] = [
  { country: "Australia", rate: 10, label: "Australia GST (10%)" },
  { country: "New Zealand", rate: 15, label: "New Zealand GST (15%)" },
  { country: "Canada", rate: 5, label: "Canada GST (5%)" },
  { country: "India", rate: 18, label: "India GST (18%)" },
  { country: "Singapore", rate: 9, label: "Singapore GST (9%)" },
  { country: "Malaysia", rate: 10, label: "Malaysia SST (10%)" },
  { country: "South Africa", rate: 15, label: "South Africa VAT (15%)" },
  { country: "Custom", rate: 0, label: "Custom rate" },
];

export function GstCalculatorUi() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<GstMode>((searchParams.get("mode") as GstMode) ?? "add");
  const [amount, setAmount] = useState(searchParams.get("amount") ?? "1000");
  const [rate, setRate] = useState(searchParams.get("rate") ?? "10");
  const [selectedPreset, setSelectedPreset] = useState("Australia");

  const numAmount = parseNumericInput(amount);
  const numRate = parseNumericInput(rate);
  const isValid = numAmount > 0 && numRate > 0;

  const addResult = isValid && mode === "add" ? addVat(numAmount, numRate) : null;
  const removeResult = isValid && mode === "remove" ? removeVat(numAmount, numRate) : null;

  const results: CalculatorResult[] = addResult
    ? [
        { label: "Net Amount (ex-GST)", value: numAmount, formatted: formatNumber(numAmount) },
        { label: "GST Rate", value: numRate, formatted: `${numRate}%` },
        { label: "GST Amount", value: addResult.vatAmount, formatted: formatNumber(addResult.vatAmount) },
        { label: "Total inc. GST", value: addResult.gross, formatted: formatNumber(addResult.gross), highlight: true },
      ]
    : removeResult
    ? [
        { label: "GST-inclusive Price", value: numAmount, formatted: formatNumber(numAmount) },
        { label: "GST Rate", value: numRate, formatted: `${numRate}%` },
        { label: "GST Amount", value: removeResult.vatAmount, formatted: formatNumber(removeResult.vatAmount) },
        { label: "Net Amount (ex-GST)", value: removeResult.net, formatted: formatNumber(removeResult.net), highlight: true },
      ]
    : [];

  const formulaUsed = addResult
    ? `${formatNumber(numAmount)} × (1 + ${numRate}/100) = ${formatNumber(addResult.gross)}`
    : removeResult
    ? `${formatNumber(numAmount)} ÷ (1 + ${numRate}/100) = ${formatNumber(removeResult.net)}`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("gst-calculator", { mode, amount, rate })
    : undefined;

  const insightGross = addResult ? addResult.gross : 0;
  const insightNet = removeResult ? removeResult.net : 0;
  const insightGstAdd = addResult ? addResult.vatAmount : 0;
  const insightGstRemove = removeResult ? removeResult.vatAmount : 0;

  useEffect(() => {
    if (!isValid) return;
    const resultValue = addResult ? addResult.gross : removeResult ? removeResult.net : 0;
    if (!resultValue) return;
    addHistoryEntry({
      calculator: "gst-calculator",
      title: `GST ${mode === "add" ? "Added" : "Removed"}`,
      summary: `${formatNumber(numAmount)} at ${numRate}% → ${formatNumber(resultValue)}`,
      url: shareUrl ?? "/gst-calculator",
    });
  }, [numAmount, numRate, mode, isValid, shareUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  function handlePreset(preset: GstPreset) {
    setSelectedPreset(preset.country);
    if (preset.country !== "Custom") setRate(String(preset.rate));
  }

  function handleReset() {
    setAmount("1000");
    setRate("10");
    setSelectedPreset("Australia");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div className="flex gap-2 rounded-lg border p-1">
            {(["add", "remove"] as GstMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "add" ? "Add GST" : "Remove GST"}
              </button>
            ))}
          </div>

          <div>
            <Label htmlFor="gst-amount">
              {mode === "add" ? "Net Amount (ex-GST)" : "GST-inclusive Amount"}
            </Label>
            <Input
              id="gst-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label className="mb-2 block">Country / GST Rate</Label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {GST_PRESETS.map((preset) => (
                <button
                  key={preset.country}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedPreset === preset.country
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {preset.country === "Custom" ? "Custom" : `${preset.country} ${preset.rate}%`}
                </button>
              ))}
            </div>
            <Input
              id="gst-rate"
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
                setSelectedPreset("Custom");
              }}
              placeholder="Enter GST rate %"
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
        <ResultCard
          results={results}
          formulaUsed={formulaUsed}
          shareUrl={shareUrl}
          title="GST Calculation"
        />
        {isValid && (addResult || removeResult) && (
          <Card className="bg-muted/30">
            <CardContent className="pt-5">
              <h3 className="mb-2 text-sm font-semibold">How GST works</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {addResult
                  ? `Adding ${numRate}% GST to ${formatNumber(numAmount)}: the GST amount is ${formatNumber(insightGstAdd)}, making the total ${formatNumber(insightGross)}. GST is calculated on the net (ex-GST) amount — it is not a percentage of the final price.`
                  : `Removing ${numRate}% GST from ${formatNumber(numAmount)}: divide by ${(1 + numRate / 100).toFixed(2)} to get the ex-GST amount of ${formatNumber(insightNet)}. The GST included is ${formatNumber(insightGstRemove)}.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
