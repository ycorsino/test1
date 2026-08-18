import { createClient } from "@supabase/supabase-js";

// These are public, browser-exposed values (the URL and the publishable/anon
// key are shipped in the client bundle by design; Row Level Security protects
// the data). They're inlined as fallbacks so the app builds and runs anywhere —
// including hosts like Vercel that don't read committed .env files — while still
// allowing overrides via environment variables.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://jfaaxnskblmdksffoqnq.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_FbMXe18yUPu38Ugha4prYg_Yz7FBAmU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
