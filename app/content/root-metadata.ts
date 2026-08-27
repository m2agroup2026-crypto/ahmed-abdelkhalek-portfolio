import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

export function createRootMetadata(
  language: "ar" | "en",
): Metadata {
  const isArabic = language === "ar";
  const title = isArabic
    ? siteConfig.arabicTitle
    : siteConfig.title;
  const description = isArabic
    ? siteConfig.arabicDescription
    : siteConfig.description;
  const authorName = isArabic
    ? siteConfig.arabicName
    : siteConfig.name;

  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: isArabic ? "%s | أحمد عبد الخالق" : "%s | Ahmed Abdelkhalek",
  },
  description,
  applicationName: authorName,
  authors: [
    {
      name: authorName,
      url: absoluteUrl(siteConfig.authorPath),
    },
  ],
  creator: authorName,
  publisher: authorName,
  keywords: [
    "Ahmed Abdelkhalek",
    "Enterprise Systems & Platform Architect",
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
    locale: isArabic ? siteConfig.alternateLocale : siteConfig.locale,
    alternateLocale: [
      isArabic ? siteConfig.locale : siteConfig.alternateLocale,
    ],
    title,
    description,
    siteName: authorName,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  };
}
