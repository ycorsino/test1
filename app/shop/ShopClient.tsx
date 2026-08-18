"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";
import type { Product } from "@/lib/types";

export default function ShopClient({ products }: { products: Product[] }) {
  const { add, currency } = useStore();
  const [category, setCategory] = useState<string>("All");
  const [added, setAdded] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const visible =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  function handleAdd(product: Product) {
    add(product);
    setAdded(product.slug);
    window.setTimeout(
      () => setAdded((cur) => (cur === product.slug ? null : cur)),
      1200
    );
  }

  return (
    <>
      <div className="filters" role="tablist" aria-label="Product categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={category === cat}
            className={`filter${category === cat ? " filter--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products">
        {visible.map((product) => (
          <article key={product.id} className="product-card">
            <div
              className="product-card__art"
              style={{
                background: `radial-gradient(120px 120px at 30% 25%, ${product.accent}55, transparent 70%), linear-gradient(160deg, #0b1220, #060b16)`,
              }}
            >
              {product.badge && (
                <span className="product-card__badge">{product.badge}</span>
              )}
              <span
                className="product-card__glyph"
                style={{ color: product.accent }}
                aria-hidden="true"
              >
                {glyphFor(product.category)}
              </span>
            </div>
            <div className="product-card__body">
              <span className="chip chip--sm">{product.category}</span>
              <h2 className="product-card__name">{product.name}</h2>
              <p className="product-card__desc">{product.description}</p>
              <div className="product-card__foot">
                <span className="product-card__price">
                  {formatPrice(Number(product.price_usd), currency)}
                </span>
                <button
                  className="btn btn--primary btn--sm"
                  onClick={() => handleAdd(product)}
                >
                  {added === product.slug ? "Added ✓" : "Add to cart"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function glyphFor(category: string): string {
  switch (category) {
    case "Altimeters":
      return "⏲️";
    case "Helmets":
      return "🪖";
    case "Containers":
      return "🎒";
    case "Canopies":
      return "🪂";
    case "Jumpsuits":
      return "🧥";
    case "Apparel":
      return "👕";
    default:
      return "✨";
  }
}
