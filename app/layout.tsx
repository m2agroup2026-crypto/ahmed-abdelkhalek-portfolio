import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Abdelkhalek | Digital Transformation Engineer",
  description: "Portfolio of Ahmed Abdelkhalek Sayed — Full-Stack Developer, Automation Systems Architect, and Digital Transformation Engineer.",
  keywords: ["Ahmed Abdelkhalek", "Digital Transformation", "Full-Stack Developer", "Automation", "CRM", "Egypt"],
  openGraph: { title: "Ahmed Abdelkhalek | Digital Transformation Engineer", description: "Beyond websites. I engineer transformation.", type: "website" },
  twitter: { card: "summary", title: "Ahmed Abdelkhalek | Digital Transformation Engineer", description: "Beyond websites. I engineer transformation." },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
