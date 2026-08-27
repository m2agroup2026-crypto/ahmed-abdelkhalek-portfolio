import type { Metadata } from "next";
import { createRootMetadata } from "@/app/content/root-metadata";
import "@/app/globals.css";

export const metadata: Metadata = createRootMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
