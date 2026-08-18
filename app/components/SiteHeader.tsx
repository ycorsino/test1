"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Experiences" },
  { href: "/shop", label: "Shop" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { count, currency, setCurrency } = useStore();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand wordmark" aria-label="Skylabs home">
          Skylabs
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link${active ? " nav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <label className="currency">
            <span className="sr-only">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select currency"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <option key={code} value={code}>
                  {code} {CURRENCIES[code].symbol}
                </option>
              ))}
            </select>
          </label>

          <Link href="/cart" className="cart-link" aria-label="View cart">
            Cart
            <span className="cart-link__count">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
