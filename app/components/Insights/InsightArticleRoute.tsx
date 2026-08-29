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
import {
  absoluteUrl,
} from "../../content/site";
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

  const articleUrl =
    absoluteUrl(articlePath);

  const homeUrl = absoluteUrl(
    language === "ar" ? "/" : "/en"
  );

  const indexUrl = absoluteUrl(
    language === "ar"
      ? "/insights"
      : "/en/insights"
  );

  const personId =
    `${absoluteUrl("/")}#person`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: content.title,
        description: content.seo.description,
        inLanguage:
          language === "ar" ? "ar-EG" : "en-US",
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": indexUrl,
          name:
            language === "ar"
              ? "السَّبْق"
              : "THE EDGE",
        },
        articleSection:
          category?.label[language] ??
          content.categoryLabel,
        keywords: [
          ...content.seo.keywords,
          ...article.tags,
        ],
        about: article.tags.map((tag) => ({
          "@type": "Thing",
          name: tag,
        })),
        author: {
          "@type": "Person",
          "@id": personId,
          name: ui.author.name,
          url: absoluteUrl("/"),
          jobTitle: ui.author.role,
        },
        publisher: {
          "@type": "Person",
          "@id": personId,
          name: ui.author.name,
          url: absoluteUrl("/"),
        },
        copyrightHolder: {
          "@id": personId,
        },
        copyrightYear:
          new Date(article.publishedAt)
            .getUTCFullYear(),
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: language === "ar" ? "الرئيسية" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: language === "ar" ? "السَّبْق" : "THE EDGE",
            item: indexUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.title,
            item: articleUrl,
          },
        ],
      },
    ],
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
