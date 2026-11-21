"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { CurrencyToggle } from "@/components/calculator/currency-toggle";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { formatMoney } from "@/lib/currency/currency";
import { useCurrency } from "@/lib/currency/use-currency";
import { calculateMarketplaceSale, type FeeBase } from "@/lib/utils/marketplace-net";
import { getPlatformFee, platformFees } from "@/data/platform-fees";
import type { CalculatorResult } from "@/lib/calculators/types";

const CUSTOM = "custom";
const DEFAULT_PRESET = "etsy-uk";

const FEE_FIELDS = ["platformPercent", "platformFixed", "paymentPercent", "paymentFixed"] as const;

function presetValues(id: string) {
  const p = getPlatformFee(id);
  if (!p) return null;
  return {
    platformPercent: String(p.percentFee),
    platformFixed: String(p.fixedFee),
    paymentPercent: String(p.paymentPercentFee),
    paymentFixed: String(p.paymentFixedFee),
    platformBase: p.feeAppliesTo as FeeBase,
    paymentBase: p.paymentFeeAppliesTo as FeeBase,
  };
}

const initialPreset = presetValues(DEFAULT_PRESET);

const INITIAL_FIELDS: Record<string, string> = {
  itemPrice: "20",
  buyerShipping: "0",
  vatRate: "20",
  productCost: "8",
  sellerShipping: "3.5",
  otherCost: "0",
  platformPercent: initialPreset?.platformPercent ?? "0",
  platformFixed: initialPreset?.platformFixed ?? "0",
  paymentPercent: initialPreset?.paymentPercent ?? "0",
  paymentFixed: initialPreset?.paymentFixed ?? "0",
  monthlySales: "100",
  monthlyFixedCosts: "150",
};

