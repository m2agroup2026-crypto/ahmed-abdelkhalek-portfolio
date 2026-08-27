import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Enterprise Systems Method Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnterpriseSystemsPreviewPage() {
  return <PreviewClient />;
}
