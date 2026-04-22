"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateDiscount } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function DiscountCalculatorUi() {
  const searchParams = useSearchParams();
  const [originalPrice, setOriginalPrice] = useState(searchParams.get("price") ?? "200");
  const [discountPercent, setDiscountPercent] = useState(searchParams.get("discount") ?? "25");

  const numPrice = parseNumericInput(originalPrice);
  const numDiscount = parseNumericInput(discountPercent);

  const isValid = numPrice > 0 && numDiscount >= 0 && numDiscount <= 100;
  const { discountAmount, finalPrice } = isValid
    ? calculateDiscount(numPrice, numDiscount)
    : { discountAmount: 0, finalPrice: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Original Price", value: numPrice, formatted: formatNumber(numPrice) },
        { label: "Discount", value: numDiscount, formatted: `${numDiscount}%` },
        { label: "You Save", value: discountAmount, formatted: formatNumber(discountAmount) },
        { label: "Final Price", value: finalPrice, formatted: formatNumber(finalPrice), highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `${formatNumber(numPrice)} × ${numDiscount}% = ${formatNumber(discountAmount)} off → ${formatNumber(finalPrice)}`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("discount-calculator", { price: originalPrice, discount: discountPercent })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    addHistoryEntry({
      calculator: "discount-calculator",
      title: "Discount",
      summary: `${formatNumber(numPrice)} − ${numDiscount}% → ${formatNumber(finalPrice)}`,
      url: shareUrl ?? "/discount-calculator",
    });
  }, [numPrice, numDiscount, isValid, finalPrice, shareUrl]);

  function handleReset() {
    setOriginalPrice("200");
    setDiscountPercent("25");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="discount-price">Original Price</Label>
            <Input
              id="discount-price"
              type="text"
              inputMode="decimal"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="discount-percent">Discount (%)</Label>
            <Input
              id="discount-percent"
              type="text"
              inputMode="decimal"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="e.g. 25"
              className="mt-1 text-lg tabular-nums"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[5, 10, 15, 20, 25, 30, 40, 50, 75].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiscountPercent(String(d))}
                  className={`min-h-[36px] min-w-[44px] rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    parseFloat(discountPercent) === d
                      ? "border-primary bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {d}%
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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Discount Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">How discounts work</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A {numDiscount}% discount on {formatNumber(numPrice)} saves you{" "}
              {formatNumber(discountAmount)}, bringing the price down to {formatNumber(finalPrice)}.
              Remember that successive discounts do not add up — a 20% then 10% discount
              on $100 gives $72, not $70, because the second discount applies to the already-reduced price.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
