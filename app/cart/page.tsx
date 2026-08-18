"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice, CURRENCIES } from "@/lib/currency";
import { supabase } from "@/lib/supabase";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", glyph: "💳" },
  { id: "paypal", label: "PayPal", glyph: "🅿️" },
  { id: "apple", label: "Apple Pay", glyph: "" },
  { id: "google", label: "Google Pay", glyph: "🇬" },
];

export default function CartPage() {
  const { items, subtotalUsd, setQty, remove, clear, currency, count } =
    useStore();
  const [method, setMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState<null | { id: string }>(null);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlacing(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const { data, error } = await supabase
      .from("orders")
      .insert({
        email: String(fd.get("email") || ""),
        full_name: String(fd.get("full_name") || ""),
        items: items,
        subtotal_usd: Number(subtotalUsd.toFixed(2)),
        currency,
        payment_method: method,
        shipping: {
          address: String(fd.get("address") || ""),
          city: String(fd.get("city") || ""),
          postal: String(fd.get("postal") || ""),
          country: String(fd.get("country") || ""),
        },
        status: "demo_paid",
      })
      .select("id")
      .single();

    if (error || !data) {
      setError("We couldn't place your order. Please try again.");
      setPlacing(false);
      return;
    }

    clear();
    setDone({ id: data.id });
    setPlacing(false);
  }

  if (done) {
    return (
      <main className="section section--narrow">
        <div className="confirm">
          <span className="confirm__mark" aria-hidden="true">
            ✓
          </span>
          <h1>Order confirmed</h1>
          <p>
            Thanks for your order! A confirmation is on its way to your inbox.
          </p>
          <p className="confirm__ref">
            Reference <code>{done.id.slice(0, 8)}</code>
          </p>
          <p className="confirm__note">
            This is a demo store — no payment was processed and nothing will
            ship.
          </p>
          <Link href="/shop" className="btn btn--primary">
            Keep shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <header className="section__head">
        <p className="eyebrow">Cart</p>
        <h1 className="section__title">Your cart</h1>
      </header>

      {count === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="btn btn--primary">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <section className="checkout__items">
            {items.map((item) => (
              <div key={item.slug} className="line">
                <span
                  className="line__swatch"
                  style={{ background: item.accent }}
                  aria-hidden="true"
                />
                <div className="line__info">
                  <span className="line__name">{item.name}</span>
                  <span className="line__unit">
                    {formatPrice(item.price_usd, currency)} each
                  </span>
                </div>
                <div className="line__qty">
                  <button
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => setQty(item.slug, item.qty - 1)}
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    aria-label={`Increase ${item.name}`}
                    onClick={() => setQty(item.slug, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="line__total">
                  {formatPrice(item.price_usd * item.qty, currency)}
                </span>
                <button
                  className="line__remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => remove(item.slug)}
                >
                  ✕
                </button>
              </div>
            ))}
          </section>

          <form className="checkout__panel" onSubmit={placeOrder}>
            <div className="summary">
              <div className="summary__row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalUsd, currency)}</span>
              </div>
              <div className="summary__row summary__row--muted">
                <span>Shipping</span>
                <span>Calculated at fulfilment</span>
              </div>
              <div className="summary__row summary__row--total">
                <span>Total</span>
                <span>{formatPrice(subtotalUsd, currency)}</span>
              </div>
              <p className="summary__fx">
                Charged in {currency} · {CURRENCIES[currency].label}
              </p>
            </div>

            <h2 className="checkout__h">Details</h2>
            <div className="field-row">
              <label className="field">
                <span>Full name</span>
                <input name="full_name" required placeholder="Alex Skyward" />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="field">
              <span>Address</span>
              <input name="address" required placeholder="1 Cloudbase Way" />
            </label>
            <div className="field-row">
              <label className="field">
                <span>City</span>
                <input name="city" required placeholder="Skyport" />
              </label>
              <label className="field field--narrow">
                <span>Postal code</span>
                <input name="postal" required placeholder="00000" />
              </label>
              <label className="field">
                <span>Country</span>
                <input name="country" required placeholder="United States" />
              </label>
            </div>

            <h2 className="checkout__h">Payment</h2>
            <div className="pay-methods">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  type="button"
                  key={pm.id}
                  className={`pay${method === pm.id ? " pay--active" : ""}`}
                  onClick={() => setMethod(pm.id)}
                  aria-pressed={method === pm.id}
                >
                  <span aria-hidden="true">{pm.glyph}</span>
                  {pm.label}
                </button>
              ))}
            </div>
            <p className="demo-note">
              🔒 Demo checkout — no card details are collected and no payment is
              taken. Real Stripe / PayPal can be connected later.
            </p>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={placing}
            >
              {placing
                ? "Placing order…"
                : `Place order · ${formatPrice(subtotalUsd, currency)}`}
            </button>
            {error && <p className="notice notice--error">{error}</p>}
          </form>
        </div>
      )}
    </main>
  );
}
