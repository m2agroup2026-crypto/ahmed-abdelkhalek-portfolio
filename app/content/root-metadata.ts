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
    category: "technology",
    keywords: [
      "Ahmed Abdelkhalek",
      "Enterprise Systems Architect",
      "Enterprise AI Architect",
      "Digital Transformation Architect",
      "AI Agents for Business",
      "Enterprise Platforms",
      "Business Process Automation",
      "CRM Architecture",
      "Systems Integration",
      "API Integration",
      "Digital Operating System",
      "MENA Digital Transformation",
      "GCC Enterprise Technology",
      "Saudi Arabia Digital Transformation",
      "UAE Enterprise Systems",
      "Qatar Enterprise Technology",
      "Kuwait Digital Transformation",
      "Egypt Enterprise Systems",
      "هندسة الأنظمة المؤسسية",
      "التحول الرقمي في الشرق الأوسط",
      "الذكاء الاصطناعي للمؤسسات",
      "أتمتة العمليات المؤسسية",
      "الأنظمة المؤسسية في الخليج",
      "التحول الرقمي في السعودية",
      "الأنظمة المؤسسية في الإمارات",
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
