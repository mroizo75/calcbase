/**
 * Number parsing for Spanish-speaking visitors across the Americas.
 *
 * Latin America mixes conventions: Mexico and the US use "1,234.56", while
 * Argentina, Colombia and Chile commonly write "1.234,56". This parser accepts
 * both so a visitor never gets a silently wrong number.
 *
 * Rules:
 *  - Both "." and "," present: the one that appears last is the decimal mark.
 *  - Only ",": several commas, or exactly one comma followed by three digits
 *    (e.g. "1,234"), are thousands separators. Otherwise it is a decimal mark ("12,5").
 *  - Only ".": several dots are thousands separators. A single dot is a decimal mark.
 */
export function parseNumericInputEs(raw: string): number {
  let s = raw.trim().replace(/\s/g, "");
  const negative = s.startsWith("-");
  s = s.replace(/[^0-9.,]/g, "");
  if (s === "") return 0;

  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");
  let normalised: string;

  if (lastDot !== -1 && lastComma !== -1) {
    const decimalMark = lastDot > lastComma ? "." : ",";
    const thousandsMark = decimalMark === "." ? "," : ".";
    normalised = s.split(thousandsMark).join("");
    if (decimalMark === ",") normalised = normalised.replace(",", ".");
  } else if (lastComma !== -1) {
    const commaCount = s.split(",").length - 1;
    const digitsAfter = s.length - lastComma - 1;
    if (commaCount > 1 || digitsAfter === 3) {
      normalised = s.split(",").join("");
    } else {
      normalised = s.replace(",", ".");
    }
  } else if (lastDot !== -1) {
    const dotCount = s.split(".").length - 1;
    normalised = dotCount > 1 ? s.split(".").join("") : s;
  } else {
    normalised = s;
  }

  const parsed = parseFloat(normalised);
  if (!Number.isFinite(parsed)) return 0;
  return negative ? -parsed : parsed;
}
