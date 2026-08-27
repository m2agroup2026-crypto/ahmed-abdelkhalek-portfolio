import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Ahmed Abdelkhalek",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: absoluteUrl(siteConfig.authorPath),
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Ahmed Abdelkhalek",
    "Digital Transformation Engineer",
    "Enterprise AI",
    "AI Agents",
    "Enterprise Platforms",
    "Automation Systems",
    "CRM Architecture",
    "Egypt",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    locale: siteConfig.locale,
    alternateLocale: [
      siteConfig.alternateLocale,
    ],
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
