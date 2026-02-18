---
status: complete
priority: p2
issue_id: "008"
tags: [bug, data, currency, code-review]
dependencies: []
---

# Add Missing Currency Exchange Rates

## Problem Statement

The price conversion function in App.tsx only handles 4 currencies (€, £, CHF, AED), but the property data includes 8 additional currencies (¥, AUD, CAD, SGD, ZAR) that will be parsed incorrectly, resulting in wrong filter results.

**Affected file:** `src/App.tsx` (lines 558-565)

**Data Quality Risk:** P2 IMPORTANT - Filtering produces incorrect results for 8 currencies.

## Findings

**Current Implementation:**
```typescript
const getPriceInUSD = (priceString: string): number => {
  const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
  if (priceString.includes('€')) return numericPrice * 1.1;
  if (priceString.includes('£')) return numericPrice * 1.3;
  if (priceString.includes('CHF')) return numericPrice * 1.15;
  if (priceString.includes('AED')) return numericPrice * 0.27;
  return numericPrice; // Assumes USD for others
};
```

**Missing Currencies in Properties Data:**

| Currency | Symbol | Properties Affected | Current Behavior |
|----------|--------|---------------------|------------------|
| Japanese Yen | ¥ | Tokyo Penthouse, Kyoto Traditional | Treated as USD |
| Australian Dollar | AUD | Seaside Retreat | Treated as USD |
| Canadian Dollar | CAD | Eco-Friendly Home | Treated as USD |
| Singapore Dollar | SGD | Singapore High-Rise | Treated as USD |
| South African Rand | ZAR | Cape Town Villa | Treated as USD |

**Properties with missing exchange rates:**
- ¥850,000,000 (Tokyo) - treated as $850M instead of ~$5.7M
- AUD 9,500,000 (Sydney) - treated as $9.5M instead of ~$6.2M
- CAD 5,500,000 (Vancouver) - treated as $5.5M instead of ~$4.1M
- SGD 12,000,000 (Singapore) - treated as $12M instead of ~$9M
- ZAR 45,000,000 (Cape Town) - treated as $45M instead of ~$2.5M

## Proposed Solutions

### Option 1: Add Missing Exchange Rates (Quick Fix)

**Approach:** Add the missing currency exchange rates.

```typescript
const EXCHANGE_RATES = {
  '€': 1.1,      // EUR to USD
  '£': 1.3,      // GBP to USD
  'CHF': 1.15,   // CHF to USD
  'AED': 0.27,   // AED to USD
  '¥': 0.0067,   // JPY to USD (NEW)
  'AUD': 0.65,   // AUD to USD (NEW)
  'CAD': 0.74,   // CAD to USD (NEW)
  'SGD': 0.75,   // SGD to USD (NEW)
  'ZAR': 0.055,  // ZAR to USD (NEW)
} as const;

const getPriceInUSD = (priceString: string): number => {
  const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
  
  for (const [symbol, rate] of Object.entries(EXCHANGE_RATES)) {
    if (priceString.includes(symbol)) {
      return numericPrice * rate;
    }
  }
  
  return numericPrice; // Default: assume USD
};
```

**Pros:**
- Quick fix
- Solves immediate problem
- Easy to understand

**Cons:**
- Hardcoded rates will become outdated
- Magic numbers

**Effort:** 15 minutes

**Risk:** Low

---

### Option 2: Configuration Object with Documentation

**Approach:** Extract rates to a well-documented config object.

```typescript
// lib/currency.ts
export const CURRENCY_CONFIG = {
  rates: {
    EUR: { symbol: '€', rate: 1.1, name: 'Euro' },
    GBP: { symbol: '£', rate: 1.3, name: 'British Pound' },
    CHF: { symbol: 'CHF', rate: 1.15, name: 'Swiss Franc' },
    AED: { symbol: 'AED', rate: 0.27, name: 'UAE Dirham' },
    JPY: { symbol: '¥', rate: 0.0067, name: 'Japanese Yen' },
    AUD: { symbol: 'AUD', rate: 0.65, name: 'Australian Dollar' },
    CAD: { symbol: 'CAD', rate: 0.74, name: 'Canadian Dollar' },
    SGD: { symbol: 'SGD', rate: 0.75, name: 'Singapore Dollar' },
    ZAR: { symbol: 'ZAR', rate: 0.055, name: 'South African Rand' },
    USD: { symbol: '$', rate: 1.0, name: 'US Dollar' },
  },
  // Note: Rates as of Feb 2026, should be updated periodically
} as const;

export function convertToUSD(priceString: string): number {
  // Implementation using CURRENCY_CONFIG
}
```

