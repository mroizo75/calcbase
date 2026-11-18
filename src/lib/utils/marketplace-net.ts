import { round } from "@/lib/utils/math";

export type FeeBase = "gross" | "net";

export interface MarketplaceSaleInput {
  /** Item price the buyer pays, excluding VAT. */
  itemPrice: number;
  /** Postage charged to the buyer, excluding VAT. Use 0 if you include it in the item price. */
  buyerShipping: number;
  /** VAT rate charged on the sale. Use 0 if you are not VAT-registered. */
  vatRatePercent: number;
  /** Cost of the product to you. */
  productCost: number;
  /** Postage you pay yourself. */
  sellerShipping: number;
  /** Any other cost per sale, such as packaging. */
  otherCost: number;
  platformPercent: number;
  platformFixed: number;
  platformFeeBase: FeeBase;
  paymentPercent: number;
  paymentFixed: number;
  paymentFeeBase: FeeBase;
  /** Units sold per month. */
  monthlySales: number;
  /** Fixed monthly costs, such as ads, software and subscriptions. */
  monthlyFixedCosts: number;
}

export type MarketplaceSaleResult =
  | {
      ok: true;
      customerPays: number;
      vatAmount: number;
      netRevenue: number;
      platformFee: number;
      paymentFee: number;
      totalFees: number;
      costs: number;
      profitPerSale: number;
      marginPercent: number;
      breakEvenSalesPerMonth: number | null;
      monthlyProfit: number;
    }
  | { ok: false; message: string };

function invalidAmount(value: number): boolean {
  return !Number.isFinite(value) || value < 0;
}

function invalidPercent(value: number): boolean {
  return !Number.isFinite(value) || value < 0 || value > 100;
}

/**
 * Net result per marketplace sale. Fees are taken from the buyer's total (VAT included)
 * when the platform charges on the gross amount, and from the VAT-exclusive amount otherwise.
 * VAT collected is passed to HMRC, so it is not counted as revenue.
 */
export function calculateMarketplaceSale(input: MarketplaceSaleInput): MarketplaceSaleResult {
  const amounts = [
    input.itemPrice,
    input.buyerShipping,
    input.productCost,
    input.sellerShipping,
    input.otherCost,
    input.platformFixed,
    input.paymentFixed,
    input.monthlySales,
    input.monthlyFixedCosts,
  ];
  if (amounts.some(invalidAmount)) {
    return { ok: false, message: "Amounts must be zero or a positive number." };
  }
  if ([input.vatRatePercent, input.platformPercent, input.paymentPercent].some(invalidPercent)) {
    return { ok: false, message: "Percentages must be between 0 and 100." };
  }

  const netRevenue = round(input.itemPrice + input.buyerShipping);
  if (netRevenue <= 0) {
    return { ok: false, message: "Enter a sale price above zero." };
  }

  const customerPays = round(netRevenue * (1 + input.vatRatePercent / 100));
  const vatAmount = round(customerPays - netRevenue);

  const platformBase = input.platformFeeBase === "gross" ? customerPays : netRevenue;
  const paymentBase = input.paymentFeeBase === "gross" ? customerPays : netRevenue;
  const platformFee = round((input.platformPercent / 100) * platformBase + input.platformFixed);
  const paymentFee = round((input.paymentPercent / 100) * paymentBase + input.paymentFixed);
  const totalFees = round(platformFee + paymentFee);

  const costs = round(input.productCost + input.sellerShipping + input.otherCost);
  const profitPerSale = round(netRevenue - totalFees - costs);
  const marginPercent = round((profitPerSale / netRevenue) * 100);

  let breakEvenSalesPerMonth: number | null;
  if (input.monthlyFixedCosts === 0) {
    breakEvenSalesPerMonth = 0;
  } else if (profitPerSale > 0) {
    breakEvenSalesPerMonth = Math.ceil(input.monthlyFixedCosts / profitPerSale);
  } else {
    breakEvenSalesPerMonth = null;
  }

  const monthlyProfit = round(profitPerSale * input.monthlySales - input.monthlyFixedCosts);

  return {
    ok: true,
    customerPays,
    vatAmount,
    netRevenue,
    platformFee,
    paymentFee,
    totalFees,
    costs,
    profitPerSale,
    marginPercent,
    breakEvenSalesPerMonth,
    monthlyProfit,
  };
}
