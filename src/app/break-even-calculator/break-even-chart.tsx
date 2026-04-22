"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatInteger } from "@/lib/utils/format-number";

interface BreakEvenChartProps {
  fixedCosts: number;
  variableCost: number;
  sellingPrice: number;
  breakEvenUnits: number;
}

export function BreakEvenChart({
  fixedCosts,
  variableCost,
  sellingPrice,
  breakEvenUnits,
}: BreakEvenChartProps) {
  if (breakEvenUnits <= 0 || !isFinite(breakEvenUnits)) return null;

  const maxUnits = Math.ceil(breakEvenUnits * 1.6);
  const maxRevenue = maxUnits * sellingPrice;
  const maxCost = fixedCosts + maxUnits * variableCost;
  const yMax = Math.max(maxRevenue, maxCost) * 1.1;

  const W = 600;
  const H = 340;
  const PAD = { top: 20, right: 20, bottom: 50, left: 70 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  function xPos(units: number) {
    return PAD.left + (units / maxUnits) * plotW;
  }
  function yPos(value: number) {
    return PAD.top + plotH - (value / yMax) * plotH;
  }

  const beX = xPos(breakEvenUnits);
  const beY = yPos(breakEvenUnits * sellingPrice);

  const revLine = `M ${xPos(0)} ${yPos(0)} L ${xPos(maxUnits)} ${yPos(maxRevenue)}`;
  const costLine = `M ${xPos(0)} ${yPos(fixedCosts)} L ${xPos(maxUnits)} ${yPos(maxCost)}`;
  const fixedLine = `M ${xPos(0)} ${yPos(fixedCosts)} L ${xPos(maxUnits)} ${yPos(fixedCosts)}`;

  const profitArea = `M ${beX} ${beY} L ${xPos(maxUnits)} ${yPos(maxRevenue)} L ${xPos(maxUnits)} ${yPos(maxCost)} Z`;
  const lossArea = `M ${xPos(0)} ${yPos(0)} L ${beX} ${beY} L ${beX} ${yPos(fixedCosts + breakEvenUnits * variableCost)} L ${xPos(0)} ${yPos(fixedCosts)} Z`;

  const yTicks = 5;
  const xTicks = 5;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="mb-1 text-lg font-semibold">Break-even Visualization</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          You break even at {formatInteger(breakEvenUnits)} units ({formatNumber(breakEvenUnits * sellingPrice)} revenue).
          Everything beyond that is profit.
        </p>
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px]" aria-label="Break-even chart">
            <defs>
              <linearGradient id="profit-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="loss-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {Array.from({ length: yTicks + 1 }, (_, i) => {
              const val = (yMax / yTicks) * i;
              const y = yPos(val);
              return (
                <g key={`y-${i}`}>
                  <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e5e5e5" strokeWidth="1" />
                  <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#999">
                    {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: xTicks + 1 }, (_, i) => {
              const val = (maxUnits / xTicks) * i;
              const x = xPos(val);
              return (
                <text key={`x-${i}`} x={x} y={H - PAD.bottom + 18} textAnchor="middle" fontSize="10" fill="#999">
                  {val.toFixed(0)}
                </text>
              );
            })}

            <text x={PAD.left + plotW / 2} y={H - 5} textAnchor="middle" fontSize="11" fill="#666" fontWeight="500">
              Units Sold
            </text>
            <text x={14} y={PAD.top + plotH / 2} textAnchor="middle" fontSize="11" fill="#666" fontWeight="500" transform={`rotate(-90, 14, ${PAD.top + plotH / 2})`}>
              Amount ($)
            </text>

            <path d={lossArea} fill="url(#loss-fill)" />
            <path d={profitArea} fill="url(#profit-fill)" />

            <path d={fixedLine} stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 3" />
            <path d={costLine} stroke="#ef4444" strokeWidth="2" />
            <path d={revLine} stroke="#22c55e" strokeWidth="2" />

            <line x1={beX} y1={PAD.top} x2={beX} y2={PAD.top + plotH} stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <circle cx={beX} cy={beY} r="5" fill="#1a1a1a" />
            <rect x={beX - 50} y={beY - 28} width="100" height="20" rx="4" fill="#1a1a1a" />
            <text x={beX} y={beY - 15} textAnchor="middle" fontSize="10" fill="white" fontWeight="600">
              Break-even
            </text>

            <rect x={W - PAD.right - 140} y={PAD.top + 4} width="130" height="56" rx="4" fill="white" stroke="#e5e5e5" />
            <line x1={W - PAD.right - 130} y1={PAD.top + 20} x2={W - PAD.right - 112} y2={PAD.top + 20} stroke="#22c55e" strokeWidth="2" />
            <text x={W - PAD.right - 108} y={PAD.top + 24} fontSize="10" fill="#666">Revenue</text>
            <line x1={W - PAD.right - 130} y1={PAD.top + 36} x2={W - PAD.right - 112} y2={PAD.top + 36} stroke="#ef4444" strokeWidth="2" />
            <text x={W - PAD.right - 108} y={PAD.top + 40} fontSize="10" fill="#666">Total Cost</text>
            <line x1={W - PAD.right - 130} y1={PAD.top + 52} x2={W - PAD.right - 112} y2={PAD.top + 52} stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 3" />
            <text x={W - PAD.right - 108} y={PAD.top + 56} fontSize="10" fill="#666">Fixed Costs</text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
