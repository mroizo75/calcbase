import { round } from "@/lib/utils/math";

export type FeeBase = "gross" | "net";

export interface PriceBuilderInput {
  unitCost: number;
  shippingPerUnit: number;
  otherPerUnit: number;
  platformPercent: number;
  platformFixed: number;
  platformFeeAppliesTo: FeeBase;
  paymentPercent: number;
  paymentFixed: number;
  paymentFeeAppliesTo: FeeBase;
  vatRegistered: boolean;
  vatRatePercent: number;
  discountPercent: number;
  targetMarginPercent: number;
}

export type PriceErrorCode = "impossible_target" | "full_discount" | "invalid_input" | "no_revenue";

export interface PriceError {
  ok: false;
  code: PriceErrorCode;
  message: string;
}

export interface WaterfallLine {
  id: "customer" | "vat" | "platform" | "payment" | "costs" | "profit";
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  ok: true;
  listNet: number;
  netAfterDiscount: number;
  customerPays: number;
  vatAmount: number;
  platformFee: number;
  paymentFee: number;
  costs: number;
  profit: number;
  marginPercent: number;
  markupPercent: number | null;
  lines: WaterfallLine[];
}

export type PriceResult = PriceBreakdown | PriceError;

export interface PriceWarning {
  id: "low_margin" | "negative_margin" | "markup_mixup" | "not_vat_registered";
  message: string;
}

function fail(code: PriceErrorCode, message: string): PriceError {
  return { ok: false, code, message };
}

function finite(value: number): boolean {
  return Number.isFinite(value);
}

function percentInRange(value: number): boolean {
  return finite(value) && value >= 0 && value <= 100;
}

function moneyOk(value: number): boolean {
  return finite(value) && value >= 0;
}

export function unitCosts(input: PriceBuilderInput): number {
  return input.unitCost + input.shippingPerUnit + input.otherPerUnit;
}

function vatDecimal(input: PriceBuilderInput): number {
  if (!input.vatRegistered) return 0;
  return input.vatRatePercent / 100;
}

/** Converts a fee charged on the VAT-inclusive price into the equivalent share of the net price. */
export function feeRateOnNet(percent: number, appliesTo: FeeBase, vatRateDecimal: number): number {
  const rate = percent / 100;
  if (appliesTo === "gross") return rate * (1 + vatRateDecimal);
  return rate;
}

function validateAmounts(input: PriceBuilderInput): PriceError | null {
  const amounts = [
    input.unitCost,
    input.shippingPerUnit,
    input.otherPerUnit,
    input.platformFixed,
    input.paymentFixed,
  ];
  if (amounts.some((value) => !moneyOk(value))) {
    return fail("invalid_input", "Costs and fixed fees must be zero or a positive number.");
  }
  if (
    !percentInRange(input.platformPercent) ||
    !percentInRange(input.paymentPercent) ||
    !percentInRange(input.vatRatePercent) ||
    !percentInRange(input.discountPercent)
  ) {
    return fail("invalid_input", "Percentages must be between 0 and 100.");
  }
  if (!finite(input.targetMarginPercent) || input.targetMarginPercent < 0) {
    return fail("invalid_input", "Target margin must be zero or a positive number.");
  }
  if (input.discountPercent >= 100) {
    return fail("full_discount", "A 100% discount leaves no price to cover costs and fees.");
  }
  return null;
}

function feeAmount(percent: number, fixed: number, appliesTo: FeeBase, net: number, customerPays: number): number {
  const base = appliesTo === "gross" ? customerPays : net;
  return percent / 100 * base + fixed;
}

export function breakdownAtPrice(input: PriceBuilderInput, listNet: number): PriceResult {
  const invalid = validateAmounts(input);
  if (invalid) return invalid;
  if (!moneyOk(listNet)) {
    return fail("invalid_input", "Selling price must be zero or a positive number.");
  }

  const vatRate = vatDecimal(input);
  const discount = input.discountPercent / 100;
  const net = round(listNet * (1 - discount));
  const customerPays = round(net * (1 + vatRate));
  const vatAmount = round(customerPays - net);
  const platformFee = round(
    feeAmount(input.platformPercent, input.platformFixed, input.platformFeeAppliesTo, net, customerPays),
  );
  const paymentFee = round(
    feeAmount(input.paymentPercent, input.paymentFixed, input.paymentFeeAppliesTo, net, customerPays),
  );
  const costs = round(unitCosts(input));
  const profit = round(net - platformFee - paymentFee - costs);

  if (net === 0) {
    return fail("no_revenue", "The price after discount is zero, so there is no margin to calculate.");
  }

  const marginPercent = round((profit / net) * 100);
  const markupPercent = costs === 0 ? null : round((profit / costs) * 100);

  return {
    ok: true,
    listNet: round(listNet),
    netAfterDiscount: net,
    customerPays,
    vatAmount,
    platformFee,
    paymentFee,
    costs,
    profit,
    marginPercent,
    markupPercent,
    lines: [
      { id: "customer", label: "Customer pays", amount: customerPays },
      { id: "vat", label: "VAT", amount: vatAmount },
      { id: "platform", label: "Platform fee", amount: platformFee },
      { id: "payment", label: "Payment fee", amount: paymentFee },
      { id: "costs", label: "Costs", amount: costs },
      { id: "profit", label: "Profit", amount: profit },
    ],
  };
}

