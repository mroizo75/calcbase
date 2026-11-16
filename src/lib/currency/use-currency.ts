"use client";

import { useEffect, useState } from "react";
import {
  CURRENCY_EVENT,
  CURRENCY_SYMBOL,
  detectDefaultCurrency,
  readStoredCurrency,
  type DisplayCurrency,
} from "./currency";

/**
 * Starter alltid på USD (samme som serverrendering), og bytter til lagret
 * eller detektert valuta etter mount. Det gir ingen hydreringsfeil.
 */
export function useCurrency(): { currency: DisplayCurrency; symbol: string } {
  const [currency, setCurrency] = useState<DisplayCurrency>("USD");

  useEffect(() => {
    setCurrency(readStoredCurrency() ?? detectDefaultCurrency());
    function onChange(e: Event) {
      const detail = (e as CustomEvent<DisplayCurrency>).detail;
      if (detail === "USD" || detail === "GBP") setCurrency(detail);
    }
    window.addEventListener(CURRENCY_EVENT, onChange);
    return () => window.removeEventListener(CURRENCY_EVENT, onChange);
  }, []);

  return { currency, symbol: CURRENCY_SYMBOL[currency] };
}
