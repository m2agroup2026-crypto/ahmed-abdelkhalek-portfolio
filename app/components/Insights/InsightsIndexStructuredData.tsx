import Script from "next/script";
import {
  getInsightContent,
  getInsightPath,
  getInsightsIndexPath,
  getPortfolioHomePath,
  getPublishedInsights,
} from "@/app/content/insights/registry";
import { insightsUiContent } from "@/app/content/insights/ui";
import type { InsightLanguage } from "@/app/content/insights/types";
import { absoluteUrl, siteConfig } from "@/app/content/site";

type Props = {
  language: InsightLanguage;
};

export default function InsightsIndexStructuredData({
  language,
}: Props) {
  const isArabic = language === "ar";
  const articles = getPublishedInsights();
  const ui = insightsUiContent[language];
  const indexUrl = absoluteUrl(getInsightsIndexPath(language));
  const homeUrl = absoluteUrl(getPortfolioHomePath(language));
  const websiteId = absoluteUrl("/#website");
  const personId = absoluteUrl("/#person");
  const collectionId = `${indexUrl}#collection`;
  const itemListId = `${indexUrl}#item-list`;
  const breadcrumbId = `${indexUrl}#breadcrumb`;

  const latestModified = articles.reduce<string>(
    (latest, article) =>
      article.updatedAt > latest ? article.updatedAt : latest,
    siteConfig.lastUpdated
  );

  const title = isArabic
    ? "السَّبْق — مركز المعرفة في الذكاء الاصطناعي والتحول الرقمي"
    : "THE EDGE — Enterprise AI & Digital Transformation Knowledge Hub";

  const description = isArabic
    ? "مركز معرفة ثنائي اللغة يضم تحليلات أحمد عبد الخالق حول الذكاء الاصطناعي المؤسسي ووكلاء AI والتحول الرقمي والأتمتة وهندسة المنصات."
    : "A bilingual knowledge hub by Ahmed Abdelkhalek covering enterprise AI, AI agents, digital transformation, automation, and platform architecture.";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        url: indexUrl,
        name: title,
        description,
        inLanguage: isArabic ? "ar-EG" : "en-US",
        dateModified: latestModified,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        publisher: { "@id": personId },
        mainEntity: { "@id": itemListId },
        breadcrumb: { "@id": breadcrumbId },
        about: [
          { "@type": "Thing", name: "Enterprise AI" },
          { "@type": "Thing", name: "AI Agents" },
          { "@type": "Thing", name: "Digital Transformation" },
          { "@type": "Thing", name: "Business Process Automation" },
          { "@type": "Thing", name: "Enterprise Platform Architecture" },
        ],
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: isArabic ? "مقالات السَّبْق" : "THE EDGE articles",
        numberOfItems: articles.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: articles.map((article, index) => {
          const content = getInsightContent(article, language);
          const articleUrl = absoluteUrl(
            getInsightPath(article.slug, language)
          );

          return {
            "@type": "ListItem",
            position: index + 1,
            url: articleUrl,
            item: {
              "@type": "BlogPosting",
              "@id": `${articleUrl}#article`,
              url: articleUrl,
              headline: content.title,
              description: content.seo.description,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              inLanguage: isArabic ? "ar-EG" : "en-US",
              author: { "@id": personId },
              isPartOf: { "@id": collectionId },
            },
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: ui.article.home,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isArabic ? "السَّبْق" : "THE EDGE",
            item: indexUrl,
          },
        ],
      },
    ],
  };

  return (
    <Script
      id={`insights-index-schema-${language}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
