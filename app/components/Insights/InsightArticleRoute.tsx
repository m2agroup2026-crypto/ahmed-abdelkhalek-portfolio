import Script from "next/script";
import { notFound } from "next/navigation";
import {
  getInsightBySlug,
  getInsightCategory,
  getInsightContent,
  getInsightPath,
} from "../../content/insights/registry";
import {
  insightsUiContent,
} from "../../content/insights/ui";
import type {
  InsightLanguage,
} from "../../content/insights/types";
import InsightArticlePage from
  "./InsightArticlePage";

type InsightArticleRouteProps = {
  slug: string;
  language: InsightLanguage;
};

export default function InsightArticleRoute({
  slug,
  language,
}: InsightArticleRouteProps) {
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const content =
    getInsightContent(article, language);

  const category =
    getInsightCategory(article.category);

  const ui = insightsUiContent[language];

  const articlePath =
    getInsightPath(article.slug, language);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.seo.description,
    inLanguage:
      language === "ar" ? "ar" : "en",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articlePath,
    articleSection:
      category?.label[language] ??
      content.categoryLabel,
    keywords: content.seo.keywords.join(", "),
    author: {
      "@type": "Person",
      name: ui.author.name,
      jobTitle: ui.author.role,
    },
    publisher: {
      "@type": "Person",
      name: ui.author.name,
    },
  };

  return (
    <>
      <Script
        id={[
          "insight-article-schema",
          language,
          article.slug,
        ].join("-")}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
        }}
      />

      <InsightArticlePage
        article={article}
        language={language}
      />
    </>
  );
}
