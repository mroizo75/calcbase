export function round(value: number, decimals = 2): number {
  return Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);
}

export function addVat(net: number, ratePercent: number): { gross: number; vatAmount: number } {
  const vatAmount = round(net * (ratePercent / 100));
  const gross = round(net + vatAmount);
  return { gross, vatAmount };
}

export function removeVat(gross: number, ratePercent: number): { net: number; vatAmount: number } {
  const divisor = 1 + ratePercent / 100;
  if (divisor === 0) return { net: 0, vatAmount: gross };
  const net = round(gross / divisor);
  const vatAmount = round(gross - net);
  return { net, vatAmount };
}

export function calculateMargin(revenue: number, cost: number): { profit: number; marginPercent: number } {
  const profit = round(revenue - cost);
  const marginPercent = revenue === 0 ? 0 : round((profit / revenue) * 100);
  return { profit, marginPercent };
}

export function calculateMarkup(cost: number, sellingPrice: number): { profit: number; markupPercent: number } {
  const profit = round(sellingPrice - cost);
  const markupPercent = cost === 0 ? 0 : round((profit / cost) * 100);
  return { profit, markupPercent };
}

export function calculateMarkupFromPercent(cost: number, markupPercent: number): { sellingPrice: number; profit: number } {
  const profit = round(cost * (markupPercent / 100));
  const sellingPrice = round(cost + profit);
  return { sellingPrice, profit };
}

export function calculateDiscount(originalPrice: number, discountPercent: number): { discountAmount: number; finalPrice: number } {
  const discountAmount = round(originalPrice * (discountPercent / 100));
  const finalPrice = round(originalPrice - discountAmount);
  return { discountAmount, finalPrice };
}

export function marginToMarkup(marginPercent: number): number {
  if (marginPercent >= 100) return Infinity;
  return round((marginPercent / (100 - marginPercent)) * 100);
}

export function markupToMargin(markupPercent: number): number {
  return round((markupPercent / (100 + markupPercent)) * 100);
}

export function calculateRoi(investment: number, gain: number): { roi: number; netProfit: number } {
  if (investment === 0) return { roi: 0, netProfit: round(gain) };
  const netProfit = round(gain - investment);
  const roi = round((netProfit / investment) * 100);
  return { roi, netProfit };
}

export function calculateSalesTax(price: number, taxRate: number): { taxAmount: number; totalPrice: number } {
  const taxAmount = round(price * (taxRate / 100));
  const totalPrice = round(price + taxAmount);
  return { taxAmount, totalPrice };
}

export function calculateCommission(salesAmount: number, commissionRate: number): { commission: number; netAfterCommission: number } {
  const commission = round(salesAmount * (commissionRate / 100));
  const netAfterCommission = round(salesAmount - commission);
  return { commission, netAfterCommission };
}

export function calculateBreakeven(
  fixedCosts: number,
  variableCostPerUnit: number,
  sellingPricePerUnit: number,
): { breakEvenUnits: number; breakEvenRevenue: number } {
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) {
    return { breakEvenUnits: Infinity, breakEvenRevenue: Infinity };
  }
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = round(breakEvenUnits * sellingPricePerUnit);
  return { breakEvenUnits, breakEvenRevenue };
}
