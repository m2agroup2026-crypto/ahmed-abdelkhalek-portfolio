import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Enterprise Hero Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnterpriseHeroPreviewPage() {
  return <PreviewClient />;
}
