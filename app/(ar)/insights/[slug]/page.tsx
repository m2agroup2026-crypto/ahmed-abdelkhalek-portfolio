import type { Metadata } from "next";
import InsightArticleRoute from
  "@/app/components/Insights/InsightArticleRoute";
import {
  createInsightMetadata,
} from "@/app/content/insights/metadata";
import {
  getPublishedInsights,
} from "@/app/content/insights/registry";

type InsightArticleRoutePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedInsights().map(
    (article) => ({
      slug: article.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: InsightArticleRoutePageProps): Promise<Metadata> {
  const { slug } = await params;

  return createInsightMetadata(
    slug,
    "ar"
  );
}

export default async function ArabicInsightArticlePage({
  params,
}: InsightArticleRoutePageProps) {
  const { slug } = await params;

  return (
    <InsightArticleRoute
      slug={slug}
      language="ar"
    />
  );
}
