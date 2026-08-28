export const siteConfig = {
  url: "https://ahmed.m2agroupeg.com",
  name: "Ahmed Abdelkhalek",
  arabicName: "أحمد عبد الخالق",
  title: "Ahmed Abdelkhalek | Digital Transformation & Enterprise Systems Architect",
  arabicTitle: "أحمد عبد الخالق | مهندس التحول الرقمي والأنظمة المؤسسية",
  description:
    "Enterprise systems, digital operating platforms, CRM architecture, automation, and AI engineered for scalable transformation across Egypt, the Gulf, and the Middle East.",
  arabicDescription:
    "أصمم أنظمة ومنصات مؤسسية تربط التشغيل وCRM والأتمتة والذكاء الاصطناعي داخل معماريات قابلة للتوسع والحوكمة في مصر والخليج والشرق الأوسط.",
  locale: "en_US",
  alternateLocale: "ar_EG",
  authorPath: "/",
} as const;

export const siteHostname = new URL(siteConfig.url).hostname;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
