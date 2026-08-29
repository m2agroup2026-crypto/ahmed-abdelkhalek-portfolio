import { siteConfig, absoluteUrl } from "@/app/content/site";
import {
  getInsightContent,
  getInsightPath,
  getPublishedInsights,
} from "@/app/content/insights/registry";

type Props = { language: "ar" | "en" };

export default function PortfolioStructuredData({ language }: Props) {
  const isArabic = language === "ar";
  const name = isArabic ? siteConfig.arabicName : siteConfig.name;
  const description = isArabic ? siteConfig.arabicDescription : siteConfig.description;
  const pageUrl = absoluteUrl(isArabic ? "/" : "/en");
  const personId = absoluteUrl("/#person");
  const websiteId = absoluteUrl("/#website");
  const publishedInsights = getPublishedInsights();

  const areaServed = siteConfig.markets.map((market) => ({
    "@type": "Country",
    name: market,
  }));

  const services = [
    {
      id: "enterprise-systems",
      name: isArabic ? "هندسة الأنظمة والمنصات المؤسسية" : "Enterprise Systems & Platform Architecture",
      alternateName: isArabic ? "Enterprise Systems Architecture" : "هندسة الأنظمة المؤسسية",
      description: isArabic
        ? "تصميم أنظمة ومنصات مؤسسية مترابطة قابلة للتوسع والحوكمة والتكامل عبر واجهات API."
        : "Architecture for connected, scalable, governable enterprise systems and platforms with API-led integration.",
      serviceType: "Enterprise Systems Architecture",
    },
    {
      id: "digital-transformation",
      name: isArabic ? "التحول الرقمي وأتمتة العمليات" : "Digital Transformation & Process Automation",
      alternateName: isArabic ? "Digital Transformation & Automation" : "التحول الرقمي والأتمتة",
      description: isArabic
        ? "تحويل مسارات العمل والتشغيل المؤسسي إلى عمليات رقمية مترابطة وقابلة للقياس والأتمتة."
        : "Transforming business workflows and enterprise operations into connected, measurable, automated digital processes.",
      serviceType: "Digital Transformation",
    },
    {
      id: "enterprise-ai",
      name: isArabic ? "الذكاء الاصطناعي ووكلاء الأعمال للمؤسسات" : "Enterprise AI & AI Agents",
      alternateName: isArabic ? "Enterprise AI" : "الذكاء الاصطناعي للمؤسسات",
      description: isArabic
        ? "تصميم حلول ذكاء اصطناعي ووكلاء أعمال متكاملين مع البيانات والعمليات والحوكمة المؤسسية."
        : "Enterprise AI and agentic systems connected to operational data, workflows, controls, and human governance.",
      serviceType: "Enterprise AI",
    },
    {
      id: "crm-connected-platforms",
      name: isArabic ? "هندسة CRM والمنصات الرقمية المترابطة" : "CRM Architecture & Connected Digital Platforms",
      alternateName: isArabic ? "CRM Architecture" : "هندسة إدارة علاقات العملاء",
      description: isArabic
        ? "بناء معماريات CRM ومنصات رقمية توحد العملاء والبيانات والقنوات والمتابعات داخل نظام تشغيل واحد."
        : "CRM and connected-platform architecture that unifies customer data, channels, follow-up, and operations in one system.",
      serviceType: "CRM Architecture",
    },
  ];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
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
        homeLocation: {
          "@type": "Place",
          name: isArabic ? "مصر" : "Egypt",
          address: {
            "@type": "PostalAddress",
            addressCountry: "EG",
          },
        },
        knowsLanguage: ["Arabic", "English"],
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
          "AI Agents",
          "API Integration",
          "Systems Integration",
          "Digital Operating Systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name,
        description,
        inLanguage: ["ar-EG", "en"],
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: isArabic ? siteConfig.arabicTitle : siteConfig.title,
        description,
        inLanguage: isArabic ? "ar-EG" : "en",
        dateModified: siteConfig.lastUpdated,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
        hasPart: publishedInsights.map((article) => {
          const content = getInsightContent(article, language);
          return {
            "@type": "Article",
            headline: content.title,
            url: absoluteUrl(getInsightPath(article.slug, language)),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { "@id": personId },
          };
        }),
      },
      ...services.map((service) => ({
        "@type": "Service",
        "@id": absoluteUrl(`/#service-${service.id}`),
        name: service.name,
        alternateName: service.alternateName,
        description: service.description,
        serviceType: service.serviceType,
        provider: { "@id": personId },
        areaServed,
        url: pageUrl,
      })),
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
