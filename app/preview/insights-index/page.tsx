import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Insights Index Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InsightsIndexPreviewPage() {
  return <PreviewClient />;
}
