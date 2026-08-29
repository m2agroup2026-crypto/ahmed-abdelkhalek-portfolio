import type { Metadata, Viewport } from "next";
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
      <body>
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
