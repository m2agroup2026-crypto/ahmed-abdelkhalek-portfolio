import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewRootLayout({
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
