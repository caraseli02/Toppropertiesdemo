/**
 * Safely parse price string to number with currency conversion.
 * Returns null if parsing fails, otherwise returns USD equivalent.
 *
 * @param priceString - The price string to parse (e.g., "€4,500,000")
 * @returns USD equivalent as number, or null if parsing fails
 */
const CURRENCY_RATES_TO_USD = [
  { token: "€", rate: 1.1 },
  { token: "£", rate: 1.3 },
  { token: "CHF", rate: 1.15 },
  { token: "AED", rate: 0.27 },
  { token: "¥", rate: 0.0067 },
  { token: "AUD", rate: 0.65 },
  { token: "CAD", rate: 0.74 },
  { token: "SGD", rate: 0.75 },
  { token: "ZAR", rate: 0.055 },
] as const;

export function parsePrice(priceString: string): number | null {
  // Remove all non-numeric characters except decimal point
  const numeric = priceString.replace(/[^0-9.]/g, "");

  // Parse the numeric value
  const parsed = parseFloat(numeric);

  // Return null if parsing failed
  if (isNaN(parsed)) {
    return null;
  }

  const currency = CURRENCY_RATES_TO_USD.find(({ token }) => priceString.includes(token));
  return currency ? parsed * currency.rate : parsed;
}

export function formatUsdComparison(priceString: string): string | null {
  const usdPrice = parsePrice(priceString);
  if (usdPrice === null) return null;

  const compactPrice =
    usdPrice >= 1_000_000
      ? `${(usdPrice / 1_000_000).toFixed(1)}M`
      : usdPrice >= 1_000
        ? `${Math.round(usdPrice / 1_000)}K`
        : Math.round(usdPrice).toLocaleString("en-US");

  return `≈ $${compactPrice} USD`;
}
