import { Amenity, Property } from '@/types';

/**
 * Safely parse price string to number with currency conversion.
 * Returns null if parsing fails, otherwise returns USD equivalent.
 *
 * @param priceString - The price string to parse (e.g., "€4,500,000")
 * @returns USD equivalent as number, or null if parsing fails
 */
export function parsePrice(priceString: string): number | null {
  // Remove all non-numeric characters except decimal point
  const numeric = priceString.replace(/[^0-9.]/g, '');

  // Parse the numeric value
  const parsed = parseFloat(numeric);

  // Return null if parsing failed
  if (isNaN(parsed)) {
    return null;
  }

  // Multi-currency conversion rates to USD
  if (priceString.includes('€')) return parsed * 1.1;
  if (priceString.includes('£')) return parsed * 1.3;
  if (priceString.includes('CHF')) return parsed * 1.15;
  if (priceString.includes('AED')) return parsed * 0.27;
  if (priceString.includes('¥')) return parsed * 0.0067;  // JPY to USD
  if (priceString.includes('AUD')) return parsed * 0.65;   // AUD to USD
  if (priceString.includes('CAD')) return parsed * 0.74;   // CAD to USD
  if (priceString.includes('SGD')) return parsed * 0.75;  // SGD to USD
  if (priceString.includes('ZAR')) return parsed * 0.055; // ZAR to USD

  // Default: assume USD
  return parsed;
}

/**
 * Format a number as currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency symbol (default: $)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString()}`;
}
