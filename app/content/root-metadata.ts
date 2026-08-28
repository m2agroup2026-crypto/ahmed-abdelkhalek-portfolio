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
  const canonicalPath = isArabic ? "/" : "/en";
  const homeLanguages = {
    ar: absoluteUrl("/"),
    en: absoluteUrl("/en"),
    "x-default": absoluteUrl("/"),
  };

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
    "Digital Operating System",
    "Middle East Digital Transformation",
    "Gulf Enterprise Technology",
    "Saudi Arabia Digital Transformation",
    "UAE Enterprise Systems",
    "التحول الرقمي في الشرق الأوسط",
    "الأنظمة المؤسسية في الخليج",
    "هندسة منصات الأعمال",
    "Egypt",
  ],
  alternates: {
    canonical: absoluteUrl(canonicalPath),
    languages: homeLanguages,
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
    url: absoluteUrl(canonicalPath),
    locale: isArabic ? siteConfig.alternateLocale : siteConfig.locale,
    alternateLocale: [
      isArabic ? siteConfig.locale : siteConfig.alternateLocale,
    ],
    title,
    description,
    siteName: authorName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  };
}
