import {
  getInsightBySlug,
  getInsightCategory,
  getInsightContent,
} from "@/app/content/insights/registry";
import {
  arabicSocialImageContentType,
  arabicSocialImageSize,
  createArabicInsightSocialImage,
} from "@/app/components/Insights/ArabicInsightSocialImage";

export const alt = "مقال من السَّبْق";
export const size = arabicSocialImageSize;
export const contentType =
  arabicSocialImageContentType;

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({
  params,
}: ImageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return createArabicInsightSocialImage({
      title: "السَّبْق",
    });
  }

  const content =
    getInsightContent(article, "ar");

  const category =
    getInsightCategory(article.category);

  return createArabicInsightSocialImage({
    title: content.title,
    category:
      category?.label.ar ??
      content.categoryLabel,
  });
}
