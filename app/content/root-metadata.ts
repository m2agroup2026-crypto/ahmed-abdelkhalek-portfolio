import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

export const rootMetadata: Metadata = {
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
