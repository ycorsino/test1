"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/lib/types";

export default function BookingForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<{ msg: string; error: boolean } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const serviceSlug = String(fd.get("service") || "");
    const service = services.find((s) => s.slug === serviceSlug);

    const { error } = await supabase.from("booking_requests").insert({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      service_slug: serviceSlug || null,
      service_name: service?.name ?? null,
      preferred_date: (fd.get("date") as string) || null,
      party_size: Number(fd.get("party_size") || 1),
      message: String(fd.get("message") || "") || null,
    });

    if (error) {
      setStatus({ msg: "Something went wrong. Please try again.", error: true });
    } else {
      setStatus({
        msg: "Request received! We'll be in touch to confirm your slot. 🪂",
        error: false,
      });
      form.reset();
    }
    setLoading(false);
  }

  return (
    <form className="booking__form" onSubmit={submit}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" required placeholder="Alex Skyward" />
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

      <div className="field-row">
        <label className="field">
          <span>Experience</span>
          <select name="service" defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Preferred date</span>
          <input name="date" type="date" />
        </label>
        <label className="field field--narrow">
          <span>People</span>
          <input name="party_size" type="number" min={1} defaultValue={1} />
        </label>
      </div>

      <label className="field">
        <span>Anything else? (optional)</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Weight, experience level, questions…"
        />
      </label>

      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? "Sending…" : "Request booking"}
      </button>

      {status && (
        <p
          className={`notice${status.error ? " notice--error" : " notice--ok"}`}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
