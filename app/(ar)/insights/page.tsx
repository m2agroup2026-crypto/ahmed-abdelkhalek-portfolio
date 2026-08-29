import type { Metadata } from "next";
import InsightsIndexPage from
  "@/app/components/Insights/InsightsIndexPage";
import InsightsIndexStructuredData from
  "@/app/components/Insights/InsightsIndexStructuredData";
import {
  createInsightsIndexMetadata,
} from "@/app/content/insights/metadata";

export const metadata: Metadata =
  createInsightsIndexMetadata("ar");

export default function ArabicInsightsPage() {
  return (
    <>
      <InsightsIndexStructuredData language="ar" />
      <InsightsIndexPage language="ar" />
    </>
  );
}
