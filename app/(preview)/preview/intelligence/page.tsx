import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Ahmed Intelligence Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function IntelligencePreviewPage() {
  return <PreviewClient />;
}
