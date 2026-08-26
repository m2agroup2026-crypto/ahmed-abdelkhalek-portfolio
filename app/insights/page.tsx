import type { Metadata } from "next";
import InsightsIndexPage from
  "../components/Insights/InsightsIndexPage";
import {
  createInsightsIndexMetadata,
} from "../content/insights/metadata";

export const metadata: Metadata =
  createInsightsIndexMetadata("ar");

export default function ArabicInsightsPage() {
  return (
    <InsightsIndexPage language="ar" />
  );
}
