import type { Metadata } from "next";
import CleanUrlController from "@/app/components/Routing/CleanUrlController";
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
      <body>
        <CleanUrlController />
        {children}
      </body>
    </html>
  );
}
