export const siteConfig = {
  url: "https://ahmed.m2agroupeg.com",
  name: "Ahmed Abdelkhalek",
  arabicName: "أحمد عبد الخالق",
  title: "Ahmed Abdelkhalek | Enterprise Systems & AI Architect — MENA & GCC",
  arabicTitle: "أحمد عبد الخالق | مهندس الأنظمة المؤسسية والذكاء الاصطناعي — الشرق الأوسط والخليج",
  description:
    "Enterprise systems architect specializing in digital transformation, AI agents, CRM, automation, and scalable platforms for organizations across Egypt, Saudi Arabia, the UAE, the GCC, and MENA.",
  arabicDescription:
    "مهندس أنظمة مؤسسية وتحول رقمي متخصص في منصات الأعمال وCRM والأتمتة ووكلاء الذكاء الاصطناعي للمؤسسات في مصر والسعودية والإمارات والخليج والشرق الأوسط.",
  locale: "en_US",
  alternateLocale: "ar_EG",
  authorPath: "/",
  lastUpdated: "2026-08-29",
  markets: [
    "Egypt",
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ],
} as const;

export const siteHostname = new URL(siteConfig.url).hostname;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
