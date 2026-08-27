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

export const portfolioSectionIds: Record<
  PortfolioSection,
  string
> = {
  journey: "journey",
  "case-study": "case-study",
  systems: "enterprise-systems-method",
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
