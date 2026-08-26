import {
  enterpriseAiOperatingModel,
} from "./articles/enterprise-ai-operating-model";
import {
  insightArticleRoadmap,
  insightCategories,
} from "./catalog";
import type {
  InsightArticle,
  InsightCategory,
  InsightLanguage,
} from "./types";

const insightRegistry = [
  enterpriseAiOperatingModel,
] as const satisfies readonly InsightArticle[];

const roadmapSlugs = new Set(
  insightArticleRoadmap.map(
    (article) => article.slug
  )
);

const publishedSlugs = insightRegistry.map(
  (article) => article.slug
);

if (
  new Set(publishedSlugs).size !==
  publishedSlugs.length
) {
  throw new Error(
    "Published insight registry contains duplicate slugs"
  );
}

for (const article of insightRegistry) {
  if (!roadmapSlugs.has(article.slug)) {
    throw new Error(
      `Published insight is missing from roadmap: ${article.slug}`
    );
  }

  for (
    const relatedSlug
    of article.relatedSlugs
  ) {
    if (!roadmapSlugs.has(relatedSlug)) {
      throw new Error(
        `Unknown related insight slug: ${relatedSlug}`
      );
    }

    const articleSlug: string =
      article.slug;

    const relatedSlugValue: string =
      relatedSlug;

    if (
      relatedSlugValue === articleSlug
    ) {
      throw new Error(
        `Insight cannot relate to itself: ${articleSlug}`
      );
    }
  }
}

export function getPublishedInsights() {
  return [...insightRegistry]
    .filter(
      (article) =>
        article.status === "published"
    )
    .sort(
      (first, second) =>
        second.publishedAt.localeCompare(
          first.publishedAt
        )
    );
}

export function getInsightBySlug(
  slug: string
) {
  return getPublishedInsights().find(
    (article) => article.slug === slug
  );
}

export function getFeaturedInsights(
  limit = 4
) {
  return getPublishedInsights()
    .filter((article) => article.featured)
    .slice(0, Math.max(0, limit));
}

export function getRelatedInsights(
  article: InsightArticle,
  limit = 3
) {
  const relatedOrder = new Map(
    article.relatedSlugs.map(
      (slug, index) => [slug, index]
    )
  );

  return getPublishedInsights()
    .filter(
      (candidate) =>
        relatedOrder.has(candidate.slug)
    )
    .sort(
      (first, second) =>
        (
          relatedOrder.get(first.slug) ?? 0
        ) -
        (
          relatedOrder.get(second.slug) ?? 0
        )
    )
    .slice(0, Math.max(0, limit));
}

export function getInsightCategory(
  categoryId: InsightCategory
) {
  return insightCategories.find(
    (category) =>
      category.id === categoryId
  );
}

export function getInsightContent(
  article: InsightArticle,
  language: InsightLanguage
) {
  return article.content[language];
}

export function getInsightPath(
  slug: string,
  language: InsightLanguage
) {
  return language === "ar"
    ? `/insights/${slug}`
    : `/en/insights/${slug}`;
}

export function getInsightsIndexPath(
  language: InsightLanguage
) {
  return language === "ar"
    ? "/insights"
    : "/en/insights";
}
