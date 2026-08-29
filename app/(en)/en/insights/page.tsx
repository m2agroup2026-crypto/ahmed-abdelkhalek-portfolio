import type { Metadata } from "next";
import InsightsIndexPage from
  "@/app/components/Insights/InsightsIndexPage";
import InsightsIndexStructuredData from
  "@/app/components/Insights/InsightsIndexStructuredData";
import {
  createInsightsIndexMetadata,
} from "@/app/content/insights/metadata";

export const metadata: Metadata =
  createInsightsIndexMetadata("en");

export default function EnglishInsightsPage() {
  return (
    <>
      <InsightsIndexStructuredData language="en" />
      <InsightsIndexPage language="en" />
    </>
  );
}
