import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import CleanUrlController from "@/app/components/Routing/CleanUrlController";
import PortfolioStructuredData from "@/app/components/SEO/PortfolioStructuredData";
import { createRootMetadata } from "@/app/content/root-metadata";
import "@/app/globals.css";
import "@/app/mobile-experience-polish.css";
import "@/app/mobile-experience-final.css";
import "@/app/mobile-footer-readable.css";
import "@/app/mobile-last-mile.css";
import "@/app/mobile-professional-identity-correction.css";
import "@/app/mobile-performance-final.css";
import "@/app/mobile-cairo-restore.css";
import "@/app/footer-final-correction.css";
import "@/app/mobile-systems-expertise-boundary.css";

const cairoCritical = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Arial"],
});

export const metadata: Metadata = createRootMetadata("ar");
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#070a09" },
  ],
};

const themeBootstrap = `
(function(){
  try {
    var saved = localStorage.getItem("ahmed-portfolio-theme");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  } catch (_) {}
})();`;

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairoCritical.className}>
        <Script id="theme-bootstrap-ar" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <PortfolioStructuredData language="ar" />
        <CleanUrlController />
        {children}
      </body>
    </html>
  );
}