export function MarketplaceProfitCalculatorUi() {
  const { symbol } = useCurrency();
  const money = (v: number) => formatMoney(v, symbol, formatNumber(v));

  const [fields, setFields] = useState<Record<string, string>>(INITIAL_FIELDS);
  const [preset, setPreset] = useState<string>(DEFAULT_PRESET);
  const [platformBase, setPlatformBase] = useState<FeeBase>(initialPreset?.platformBase ?? "gross");
  const [paymentBase, setPaymentBase] = useState<FeeBase>(initialPreset?.paymentBase ?? "gross");

  const presetInfo = getPlatformFee(preset);

  function setField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if ((FEE_FIELDS as readonly string[]).includes(key)) setPreset(CUSTOM);
  }

  function applyPreset(id: string) {
    setPreset(id);
    const values = presetValues(id);
    if (!values) return;
    setFields((prev) => ({
      ...prev,
      platformPercent: values.platformPercent,
      platformFixed: values.platformFixed,
      paymentPercent: values.paymentPercent,
      paymentFixed: values.paymentFixed,
    }));
    setPlatformBase(values.platformBase);
    setPaymentBase(values.paymentBase);
  }

  function handleReset() {
    setFields(INITIAL_FIELDS);
    applyPreset(DEFAULT_PRESET);
  }

  const n = (key: string) => parseNumericInput(fields[key] ?? "0");

  const result = calculateMarketplaceSale({
    itemPrice: n("itemPrice"),
    buyerShipping: n("buyerShipping"),
    vatRatePercent: n("vatRate"),
    productCost: n("productCost"),
    sellerShipping: n("sellerShipping"),
    otherCost: n("otherCost"),
    platformPercent: n("platformPercent"),
    platformFixed: n("platformFixed"),
    platformFeeBase: platformBase,
    paymentPercent: n("paymentPercent"),
    paymentFixed: n("paymentFixed"),
    paymentFeeBase: paymentBase,
    monthlySales: n("monthlySales"),
    monthlyFixedCosts: n("monthlyFixedCosts"),
  });

  let results: CalculatorResult[] = [];
  let formulaUsed = "";
  if (result.ok) {
    const breakEvenText =
      result.breakEvenSalesPerMonth === null
        ? "Not possible at this price"
        : result.breakEvenSalesPerMonth === 0
          ? "No fixed costs"
          : `${formatNumber(result.breakEvenSalesPerMonth)} sales`;

    results = [
      { label: "Customer pays", value: result.customerPays, formatted: money(result.customerPays) },
      { label: "VAT to pass on to HMRC or tax office", value: result.vatAmount, formatted: money(result.vatAmount) },
      { label: "Platform fees", value: result.platformFee, formatted: money(result.platformFee) },
      { label: "Payment fees", value: result.paymentFee, formatted: money(result.paymentFee) },
      { label: "Your costs per sale", value: result.costs, formatted: money(result.costs) },
      { label: "Profit per sale", value: result.profitPerSale, formatted: money(result.profitPerSale), highlight: true },
      { label: "Margin per sale", value: result.marginPercent, formatted: `${formatNumber(result.marginPercent)}%` },
      { label: "Break-even sales per month", value: result.breakEvenSalesPerMonth ?? 0, formatted: breakEvenText },
      { label: "Profit per month", value: result.monthlyProfit, formatted: money(result.monthlyProfit), highlight: true },
    ];
    formulaUsed = `Profit per sale = ${money(result.netRevenue)} − ${money(result.totalFees)} fees − ${money(result.costs)} costs = ${money(result.profitPerSale)}`;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="mp-preset">Platform</Label>
            <select
              id="mp-preset"
              value={preset}
              onChange={(e) => applyPreset(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {platformFees.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
              <option value={CUSTOM}>Custom fees</option>
            </select>
            {presetInfo && preset !== CUSTOM ? (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{presetInfo.notes}</p>
            ) : (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Enter the fees from your platform&apos;s fee page. Fees are charged on the buyer&apos;s total
                (VAT included) or on the net price, as the platform states.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="mp-item">Item price, excl. VAT ({symbol})</Label>
              <Input id="mp-item" inputMode="decimal" value={fields.itemPrice} onChange={(e) => setField("itemPrice", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-buyer-ship">Postage charged to buyer ({symbol})</Label>
              <Input id="mp-buyer-ship" inputMode="decimal" value={fields.buyerShipping} onChange={(e) => setField("buyerShipping", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-vat">VAT rate (%)</Label>
              <Input id="mp-vat" inputMode="decimal" value={fields.vatRate} onChange={(e) => setField("vatRate", e.target.value)} className="mt-1 tabular-nums" />
              <p className="mt-1 text-xs text-muted-foreground">Enter 0 if you are not VAT-registered.</p>
            </div>
            <div>
              <Label htmlFor="mp-cost">Product cost ({symbol})</Label>
              <Input id="mp-cost" inputMode="decimal" value={fields.productCost} onChange={(e) => setField("productCost", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-seller-ship">Postage you pay ({symbol})</Label>
              <Input id="mp-seller-ship" inputMode="decimal" value={fields.sellerShipping} onChange={(e) => setField("sellerShipping", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-other">Packaging and other per-sale costs ({symbol})</Label>
              <Input id="mp-other" inputMode="decimal" value={fields.otherCost} onChange={(e) => setField("otherCost", e.target.value)} className="mt-1 tabular-nums" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="mp-pf">Platform fee (%)</Label>
              <Input id="mp-pf" inputMode="decimal" value={fields.platformPercent} onChange={(e) => setField("platformPercent", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-pff">Platform fixed fee ({symbol})</Label>
              <Input id="mp-pff" inputMode="decimal" value={fields.platformFixed} onChange={(e) => setField("platformFixed", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-platbase">Platform fee applies to</Label>
              <select id="mp-platbase" value={platformBase} onChange={(e) => { setPlatformBase(e.target.value as FeeBase); setPreset(CUSTOM); }} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="gross">Buyer total (incl. VAT)</option>
                <option value="net">Price excl. VAT</option>
              </select>
            </div>
            <div>
              <Label htmlFor="mp-pay">Payment fee (%)</Label>
              <Input id="mp-pay" inputMode="decimal" value={fields.paymentPercent} onChange={(e) => setField("paymentPercent", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-payfix">Payment fixed fee ({symbol})</Label>
              <Input id="mp-payfix" inputMode="decimal" value={fields.paymentFixed} onChange={(e) => setField("paymentFixed", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-paybase">Payment fee applies to</Label>
              <select id="mp-paybase" value={paymentBase} onChange={(e) => { setPaymentBase(e.target.value as FeeBase); setPreset(CUSTOM); }} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="gross">Buyer total (incl. VAT)</option>
                <option value="net">Price excl. VAT</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="mp-monthly">Sales per month</Label>
              <Input id="mp-monthly" inputMode="decimal" value={fields.monthlySales} onChange={(e) => setField("monthlySales", e.target.value)} className="mt-1 tabular-nums" />
            </div>
            <div>
              <Label htmlFor="mp-fixed">Fixed costs per month ({symbol})</Label>
              <Input id="mp-fixed" inputMode="decimal" value={fields.monthlyFixedCosts} onChange={(e) => setField("monthlyFixedCosts", e.target.value)} className="mt-1 tabular-nums" />
              <p className="mt-1 text-xs text-muted-foreground">Ads, software, subscriptions. Not per sale.</p>
            </div>
          </div>

          <button type="button" onClick={handleReset} className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground underline-offset-4 hover:underline">
            Reset
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <CurrencyToggle />
        </div>
        {result.ok ? (
          <ResultCard results={results} formulaUsed={formulaUsed} title="Profit per sale" />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{result.message}</p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent className="pt-5">
            <h2 className="mb-2 text-sm font-semibold">Which fees are included</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The presets cover the percentage and per-order fees on each platform&apos;s UK fee page, as checked on
              21 October 2026. They do not include monthly subscriptions, listing fees or advertising, unless you add
              them under fixed costs. US fees are not preset yet. Enter them under Custom fees.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Related:{" "}
              <Link href="/price-builder" className="underline underline-offset-4 hover:text-foreground">
                Price Builder
              </Link>
              {" · "}
              <Link href="/commission-calculator" className="underline underline-offset-4 hover:text-foreground">
                Commission Calculator
              </Link>
              {" · "}
              <Link href="/profit-calculator" className="underline underline-offset-4 hover:text-foreground">
                Profit Calculator
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
