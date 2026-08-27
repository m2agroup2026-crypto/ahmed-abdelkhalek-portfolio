import {
  arabicSocialImageContentType,
  arabicSocialImageSize,
  createArabicInsightSocialImage,
} from "@/app/components/Insights/ArabicInsightSocialImage";

export const alt =
  "السَّبْق — بوابة أحمد عبد الخالق إلى المعرفة";
export const size = arabicSocialImageSize;
export const contentType =
  arabicSocialImageContentType;

export default function Image() {
  return createArabicInsightSocialImage({
    title:
      "أفكار عملية عند تقاطع الذكاء الاصطناعي والاستراتيجية والقيمة",
  });
}
