import type { Metadata } from "next";
import {
  getInsightBySlug,
  getInsightCategory,
  getInsightContent,
} from "./registry";
import {
  insightsUiContent,
} from "./ui";
import type {
  InsightLanguage,
} from "./types";

export function createInsightsIndexMetadata(
  language: InsightLanguage
): Metadata {
  const ui = insightsUiContent[language];

  const title =
    language === "ar"
      ? "الرؤى والهندسة الرقمية | أحمد عبد الخالق"
      : "Insights & Digital Engineering | Ahmed Abdelkhalek";

  const description =
    language === "ar"
      ? "رؤى عملية يقدمها أحمد عبد الخالق في الذكاء الاصطناعي المؤسسي، والتحول الرقمي، وهندسة التطبيقات، والمنصات، وCRM والأتمتة."
      : "Practical insights by Ahmed Abdelkhalek on enterprise AI, digital transformation, application engineering, platforms, CRM, and automation.";

  const keywords =
    language === "ar"
      ? [
          "الذكاء الاصطناعي المؤسسي",
          "التحول الرقمي",
          "هندسة التطبيقات",
          "المنصات المؤسسية",
          "CRM والأتمتة",
          "أحمد عبد الخالق",
        ]
      : [
          "enterprise AI",
          "digital transformation",
          "application engineering",
          "enterprise platforms",
          "CRM automation",
          "Ahmed Abdelkhalek",
        ];

  return {
    title,
    description,
    keywords,
    authors: [
      {
        name: ui.author.name,
      },
    ],
    creator: ui.author.name,
    publisher: ui.author.name,
    category:
      language === "ar"
        ? "التقنية والهندسة الرقمية"
        : "Technology and Digital Engineering",
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
      locale:
        language === "ar"
          ? "ar_EG"
          : "en_US",
      title,
      description,
      siteName: ui.brand.name,
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

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: [...content.seo.keywords],
    authors: [
      {
        name: ui.author.name,
      },
    ],
    creator: ui.author.name,
    publisher: ui.author.name,
    category:
      category?.label[language] ??
      content.categoryLabel,
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
      locale:
        language === "ar"
          ? "ar_EG"
          : "en_US",
      title: content.seo.title,
      description: content.seo.description,
      siteName: ui.brand.name,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [ui.author.name],
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
    },
  };
}
