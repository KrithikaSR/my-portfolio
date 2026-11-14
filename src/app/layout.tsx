import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const sans = localFont({ src: "../fonts/InterTight.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const serif = localFont({ src: [{ path: "../fonts/InstrumentSerif.woff2", style: "normal" }, { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic" }], variable: "--f-serif", display: "swap" });
const mono = localFont({ src: "../fonts/JetBrainsMono.woff2", variable: "--f-mono", weight: "100 800", display: "swap" });

const desc = `${PROFILE.name}, ${PROFILE.role}. ${PROFILE.moreSummary}`;
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: `${PROFILE.name} — ${PROFILE.role}`, description: desc,
  openGraph: { title: `${PROFILE.name} — ${PROFILE.role}`, description: desc, images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#f4f2ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body>{children}</body></html>;
}
