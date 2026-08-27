export const systemActivationBridgeContent = {
  ar: {
    eyebrow: "SYSTEM ACTIVATION LAYER",
    title: "تحويل الخبرة المتراكمة إلى بنية تشغيل رقمية",
    description:
      "كل طبقة من الخبرة تتحول إلى قدرة تشغيلية داخل نظام مترابط يجمع الاتصال والحوكمة والبيانات والذكاء الاصطناعي.",

    layers: [
      {
        code: "01",
        source: "الاتصال المؤسسي",
        system: "DATA INTELLIGENCE",
        detail: "الجمهور • الرسائل • البيانات",
      },
      {
        code: "02",
        source: "القيادة",
        system: "CONTROL SYSTEMS",
        detail: "التوجيه • المواءمة • التنفيذ",
      },
      {
        code: "03",
        source: "التشغيل والحوكمة",
        system: "OPERATIONAL CORE",
        detail: "الإجراءات • العقود • الضبط",
      },
      {
        code: "04",
        source: "الأنظمة الرقمية",
        system: "AI ECOSYSTEM",
        detail: "المنصات • الأتمتة • الذكاء الاصطناعي",
      },
    ],
  },

  en: {
    eyebrow: "SYSTEM ACTIVATION LAYER",
    title: "Transforming accumulated experience into digital operating architecture",
    description:
      "Each experience layer becomes an operational capability inside a connected system of communication, governance, data, and intelligence.",

    layers: [
      {
        code: "01",
        source: "Communication",
        system: "DATA INTELLIGENCE",
        detail: "Audience • Messages • Data",
      },
      {
        code: "02",
        source: "Leadership",
        system: "CONTROL SYSTEMS",
        detail: "Direction • Alignment • Execution",
      },
      {
        code: "03",
        source: "Operations & Governance",
        system: "OPERATIONAL CORE",
        detail: "Processes • Contracts • Controls",
      },
      {
        code: "04",
        source: "Digital Systems",
        system: "AI ECOSYSTEM",
        detail: "Platforms • Automation • AI",
      },
    ],
  },
} as const;

export type SystemActivationBridgeLanguage =
  keyof typeof systemActivationBridgeContent;
