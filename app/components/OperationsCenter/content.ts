export const operationsCenterContent = {
  ar: {
    eyebrow: "ENTERPRISE IT OPERATIONS CENTER",
    title: "غرفة التحكم الرقمية للمؤسسة",
    description:
      "مركز قيادة تشغيلي يربط الأنظمة والبيانات والمنصات داخل رؤية موحدة لمراقبة الأداء واتخاذ القرار.",

    status: {
      label: "حالة النظام",
      value: "تشغيل مستقر",
    },

    metrics: [
      {
        label: "سلامة الأنظمة",
        value: "99.98%",
      },
      {
        label: "العقد النشطة",
        value: "248",
      },
      {
        label: "تدفقات البيانات",
        value: "1.4M / يوم",
      },
      {
        label: "عمليات الذكاء الاصطناعي",
        value: "32 RUNNING",
      },
    ],

    feed: [
      "مزامنة CRM مكتملة",
      "فحص بوابة API ناجح",
      "تحسين وكلاء الذكاء الاصطناعي قيد التشغيل",
      "اتصال العقد العالمية مستقر",
    ],
  },

  en: {
    eyebrow: "ENTERPRISE IT OPERATIONS CENTER",
    title: "Digital Command Room",
    description:
      "An operational command layer connecting systems, data, platforms, and intelligence into one control vision.",

    status: {
      label: "SYSTEM STATUS",
      value: "OPERATIONAL",
    },

    metrics: [
      {
        label: "SYSTEM HEALTH",
        value: "99.98%",
      },
      {
        label: "ACTIVE NODES",
        value: "248",
      },
      {
        label: "DATA STREAMS",
        value: "1.4M / DAY",
      },
      {
        label: "AI PROCESSES",
        value: "32 RUNNING",
      },
    ],

    feed: [
      "CRM synchronization complete",
      "API gateway health check passed",
      "AI agent optimization running",
      "Global node connection stable",
    ],
  },
} as const;

export type OperationsCenterLanguage = keyof typeof operationsCenterContent;
