export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price_usd: number;
  price_unit: string;
  duration: string | null;
  highlights: string[];
  sort: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price_usd: number;
  badge: string | null;
  accent: string;
  in_stock: boolean;
  sort: number;
};

export type CartItem = {
  slug: string;
  name: string;
  price_usd: number;
  accent: string;
  qty: number;
};
