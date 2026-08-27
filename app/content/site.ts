export const siteConfig = {
  url: "https://ahmed.m2agroupeg.com",
  name: "Ahmed Abdelkhalek",
  arabicName: "أحمد عبد الخالق",
  title: "Ahmed Abdelkhalek | Enterprise Systems & Platform Architect",
  arabicTitle: "أحمد عبد الخالق | مهندس أنظمة ومنصات مؤسسية",
  description:
    "Enterprise systems, digital operating platforms, CRM architecture, automation, and AI engineered into scalable, governable solutions for business transformation.",
  arabicDescription:
    "أصمم أنظمة ومنصات مؤسسية تربط التشغيل وCRM والأتمتة والذكاء الاصطناعي داخل معماريات قابلة للتوسع والحوكمة والتخصيص.",
  locale: "en_US",
  alternateLocale: "ar_EG",
  authorPath: "/",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
