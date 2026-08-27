import {
  getInsightBySlug,
  getInsightCategory,
  getInsightContent,
} from "../../../content/insights/registry";
import {
  createInsightSocialImage,
  insightSocialImageContentType,
  insightSocialImageSize,
} from "../../../components/Insights/InsightSocialImage";

export const alt = "Article from THE EDGE";
export const size = insightSocialImageSize;
export const contentType = insightSocialImageContentType;

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({
  params,
}: ImageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return createInsightSocialImage({
      language: "en",
      title: "THE EDGE",
    });
  }

  const content =
    getInsightContent(article, "en");

  const category =
    getInsightCategory(article.category);

  return createInsightSocialImage({
    language: "en",
    title: content.title,
    category:
      category?.label.en ??
      content.categoryLabel,
  });
}
