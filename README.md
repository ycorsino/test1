# Skylabs

A minimal Next.js splash page backed by Supabase. Landing screen shows the
**Skylabs** logo and a waitlist form that writes signups to a Supabase table.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Supabase](https://supabase.com/) (Postgres + `@supabase/supabase-js`)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon/publishable key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                        | Description                          |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) API key  |

## Database

A single `waitlist` table stores signups:

| column       | type          | notes                    |
| ------------ | ------------- | ------------------------ |
| `id`         | `uuid`        | primary key              |
| `email`      | `text`        | unique, not null         |
| `created_at` | `timestamptz` | defaults to `now()`      |

Row Level Security is enabled with a policy allowing anonymous inserts, so the
public splash page can add signups without exposing any read access.
