import type { Metadata } from "next";
import InsightCard from
  "../../components/Insights/InsightCard";
import {
  enterpriseAiOperatingModel,
} from "../../content/insights/articles/enterprise-ai-operating-model";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Insight Card Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InsightCardPreviewPage() {
  return (
    <PreviewClient
      arabicFeatured={
        <InsightCard
          article={enterpriseAiOperatingModel}
          language="ar"
          featured
        />
      }
      arabicStandard={
        <InsightCard
          article={enterpriseAiOperatingModel}
          language="ar"
        />
      }
      englishFeatured={
        <InsightCard
          article={enterpriseAiOperatingModel}
          language="en"
          featured
        />
      }
      englishStandard={
        <InsightCard
          article={enterpriseAiOperatingModel}
          language="en"
        />
      }
    />
  );
}
