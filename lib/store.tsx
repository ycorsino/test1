"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "./types";
import type { CurrencyCode } from "./currency";

type StoreContextValue = {
  items: CartItem[];
  count: number;
  subtotalUsd: number;
  add: (product: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "skylabs.cart";
const CURRENCY_KEY = "skylabs.currency";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setItems(JSON.parse(rawCart));
      const rawCurrency = localStorage.getItem(CURRENCY_KEY) as CurrencyCode;
      if (rawCurrency) setCurrencyState(rawCurrency);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function setCurrency(code: CurrencyCode) {
    setCurrencyState(code);
    try {
      localStorage.setItem(CURRENCY_KEY, code);
    } catch {
      /* ignore */
    }
  }

  function add(product: Product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price_usd: Number(product.price_usd),
          accent: product.accent,
          qty,
        },
      ];
    });
  }

  function setQty(slug: string, qty: number) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }

  function remove(slug: string) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function clear() {
    setItems([]);
  }

  const value = useMemo<StoreContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotalUsd = items.reduce((n, i) => n + i.price_usd * i.qty, 0);
    return {
      items,
      count,
      subtotalUsd,
      add,
      setQty,
      remove,
      clear,
      currency,
      setCurrency,
    };
  }, [items, currency]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
