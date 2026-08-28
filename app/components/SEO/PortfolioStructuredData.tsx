import { siteConfig, absoluteUrl } from "@/app/content/site";

type Props = { language: "ar" | "en" };

export default function PortfolioStructuredData({ language }: Props) {
  const isArabic = language === "ar";
  const name = isArabic ? siteConfig.arabicName : siteConfig.name;
  const description = isArabic ? siteConfig.arabicDescription : siteConfig.description;
  const pageUrl = absoluteUrl(isArabic ? "/" : "/en");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name,
        alternateName: isArabic ? siteConfig.name : siteConfig.arabicName,
        url: pageUrl,
        image: absoluteUrl("/ahmed-abdelkhalek-v2.jpg"),
        jobTitle: isArabic
          ? "مهندس التحول الرقمي والأنظمة والمنصات المؤسسية"
          : "Digital Transformation & Enterprise Systems Architect",
        description,
        address: {
          "@type": "PostalAddress",
          addressLocality: isArabic ? "أسيوط" : "Assiut",
          addressCountry: "EG",
        },
        sameAs: [
          "https://www.facebook.com/ahmed.abdelkhalek2/",
          "https://www.instagram.com/ahmed.khalek.pr/",
          "https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/",
        ],
        knowsAbout: [
          "Digital Transformation",
          "Enterprise Systems Architecture",
          "Platform Engineering",
          "CRM Architecture",
          "Business Process Automation",
          "Enterprise AI",
          "API Integration",
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name,
        description,
        inLanguage: isArabic ? "ar-EG" : "en",
        author: { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: isArabic ? siteConfig.arabicTitle : siteConfig.title,
        description,
        inLanguage: isArabic ? "ar-EG" : "en",
        mainEntity: { "@id": absoluteUrl("/#person") },
        isPartOf: { "@id": absoluteUrl("/#website") },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
