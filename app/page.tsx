"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ msg: string; error: boolean } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  async function joinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      const msg =
        error.code === "23505"
          ? "You're already on the list ✨"
          : "Something went wrong. Try again.";
      setStatus({ msg, error: error.code !== "23505" });
    } else {
      setStatus({ msg: "You're on the list. See you soon 🚀", error: false });
      setEmail("");
    }
    setLoading(false);
  }

  return (
    <main className="splash">
      <h1 className="logo">Skylabs</h1>
      <p className="tagline">
        We&apos;re building something in the clouds. Join the waitlist to be the
        first to know.
      </p>

      <form className="waitlist" onSubmit={joinWaitlist}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Join"}
        </button>
      </form>

      <p className={`status${status?.error ? " error" : ""}`}>
        {status?.msg ?? ""}
      </p>
    </main>
  );
}