export function solvePriceForMargin(input: PriceBuilderInput): PriceResult {
  const invalid = validateAmounts(input);
  if (invalid) return invalid;
  if (input.targetMarginPercent >= 100) {
    return fail(
      "impossible_target",
      "A target margin of 100% or more leaves nothing to cover costs and fees.",
    );
  }

  const vatRate = vatDecimal(input);
  const margin = input.targetMarginPercent / 100;
  const platformOnNet = feeRateOnNet(input.platformPercent, input.platformFeeAppliesTo, vatRate);
  const paymentOnNet = feeRateOnNet(input.paymentPercent, input.paymentFeeAppliesTo, vatRate);
  const denominator = 1 - margin - platformOnNet - paymentOnNet;
  if (!(denominator > 0)) {
    return fail(
      "impossible_target",
      "That margin is impossible. Percentage fees plus the target margin use 100% or more of the price.",
    );
  }

  const numerator = unitCosts(input) + input.platformFixed + input.paymentFixed;
  if (numerator === 0 && margin > 0) {
    return fail(
      "impossible_target",
      "There is no cost or fixed fee to cover, so a positive margin does not set a price.",
    );
  }

  const netAfterDiscount = numerator / denominator;
  const listNet = netAfterDiscount / (1 - input.discountPercent / 100);
  if (!Number.isFinite(listNet)) {
    return fail("impossible_target", "That margin is impossible with these fees.");
  }

  return closestPenny(input, listNet);
}

/** Penny prices change the margin. Use the lowest price that still reaches the target. */
function closestPenny(input: PriceBuilderInput, exactListNet: number): PriceResult {
  const start = round(exactListNet);
  let best = breakdownAtPrice(input, start);
  if (!best.ok) return breakdownAtPrice(input, exactListNet);
  let meeting: PriceBreakdown | null = best.marginPercent >= input.targetMarginPercent ? best : null;

  for (let pennies = -5; pennies <= 50; pennies += 1) {
    const result = breakdownAtPrice(input, round(start + pennies / 100));
    if (!result.ok) continue;
    if (result.marginPercent >= input.targetMarginPercent) {
      if (!meeting || result.listNet < meeting.listNet) meeting = result;
    } else if (!meeting && Math.abs(result.marginPercent - input.targetMarginPercent) < Math.abs(best.marginPercent - input.targetMarginPercent)) {
      best = result;
    }
  }

  return meeting ?? best;
}

function oneDecimal(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1);
}

export function priceWarnings(
  input: PriceBuilderInput,
  result: PriceResult,
  mode: "charge" | "check",
): PriceWarning[] {
  const warnings: PriceWarning[] = [];

  if (!input.vatRegistered) {
    warnings.push({
      id: "not_vat_registered",
      message:
        "You are not VAT-registered, so you cannot reclaim VAT on these costs. The price the customer pays has no VAT added.",
    });
  }

  if (mode === "charge" && input.targetMarginPercent > 0 && input.targetMarginPercent < 100) {
    const asMargin = (input.targetMarginPercent / (100 + input.targetMarginPercent)) * 100;
    warnings.push({
      id: "markup_mixup",
      message: `You entered ${oneDecimal(input.targetMarginPercent)}% as margin. If that was markup, it is a ${oneDecimal(asMargin)}% margin. Did you mean margin?`,
    });
  }

  if (result.ok && result.marginPercent < 0) {
    warnings.push({
      id: "negative_margin",
      message: `After VAT and fees the margin is ${result.marginPercent}%. You lose money on every unit.`,
    });
  } else if (result.ok && result.marginPercent < 10) {
    warnings.push({
      id: "low_margin",
      message: `After VAT and fees the margin is ${result.marginPercent}%, under 10%.`,
    });
  }

  return warnings;
}