**Pros:**
- Better organization
- Self-documenting
- Easier to maintain

**Cons:**
- Still hardcoded rates

**Effort:** 30 minutes

**Risk:** Low

---

### Option 3: Real-time Exchange Rate API

**Approach:** Fetch current exchange rates from an API.

```typescript
// hooks/useExchangeRates.ts
export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => setRates(data.rates));
  }, []);
  
  return rates;
}
```

**Pros:**
- Accurate rates
- Always up-to-date

**Cons:**
- Requires network request
- Adds complexity
- API dependency

**Effort:** 1 hour

**Risk:** Medium

## Recommended Action

Implemented fix for missing currency exchange rates:

1. Added 5 new currency rates: ¥ (JPY), AUD, CAD, SGD, ZAR
2. Updated getPriceInUSD function to iterate through all currency symbols
3. All 24 properties now have correct USD conversion

## Technical Details

**Files modified:**
- `src/App.tsx:610-617` - getPriceInUSD function

**Added exchange rates:**
- ¥ (JPY): 0.0067 - Japanese Yen
- AUD: 0.65 - Australian Dollar
- CAD: 0.74 - Canadian Dollar
- SGD: 0.75 - Singapore Dollar
- ZAR: 0.055 - South African Rand

**Properties now correctly handled:**
- Tokyo Penthouse: ¥850,000,000 → ~$5.7M
- Sydney Seaside: AUD 9,500,000 → ~$6.2M
- Eco-Friendly Home: CAD 5,500,000 → ~$4.1M
- Singapore High-Rise: SGD 12,000,000 → ~$9.0M
- Cape Town Villa: ZAR 45,000,000 → ~$2.5M

## Resources

- **Exchange Rate API:** https://exchangerate-api.com/
- **ISO Currency Codes:** https://en.wikipedia.org/wiki/ISO_4217
- **JavaScript Number Parsing:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

## Acceptance Criteria

- [x] All 9 currencies supported
- [x] Exchange rates added to configuration
- [x] Price conversion works for all properties
- [x] Filter results accurate for all currencies
- [x] Documentation added about rate freshness
- [x] Build successful with no errors

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Kieran TypeScript Reviewer)

**Actions:**
- Analyzed getPriceInUSD function
- Cross-referenced with property data
- Identified 5 missing currencies
- Calculated impact on filtering accuracy

**Learnings:**
- 8 out of 24 properties have unsupported currencies
- Multi-character currency codes need different detection
- Hardcoded rates will drift over time
- Current implementation silently fails for unknown currencies

---

### 2026-02-16 - Implementation - Currency Rates Fix

**By:** Claude Code

**Actions:**
- Added ¥ rate: 0.0067 (JPY to USD)
- Added AUD rate: 0.65 (AUD to USD)
- Added CAD rate: 0.74 (CAD to USD)
- Added SGD rate: 0.75 (SGD to USD)
- Added ZAR rate: 0.055 (ZAR to USD)
- Updated getPriceInUSD to iterate through all currency symbols
- Tested filtering with properties using different currencies
- Built successfully with no errors

**Learnings:**
- All 9 currencies now supported
- Filter accuracy improved for 8 properties
- Simple iterative approach works well
- Rates are approximate (Feb 2026)
- Should consider real-time API for production

**Status:**
- ✅ All 5 missing currency rates added
- ✅ Currency detection logic updated
- ✅ Price filtering works for all properties
- ✅ Build successful with no errors
- Ready for portfolio demo

---

## Notes

- **Priority Justification:** P2 IMPORTANT because it causes incorrect filtering for 1/3 of properties
- **Timeline:** Should be fixed before user testing
- **Exchange Rates:** Current rates are approximate (Feb 2026)
- **Future Consideration:** Consider real-time API for production
- **Testing:** Verify all 24 properties filter correctly after fix
