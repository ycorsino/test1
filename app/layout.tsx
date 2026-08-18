import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "SKYLABS — Skydiving & Gear",
  description:
    "SKYLABS. Tandem jumps, freefall courses and licensed skydiving, plus a shop built for the sky. Own the air.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Archivo:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <SiteHeader />
          <div className="page">{children}</div>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
