"use client";

import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";

export default function ServicePrice({
  priceUsd,
  unit,
}: {
  priceUsd: number;
  unit: string;
}) {
  const { currency } = useStore();
  return (
    <span className="service-card__price">
      <strong>{formatPrice(priceUsd, currency)}</strong>
      <span className="service-card__unit">{unit}</span>
    </span>
  );
}
