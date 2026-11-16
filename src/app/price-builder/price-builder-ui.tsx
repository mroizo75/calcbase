"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { PriceWaterfall } from "@/components/calculator/price-waterfall";
import { VAT_PRESETS } from "@/lib/calculators/registry";
import { getPlatformFee, platformFees } from "@/data/platform-fees";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import {
  breakdownAtPrice,
  priceWarnings,
  solvePriceForMargin,
  type FeeBase,
  type PriceBuilderInput,
  type PriceResult,
} from "@/lib/utils/price-builder";
import { buildShareUrl } from "@/lib/utils/urls";

type Mode = "charge" | "check";

interface Scenario {
  id: string;
  name: string;
  mode: Mode;
  unitCost: string;
  shipping: string;
  other: string;
  presetId: string;
  platformPercent: string;
  platformFixed: string;
  platformFeeAppliesTo: FeeBase;
  paymentPercent: string;
  paymentFixed: string;
  paymentFeeAppliesTo: FeeBase;
  vatRegistered: boolean;
  vatLabel: string;
  vatRate: string;
  targetMargin: string;
  sellingPrice: string;
  discount: string;
}

function createId(): string {
  return crypto.randomUUID();
}

function feeBase(value: string | null): FeeBase {
  return value === "net" ? "net" : "gross";
}

function blankScenario(name = "Base", id = "base"): Scenario {
  const etsy = getPlatformFee("etsy-uk");
  return {
    id,
    name,
    mode: "charge",
    unitCost: "8",
    shipping: "3.50",
    other: "0",
    presetId: etsy?.id ?? "custom",
    platformPercent: String(etsy?.percentFee ?? 0),
    platformFixed: String(etsy?.fixedFee ?? 0),
    platformFeeAppliesTo: etsy?.feeAppliesTo ?? "gross",
    paymentPercent: String(etsy?.paymentPercentFee ?? 0),
    paymentFixed: String(etsy?.paymentFixedFee ?? 0),
    paymentFeeAppliesTo: etsy?.paymentFeeAppliesTo ?? "gross",
    vatRegistered: true,
    vatLabel: "UK Standard (20%)",
    vatRate: "20",
    targetMargin: "35",
    sellingPrice: "22.57",
    discount: "0",
  };
}

function isMode(value: unknown): value is Mode {
  return value === "charge" || value === "check";
}

function readScenarios(params: URLSearchParams): Scenario[] {
  const raw = params.get("s");
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const rows = parsed.slice(0, 3).flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const row = item as Partial<Scenario>;
          if (!isMode(row.mode) || typeof row.unitCost !== "string") return [];
          return [{ ...blankScenario(row.name || "Scenario"), ...row, id: createId() }];
        });
        if (rows.length > 0) return rows;
      }
    } catch {
      /* Flat query params below still apply. */
    }
  }

  const scenario = blankScenario();
  const cost = params.get("cost");
  const price = params.get("price");
  const margin = params.get("margin");
  const discount = params.get("discount");
  const vat = params.get("vat");
  const mode = params.get("mode");
  if (cost) scenario.unitCost = cost;
  if (price) scenario.sellingPrice = price;
  if (margin) scenario.targetMargin = margin;
  if (discount) scenario.discount = discount;
  if (vat) scenario.vatRate = vat;
  if (params.get("registered") === "0") scenario.vatRegistered = false;
  if (isMode(mode)) scenario.mode = mode;
  else if (price && !margin) scenario.mode = "check";
  else if (margin) scenario.mode = "charge";
  return [scenario];
}

