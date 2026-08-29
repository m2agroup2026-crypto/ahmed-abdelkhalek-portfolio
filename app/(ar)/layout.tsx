import type { Metadata, Viewport } from "next";
import CleanUrlController from "@/app/components/Routing/CleanUrlController";
import PortfolioStructuredData from "@/app/components/SEO/PortfolioStructuredData";
import { createRootMetadata } from "@/app/content/root-metadata";
import "@/app/globals.css";
import "@/app/mobile-experience-polish.css";
import "@/app/mobile-experience-final.css";

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

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <PortfolioStructuredData language="ar" />
        <CleanUrlController />
        {children}
      </body>
    </html>
  );
}
