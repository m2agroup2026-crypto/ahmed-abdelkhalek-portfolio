export const portfolioSections = [
  "journey",
  "case-study",
  "systems",
  "expertise",
  "contact",
] as const;

export type PortfolioSection =
  (typeof portfolioSections)[number];

export type PortfolioLanguage = "ar" | "en";

export const portfolioSectionSeo: Record<
  PortfolioSection,
  Record<PortfolioLanguage, { title: string; description: string }>
> = {
  journey: {
    en: { title: "Digital Journey", description: "Ahmed Abdelkhalek's evolution from institutional communication and operations into enterprise systems architecture." },
    ar: { title: "الرحلة الرقمية", description: "تطور خبرة أحمد عبد الخالق من الاتصال والتشغيل المؤسسي إلى هندسة الأنظمة والمنصات الرقمية." },
  },
  "case-study": {
    en: { title: "Digital Transformation Case Study", description: "A command-center view of how fragmented business touchpoints become one connected digital operating system." },
    ar: { title: "دراسة حالة للتحول الرقمي", description: "رؤية عملية لكيف تتحول نقاط الأعمال المنفصلة إلى نظام تشغيل رقمي واحد ومترابط." },
  },
  systems: {
    en: { title: "Enterprise Systems Experience", description: "Explore a living enterprise operating model connecting intelligence, communication, operations, governance, and technology." },
    ar: { title: "تجربة الأنظمة المؤسسية", description: "استكشف نموذج تشغيل مؤسسي حي يربط الذكاء والاتصال والتشغيل والحوكمة والتكنولوجيا." },
  },
  expertise: {
    en: { title: "Technical Expertise", description: "Full-stack platform engineering, automation systems, CRM architecture, AI workflows, and API integration expertise." },
    ar: { title: "الخبرات التقنية", description: "خبرة في هندسة المنصات المتكاملة والأتمتة وCRM ومسارات الذكاء الاصطناعي وتكامل واجهات API." },
  },
  contact: {
    en: { title: "Contact", description: "Start a conversation with Ahmed Abdelkhalek about enterprise platforms, automation, AI, or digital transformation." },
    ar: { title: "تواصل مع أحمد عبد الخالق", description: "ابدأ محادثة حول المنصات المؤسسية أو الأتمتة أو الذكاء الاصطناعي أو تحديات التحول الرقمي." },
  },
};

export const portfolioSectionIds: Record<
  PortfolioSection,
  string
> = {
  journey: "journey",
  "case-study": "case-study",
  systems: "systems",
  expertise: "expertise",
  contact: "contact",
};

const sectionById = new Map<string, PortfolioSection>(
  Object.entries(portfolioSectionIds).map(
    ([section, id]) => [
      id,
      section as PortfolioSection,
    ]
  )
);

export function isPortfolioSection(
  value: string
): value is PortfolioSection {
  return portfolioSections.includes(
    value as PortfolioSection
  );
}

export function getPortfolioLanguageFromPath(
  pathname: string
): PortfolioLanguage {
  return pathname === "/en" ||
    pathname.startsWith("/en/")
    ? "en"
    : "ar";
}

export function getPortfolioHomePath(
  language: PortfolioLanguage
) {
  return language === "en" ? "/en" : "/";
}

export function getPortfolioSectionPath(
  section: PortfolioSection,
  language: PortfolioLanguage
) {
  return language === "en"
    ? `/en/${section}`
    : `/${section}`;
}

export function getPortfolioSectionFromPath(
  pathname: string
): PortfolioSection | null {
  const language =
    getPortfolioLanguageFromPath(pathname);

  const normalized =
    language === "en"
      ? pathname.replace(/^\/en\/?/, "")
      : pathname.replace(/^\//, "");

  const firstSegment = normalized.split("/")[0];

  return isPortfolioSection(firstSegment)
    ? firstSegment
    : null;
}

export function getPortfolioSectionFromId(
  id: string
): PortfolioSection | null {
  return sectionById.get(id) ?? null;
}
