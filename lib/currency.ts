// Prices are stored in USD; these are static display-only conversion rates.
// Swap for a live FX feed later if real accuracy is needed.
export type CurrencyCode = "USD" | "EUR" | "GBP" | "AUD";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; rate: number; label: string }
> = {
  USD: { symbol: "$", rate: 1, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, label: "Euro" },
  GBP: { symbol: "£", rate: 0.79, label: "British Pound" },
  AUD: { symbol: "A$", rate: 1.52, label: "Australian Dollar" },
};

export function formatPrice(usd: number, code: CurrencyCode): string {
  const { symbol, rate } = CURRENCIES[code];
  const value = usd * rate;
  const rounded =
    value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
  return `${symbol}${rounded.toLocaleString("en-US", {
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  })}`;
}
