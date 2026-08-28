import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioHome from "@/app/components/PortfolioHome/PortfolioHome";
import {
  isPortfolioSection,
  portfolioSections,
  portfolioSectionSeo,
} from "@/app/content/portfolio-navigation";
import { absoluteUrl } from "@/app/content/site";

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioSections.map((section) => ({
    section,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params;

  if (!isPortfolioSection(section)) {
    return {};
  }

  return {
    title: portfolioSectionSeo[section].ar.title,
    description: portfolioSectionSeo[section].ar.description,
    alternates: {
      canonical: absoluteUrl("/"),
      languages: {
        ar: absoluteUrl("/"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/"),
      },
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ArabicSectionPage({
  params,
}: SectionPageProps) {
  const { section } = await params;

  if (!isPortfolioSection(section)) {
    notFound();
  }

  return <PortfolioHome />;
}