function toInput(scenario: Scenario): PriceBuilderInput {
  return {
    unitCost: parseNumericInput(scenario.unitCost),
    shippingPerUnit: parseNumericInput(scenario.shipping),
    otherPerUnit: parseNumericInput(scenario.other),
    platformPercent: parseNumericInput(scenario.platformPercent),
    platformFixed: parseNumericInput(scenario.platformFixed),
    platformFeeAppliesTo: scenario.platformFeeAppliesTo,
    paymentPercent: parseNumericInput(scenario.paymentPercent),
    paymentFixed: parseNumericInput(scenario.paymentFixed),
    paymentFeeAppliesTo: scenario.paymentFeeAppliesTo,
    vatRegistered: scenario.vatRegistered,
    vatRatePercent: parseNumericInput(scenario.vatRate),
    discountPercent: parseNumericInput(scenario.discount),
    targetMarginPercent: parseNumericInput(scenario.targetMargin),
  };
}

function evaluate(scenario: Scenario): PriceResult {
  const input = toInput(scenario);
  if (scenario.mode === "check") return breakdownAtPrice(input, parseNumericInput(scenario.sellingPrice));
  return solvePriceForMargin(input);
}

function verifiedOn(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function subscribeToSearch(onChange: () => void): () => void {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export function PriceBuilderUi() {
  const query = useSyncExternalStore(subscribeToSearch, () => window.location.search, () => "");
  const fromUrl = useMemo(
    () => (query === "" ? null : readScenarios(new URLSearchParams(query))),
    [query],
  );
  const [edited, setEdited] = useState<Scenario[] | null>(null);
  const scenarios = edited ?? fromUrl ?? [blankScenario()];

  function update(id: string, patch: Partial<Scenario>) {
    setEdited(scenarios.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function applyPreset(id: string, presetId: string) {
    const preset = getPlatformFee(presetId);
    if (!preset) {
      update(id, { presetId: "custom" });
      return;
    }
    update(id, {
      presetId,
      platformPercent: String(preset.percentFee),
      platformFixed: String(preset.fixedFee),
      platformFeeAppliesTo: preset.feeAppliesTo,
      paymentPercent: String(preset.paymentPercentFee),
      paymentFixed: String(preset.paymentFixedFee),
      paymentFeeAppliesTo: preset.paymentFeeAppliesTo,
    });
  }

  const evaluated = scenarios.map((scenario) => ({ scenario, result: evaluate(scenario) }));
  const shareUrl = buildShareUrl("price-builder", { s: JSON.stringify(scenarios) });
  const cardResults: CalculatorResult[] = evaluated.flatMap(({ scenario, result }) => {
    if (!result.ok) return [];
    const prefix = scenarios.length > 1 ? `${scenario.name}: ` : "";
    return [
      { label: `${prefix}Customer pays`, value: result.customerPays, formatted: `£${formatNumber(result.customerPays)}`, highlight: true },
      { label: `${prefix}Price ex VAT`, value: result.listNet, formatted: `£${formatNumber(result.listNet)}` },
      { label: `${prefix}Profit`, value: result.profit, formatted: `£${formatNumber(result.profit)}` },
      { label: `${prefix}Margin`, value: result.marginPercent, formatted: `${result.marginPercent}%` },
    ];
  });

  const first = evaluated[0];
  const historySummary = first?.result.ok
    ? `${first.scenario.name} → £${formatNumber(first.result.customerPays)} at ${first.result.marginPercent}% margin`
    : "";

  useEffect(() => {
    if (!historySummary) return;
    if (window.location.search !== "" && edited === null && fromUrl === null) return;
    addHistoryEntry({
      calculator: "price-builder",
      title: "Price Builder",
      summary: historySummary,
      url: shareUrl,
    });
  }, [historySummary, shareUrl, edited, fromUrl]);

  return (
    <div className="space-y-4">
      <ResultCard
        results={cardResults}
        shareUrl={shareUrl}
        title="Price Builder"
        emphasizeExport
        formulaUsed="Net price = (costs + fixed fees) ÷ (1 − margin − fees on the net price)"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {evaluated.map(({ scenario, result }) => {
          const preset = getPlatformFee(scenario.presetId);
          const warnings = priceWarnings(toInput(scenario), result, scenario.mode);
          return (
            <Card key={scenario.id}>
              <CardContent className="space-y-4 pt-5">
                <div className="flex items-center justify-between gap-2">
                  <Input
                    aria-label="Scenario name"
                    value={scenario.name}
                    onChange={(event) => update(scenario.id, { name: event.target.value.slice(0, 40) })}
                    className="font-medium"
                  />
                  {scenarios.length > 1 ? (
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                      onClick={() => setEdited(scenarios.filter((row) => row.id !== scenario.id))}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
                  {([
                    ["charge", "What should I charge?"],
                    ["check", "What do I make?"],
                  ] as const).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => update(scenario.id, { mode })}
                      className={`rounded-md px-2 py-2 text-xs font-medium ${
                        scenario.mode === mode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Costs</legend>
                  <Field id={`${scenario.id}-cost`} label="Unit cost" value={scenario.unitCost} onChange={(unitCost) => update(scenario.id, { unitCost })} />
                  <Field id={`${scenario.id}-ship`} label="Shipping / packaging" value={scenario.shipping} onChange={(shipping) => update(scenario.id, { shipping })} />
                  <Field id={`${scenario.id}-other`} label="Other per-unit costs" value={scenario.other} onChange={(other) => update(scenario.id, { other })} />
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Platform and payments</legend>
                  <div>
                    <Label htmlFor={`${scenario.id}-preset`}>Preset</Label>
                    <select
                      id={`${scenario.id}-preset`}
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={scenario.presetId}
                      onChange={(event) => applyPreset(scenario.id, event.target.value)}
                    >
                      <option value="custom">Custom</option>
                      {platformFees.map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                  {preset ? (
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <p>
                        Fees last verified {verifiedOn(preset.lastVerified)} —{" "}
                        <a href={preset.sourceUrl} className="underline underline-offset-4" target="_blank" rel="noreferrer">
                          check the source
                        </a>
                        .
                      </p>
                      <p className="mt-1">{preset.notes}</p>
                    </div>
                  ) : null}
                  <Field
                    id={`${scenario.id}-pp`}
                    label="Platform fee %"
                    value={scenario.platformPercent}
                    onChange={(platformPercent) => update(scenario.id, { platformPercent, presetId: "custom" })}
                  />
                  <Field
                    id={`${scenario.id}-pf`}
                    label="Platform fixed fee"
                    value={scenario.platformFixed}
                    onChange={(platformFixed) => update(scenario.id, { platformFixed, presetId: "custom" })}
                  />
                  <FeeBaseSelect
                    id={`${scenario.id}-pb`}
                    label="Platform fee is charged on"
                    value={scenario.platformFeeAppliesTo}
                    onChange={(platformFeeAppliesTo) => update(scenario.id, { platformFeeAppliesTo, presetId: "custom" })}
                  />
                  <Field
                    id={`${scenario.id}-yp`}
                    label="Payment fee %"
                    value={scenario.paymentPercent}
                    onChange={(paymentPercent) => update(scenario.id, { paymentPercent, presetId: "custom" })}
                  />
                  <Field
                    id={`${scenario.id}-yf`}
                    label="Payment fixed fee"
                    value={scenario.paymentFixed}
                    onChange={(paymentFixed) => update(scenario.id, { paymentFixed, presetId: "custom" })}
                  />
                  <FeeBaseSelect
                    id={`${scenario.id}-yb`}
                    label="Payment fee is charged on"
                    value={scenario.paymentFeeAppliesTo}
                    onChange={(paymentFeeAppliesTo) => update(scenario.id, { paymentFeeAppliesTo, presetId: "custom" })}
                  />
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">VAT</legend>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={scenario.vatRegistered}
                      onChange={(event) => update(scenario.id, { vatRegistered: event.target.checked })}
                    />
                    VAT-registered
                  </label>
                  <div>
                    <Label htmlFor={`${scenario.id}-vat-preset`}>Country rate</Label>
                    <select
                      id={`${scenario.id}-vat-preset`}
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                      value={scenario.vatLabel}
                      onChange={(event) => {
                        const match = VAT_PRESETS.find((item) => item.label === event.target.value);
                        update(scenario.id, {
                          vatLabel: event.target.value,
                          vatRate: match ? String(match.rate) : scenario.vatRate,
                        });
                      }}
                    >
                      <option value="">Custom rate</option>
                      {VAT_PRESETS.map((item) => (
                        <option key={item.label} value={item.label}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                  <Field
                    id={`${scenario.id}-vat`}
                    label="VAT rate %"
                    value={scenario.vatRate}
                    onChange={(vatRate) => update(scenario.id, { vatRate, vatLabel: "" })}
                  />
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Goal</legend>
                  {scenario.mode === "charge" ? (
                    <Field id={`${scenario.id}-margin`} label="Target margin %" value={scenario.targetMargin} onChange={(targetMargin) => update(scenario.id, { targetMargin })} />
                  ) : (
                    <Field id={`${scenario.id}-price`} label="Your price excluding VAT" value={scenario.sellingPrice} onChange={(sellingPrice) => update(scenario.id, { sellingPrice })} />
                  )}
                  <Field id={`${scenario.id}-discount`} label="Discount % to test" value={scenario.discount} onChange={(discount) => update(scenario.id, { discount })} />
                </fieldset>

                {result.ok ? (
                  <div className="space-y-2 border-t pt-4">
                    <p className="text-2xl font-semibold tabular-nums">£{formatNumber(result.customerPays)}</p>
                    <p className="text-sm text-muted-foreground">
                      {parseNumericInput(scenario.discount) > 0
                        ? `Customer pays this after a ${scenario.discount}% discount. The listed price excluding VAT is £${formatNumber(result.listNet)}.`
                        : "Customer pays this."}{" "}
                      Margin {result.marginPercent}%
                      {result.markupPercent === null ? "" : `, markup ${result.markupPercent}%`}.
                    </p>
                    <PriceWaterfall lines={result.lines} />
                  </div>
                ) : (
                  <p className="border-t pt-4 text-sm text-destructive" role="alert">{result.message}</p>
                )}

                {warnings.length > 0 ? (
                  <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {warnings.map((warning) => (
                      <li key={warning.id}>{warning.message}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {scenarios.length < 3 ? (
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-lg border border-border bg-transparent px-4 text-sm font-medium text-foreground"
          onClick={() => {
            setEdited(() => {
              const rows = scenarios;
              const source = rows[rows.length - 1] ?? blankScenario();
              const next: Scenario = {
                ...source,
                id: createId(),
                name: rows.length === 1 ? "15% discount" : "Shopify Payments",
              };
              if (rows.length === 1) next.discount = "15";
              if (rows.length >= 2) {
                next.discount = rows[0]?.discount ?? "0";
                const shopify = getPlatformFee("shopify-payments-uk-basic");
                if (shopify) {
                  next.presetId = shopify.id;
                  next.platformPercent = String(shopify.percentFee);
                  next.platformFixed = String(shopify.fixedFee);
                  next.platformFeeAppliesTo = shopify.feeAppliesTo;
                  next.paymentPercent = String(shopify.paymentPercentFee);
                  next.paymentFixed = String(shopify.paymentFixedFee);
                  next.paymentFeeAppliesTo = shopify.paymentFeeAppliesTo;
                }
              }
              return [...rows, next];
            });
          }}
        >
          Add scenario
        </button>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 tabular-nums" />
    </div>
  );
}

function FeeBaseSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: FeeBase;
  onChange: (value: FeeBase) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(feeBase(event.target.value))}
      >
        <option value="gross">Price including VAT</option>
        <option value="net">Price excluding VAT</option>
      </select>
    </div>
  );
}
