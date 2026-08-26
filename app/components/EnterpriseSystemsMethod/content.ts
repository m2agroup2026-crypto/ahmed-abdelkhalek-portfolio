export const enterpriseSystemsContent = {
  ar: {
    index: "00 / منهج هندسة الأنظمة",
    title: "أحوّل تعقيد المؤسسات إلى",
    accent: "أنظمة رقمية تعمل وتتكيّف وتتوسع.",
    intro:
      "لا أبدأ من شكل الشاشة، بل من الطريقة الحقيقية التي تعمل بها المؤسسة: الأشخاص، ومسارات العمل، والقرارات، والبيانات، والصلاحيات، ونقاط التواصل. ثم أحوّل هذا التعقيد إلى معمارية رقمية مترابطة، واضحة في التشغيل، قابلة للقياس، ومهيأة للنمو.",
    principles: [
      {
        code: "01",
        title: "أفهم المؤسسة قبل بناء النظام",
        text:
          "أحلل رحلة العمل ونقاط التعطّل وتدفق البيانات ومسارات القرار، حتى يعالج الحل المشكلة الحقيقية بدل أن يضيف واجهة جديدة فوق إجراءات قديمة.",
      },
      {
        code: "02",
        title: "أصمم نواة واحدة لا أدوات منفصلة",
        text:
          "أربط المنصة وCRM والأتمتة والتكاملات والذكاء الاصطناعي داخل منظومة موحدة، بدل توزيع العمل والبيانات بين أدوات لا تتحدث معًا.",
      },
      {
        code: "03",
        title: "أبني للنمو والحوكمة والاستمرار",
        text:
          "أصمم الحلول ببنية Modular وMulti-Tenant، وصلاحيات دقيقة وسجل تدقيق وتحديثات آمنة، لتتوسع المنصة دون نسخ الكود أو فقد السيطرة.",
      },
    ],
  },
  en: {
    index: "00 / Enterprise Systems Method",
    title: "I turn enterprise complexity into",
    accent: "digital systems built to operate, adapt, and scale.",
    intro:
      "I begin with how the organization actually works—its people, workflows, decisions, data, permissions, and customer touchpoints—then engineer one connected architecture that is measurable, governable, and ready to grow.",
    principles: [
      {
        code: "01",
        title: "Understand the organization before building the system",
        text:
          "I map workflows, friction points, decision paths, and data movement so the solution addresses the real operational problem instead of placing a new interface over an old process.",
      },
      {
        code: "02",
        title: "Design one core, not disconnected tools",
        text:
          "I connect platforms, CRM, automation, integrations, and AI within one operating architecture instead of scattering work and data across isolated systems.",
      },
      {
        code: "03",
        title: "Engineer for growth, governance, and continuity",
        text:
          "I design modular, multi-tenant systems with granular permissions, audit trails, and safe upgrade paths—so the platform can scale without duplicating code or losing control.",
      },
    ],
  },
} as const;

export type EnterpriseSystemsLanguage =
  keyof typeof enterpriseSystemsContent;
