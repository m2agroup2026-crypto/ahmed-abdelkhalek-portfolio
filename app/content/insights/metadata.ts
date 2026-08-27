import type { Metadata } from "next";
import {
  getInsightBySlug,
  getInsightCategory,
  getInsightContent,
  getInsightPath,
  getInsightsIndexPath,
} from "./registry";
import { insightsUiContent } from "./ui";
import type { InsightLanguage } from "./types";
import {
  absoluteUrl,
  siteConfig,
} from "../site";

function languageAlternates(
  arabicPath: string,
  englishPath: string
) {
  return {
    ar: absoluteUrl(arabicPath),
    en: absoluteUrl(englishPath),
    "x-default": absoluteUrl(arabicPath),
  };
}

function locale(language: InsightLanguage) {
  return language === "ar" ? "ar_EG" : "en_US";
}

function alternateLocale(
  language: InsightLanguage
) {
  return language === "ar"
    ? ["en_US"]
    : ["ar_EG"];
}

export function createInsightsIndexMetadata(
  language: InsightLanguage
): Metadata {
  const ui = insightsUiContent[language];

  const arabicPath = getInsightsIndexPath("ar");
  const englishPath = getInsightsIndexPath("en");
  const canonicalPath =
    language === "ar"
      ? arabicPath
      : englishPath;

  const title =
    language === "ar"
      ? "السَّبْق | الذكاء الاصطناعي والتحول الرقمي"
      : "THE EDGE | AI & Digital Transformation";

  const description =
    language === "ar"
      ? "السَّبْق بوابة معرفية يقدم فيها أحمد عبد الخالق تحليلات عملية حول الذكاء الاصطناعي المؤسسي، والتحول الرقمي، والأتمتة، والمنصات التي تصنع قيمة حقيقية للأعمال."
      : "THE EDGE is Ahmed Abdelkhalek’s knowledge gateway for practical thinking on enterprise AI, digital transformation, automation, and platforms that create measurable business value.";

  const keywords =
    language === "ar"
      ? [
          "السَّبْق",
          "الذكاء الاصطناعي المؤسسي",
          "وكلاء الذكاء الاصطناعي",
          "التحول الرقمي",
          "الأتمتة",
          "المنصات المؤسسية",
          "أحمد عبد الخالق",
        ]
      : [
          "THE EDGE",
          "enterprise AI",
          "AI agents",
          "digital transformation",
          "automation",
          "enterprise platforms",
          "Ahmed Abdelkhalek",
        ];

  return {
    title,
    description,
    keywords,
    authors: [
      {
        name: ui.author.name,
        url: absoluteUrl("/"),
      },
    ],
    creator: ui.author.name,
    publisher: ui.author.name,
    category:
      language === "ar"
        ? "الذكاء الاصطناعي والتحول الرقمي"
        : "AI and Digital Transformation",
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: languageAlternates(
        arabicPath,
        englishPath
      ),
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
      locale: locale(language),
      alternateLocale:
        alternateLocale(language),
      title,
      description,
      siteName:
        language === "ar"
          ? "السَّبْق"
          : "THE EDGE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createInsightMetadata(
  slug: string,
  language: InsightLanguage
): Metadata {
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title:
        language === "ar"
          ? "المقال غير موجود"
          : "Insight not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const content =
    getInsightContent(article, language);

  const category =
    getInsightCategory(article.category);

  const ui = insightsUiContent[language];

  const arabicPath =
    getInsightPath(article.slug, "ar");

  const englishPath =
    getInsightPath(article.slug, "en");

  const canonicalPath =
    language === "ar"
      ? arabicPath
      : englishPath;

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: [...content.seo.keywords],
    authors: [
      {
        name: ui.author.name,
        url: absoluteUrl("/"),
      },
    ],
    creator: ui.author.name,
    publisher: ui.author.name,
    category:
      category?.label[language] ??
      content.categoryLabel,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: languageAlternates(
        arabicPath,
        englishPath
      ),
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
      type: "article",
      url: absoluteUrl(canonicalPath),
      locale: locale(language),
      alternateLocale:
        alternateLocale(language),
      title: content.seo.title,
      description: content.seo.description,
      siteName:
        language === "ar"
          ? "السَّبْق"
          : "THE EDGE",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [absoluteUrl("/")],
      tags: [...article.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
    },
    other: {
      "article:reading_time":
        String(article.readingMinutes),
      "article:author":
        siteConfig.name,
    },
  };
}
