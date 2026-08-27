import type { MetadataRoute } from "next";
import {
  getInsightPath,
  getPublishedInsights,
} from "./content/insights/registry";
import { absoluteUrl } from "./content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedInsights();

  const latestUpdate = articles.reduce(
    (latest, article) =>
      article.updatedAt > latest
        ? article.updatedAt
        : latest,
    "2026-01-01"
  );

  const insightEntries: MetadataRoute.Sitemap =
    articles.flatMap((article) => {
      const arabicPath = getInsightPath(
        article.slug,
        "ar"
      );

      const englishPath = getInsightPath(
        article.slug,
        "en"
      );

      const languages = {
        ar: absoluteUrl(arabicPath),
        en: absoluteUrl(englishPath),
        "x-default": absoluteUrl(arabicPath),
      };

      return [
        {
          url: absoluteUrl(arabicPath),
          lastModified: article.updatedAt,
          changeFrequency: "monthly" as const,
          priority: article.featured ? 0.9 : 0.8,
          alternates: { languages },
        },
        {
          url: absoluteUrl(englishPath),
          lastModified: article.updatedAt,
          changeFrequency: "monthly" as const,
          priority: article.featured ? 0.9 : 0.8,
          alternates: { languages },
        },
      ];
    });

  const indexLanguages = {
    ar: absoluteUrl("/insights"),
    en: absoluteUrl("/en/insights"),
    "x-default": absoluteUrl("/insights"),
  };

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/insights"),
      lastModified: latestUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: indexLanguages,
      },
    },
    {
      url: absoluteUrl("/en/insights"),
      lastModified: latestUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: indexLanguages,
      },
    },
    ...insightEntries,
  ];
}
