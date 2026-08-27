export const siteConfig = {
  url: "https://ahmed.m2agroupeg.com",
  name: "Ahmed Abdelkhalek",
  arabicName: "أحمد عبد الخالق",
  title: "Ahmed Abdelkhalek | Digital Transformation Engineer",
  description:
    "Enterprise platforms, automation systems, AI solutions, and digital transformation engineered around measurable business value.",
  locale: "en_US",
  alternateLocale: "ar_EG",
  authorPath: "/",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
