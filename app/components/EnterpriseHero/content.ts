export const enterpriseHeroContent = {
  ar: {
    identity: "أحمد عبد الخالق",
    role: "مهندس أنظمة ومنصات مؤسسية",
    status: "متاح للشراكات والمشروعات المؤسسية",
    title: {
      lead: "أحوّل تعقيد المؤسسات إلى",
      accent: "نظام رقمي واحد يعمل بذكاء.",
    },
    intro:
      "أصمم منصات مؤسسية تربط التشغيل وCRM والأتمتة والذكاء الاصطناعي داخل معمارية واحدة قابلة للتوسع والحوكمة والتخصيص.",
    primaryAction: {
      label: "استكشف الأنظمة التي أبنيها",
      href: "#enterprise-systems-method",
    },
    secondaryAction: {
      label: "شاهد دراسة حالة M2A",
      href: "#case-study",
    },
    systemLabel: "ENTERPRISE SYSTEMS ARCHITECTURE",
    systemStatus: "ARCHITECTURE ONLINE",
    portraitAlt:
      "أحمد عبد الخالق، مهندس أنظمة ومنصات مؤسسية",
    capabilities: [
      {
        code: "01",
        label: "منصات مؤسسية",
        technicalLabel: "ENTERPRISE PLATFORMS",
      },
      {
        code: "02",
        label: "الذكاء والأتمتة",
        technicalLabel: "AI & AUTOMATION",
      },
      {
        code: "03",
        label: "هندسة CRM",
        technicalLabel: "CRM ARCHITECTURE",
      },
      {
        code: "04",
        label: "أنظمة White-Label",
        technicalLabel: "WHITE-LABEL SYSTEMS",
      },
    ],
  },
  en: {
    identity: "Ahmed Abdelkhalek",
    role: "Enterprise Systems & Platform Architect",
    status: "Available for enterprise projects and partnerships",
    title: {
      lead: "I turn enterprise complexity into",
      accent: "one intelligent digital operating system.",
    },
    intro:
      "I design enterprise platforms that connect operations, CRM, automation, and AI within one scalable, governable, and configurable architecture.",
    primaryAction: {
      label: "Explore the systems I build",
      href: "#enterprise-systems-method",
    },
    secondaryAction: {
      label: "View the M2A case study",
      href: "#case-study",
    },
    systemLabel: "ENTERPRISE SYSTEMS ARCHITECTURE",
    systemStatus: "ARCHITECTURE ONLINE",
    portraitAlt:
      "Ahmed Abdelkhalek, Enterprise Systems and Platform Architect",
    capabilities: [
      {
        code: "01",
        label: "Enterprise Platforms",
        technicalLabel: "ENTERPRISE PLATFORMS",
      },
      {
        code: "02",
        label: "AI & Automation",
        technicalLabel: "AI & AUTOMATION",
      },
      {
        code: "03",
        label: "CRM Architecture",
        technicalLabel: "CRM ARCHITECTURE",
      },
      {
        code: "04",
        label: "White-Label Systems",
        technicalLabel: "WHITE-LABEL SYSTEMS",
      },
    ],
  },
} as const;

export type EnterpriseHeroLanguage =
  keyof typeof enterpriseHeroContent;
