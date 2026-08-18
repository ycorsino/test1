import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "Skylabs — Skydiving experiences & gear",
  description:
    "Skylabs: tandem jumps, AFF courses and licensed skydiving, plus a shop for altimeters, helmets, canopies, jumpsuits and apparel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
