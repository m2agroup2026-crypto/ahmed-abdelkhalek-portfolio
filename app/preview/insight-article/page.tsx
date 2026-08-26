import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Insight Article Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InsightArticlePreviewPage() {
  return <PreviewClient />;
}
