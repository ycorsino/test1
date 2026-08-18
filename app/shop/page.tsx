import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort");

  const products = (data ?? []) as Product[];

  return (
    <main className="section">
      <header className="section__head">
        <p className="eyebrow">The Shop</p>
        <h1 className="section__title">Gear built by Skylabs</h1>
        <p className="section__lead">
          Altimeters, helmets, containers, canopies, jumpsuits and apparel —
          everything you need between the plane and the ground.
        </p>
      </header>

      {error && (
        <p className="notice notice--error">
          Couldn&apos;t load the shop right now. Please try again shortly.
        </p>
      )}

      <ShopClient products={products} />
    </main>
  );
}
