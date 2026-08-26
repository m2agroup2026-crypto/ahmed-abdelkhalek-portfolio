import type { Metadata } from "next";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Floating Intelligence Assistant Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FloatingAssistantPreviewPage() {
  return <PreviewClient />;
}
