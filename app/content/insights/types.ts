export type InsightLanguage = "ar" | "en";

export type InsightCategory =
  | "enterprise-ai"
  | "digital-transformation"
  | "application-engineering"
  | "enterprise-platforms"
  | "crm-automation";

export type InsightStatus =
  | "draft"
  | "published";

export type InsightTextBlock = {
  type: "paragraph";
  text: string;
};

export type InsightHeadingBlock = {
  type: "heading";
  text: string;
};

export type InsightListBlock = {
  type: "list";
  items: readonly string[];
};

export type InsightCalloutBlock = {
  type: "callout";
  title: string;
  text: string;
};

export type InsightQuoteBlock = {
  type: "quote";
  text: string;
};

export type InsightContentBlock =
  | InsightTextBlock
  | InsightHeadingBlock
  | InsightListBlock
  | InsightCalloutBlock
  | InsightQuoteBlock;

export type LocalizedInsightContent = {
  title: string;
  excerpt: string;
  categoryLabel: string;
  readingLabel: string;
  heroEyebrow: string;
  introduction: string;
  blocks: readonly InsightContentBlock[];
  conclusion: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
};

export type InsightArticle = {
  slug: string;
  category: InsightCategory;
  status: InsightStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  coverVariant:
    | "cyan"
    | "gold"
    | "lime"
    | "violet"
    | "blue";
  tags: readonly string[];
  relatedSlugs: readonly string[];
  content: Record<
    InsightLanguage,
    LocalizedInsightContent
  >;
};

export type InsightCategoryDefinition = {
  id: InsightCategory;
  order: number;
  label: Record<InsightLanguage, string>;
  description: Record<InsightLanguage, string>;
};
