"use client";

import MobileHero from "./MobileHero";
import MobileSystems from "./MobileSystems";
import MobileCaseStudies from "./MobileCaseStudies";
import MobileJourney from "./MobileJourney";
import MobileContact from "./MobileContact";
import MobileFooter from "./MobileFooter";
import "./mobile-portfolio.css";

type Props = { language: "ar" | "en" };

export default function MobilePortfolioHome({ language }: Props) {
  return (
    <main className="mobile-portfolio-v2">
      <MobileHero language={language} />
      <MobileSystems language={language} />
      <MobileCaseStudies language={language} />
      <MobileJourney language={language} />
      <MobileContact language={language} />
      <MobileFooter language={language} />
    </main>
  );
}
