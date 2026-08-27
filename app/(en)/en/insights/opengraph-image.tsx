import {
  createInsightSocialImage,
  insightSocialImageContentType,
  insightSocialImageSize,
} from "@/app/components/Insights/InsightSocialImage";

export const alt =
  "THE EDGE — Ahmed Abdelkhalek’s knowledge gateway";
export const size = insightSocialImageSize;
export const contentType = insightSocialImageContentType;

export default function Image() {
  return createInsightSocialImage({
    language: "en",
    title:
      "Practical thinking at the intersection of AI, strategy, and value",
  });
}
