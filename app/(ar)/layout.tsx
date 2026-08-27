import type { Metadata } from "next";
import { createRootMetadata } from "@/app/content/root-metadata";
import "@/app/globals.css";

export const metadata: Metadata = createRootMetadata("ar");

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
