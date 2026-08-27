export const glassCommandRoomContent = {
  ar: {
    eyebrow: "GLASS COMMAND ROOM",
    title: "غرفة القيادة الرقمية للمؤسسة",
    description:
      "واجهة تشغيل ذكية تربط الأنظمة والمنصات والبيانات داخل مركز قيادة رقمي واحد لمراقبة الأداء واتخاذ القرار.",

    status: {
      label: "حالة المنظومة",
      value: "جميع الأنظمة متصلة",
    },

    systems: [
      {
        name: "CRM",
        role: "إدارة العملاء والعلاقات",
        status: "ACTIVE",
      },
      {
        name: "DATA",
        role: "منظومة البيانات والتحليلات",
        status: "ONLINE",
      },
      {
        name: "AUTOMATION",
        role: "الأتمتة وسير العمليات",
        status: "RUNNING",
      },
      {
        name: "AI ENGINE",
        role: "الذكاء الاصطناعي والتحسين",
        status: "LEARNING",
      },
    ],

    metrics: [
      {
        label: "System Health",
        value: "99.98%",
      },
      {
        label: "Connected Nodes",
        value: "248",
      },
      {
        label: "Data Streams",
        value: "1.4M",
      },
    ],

    screens: [
      {
        title: "SYSTEM MAP",
        value: "CONNECTED",
        detail: "248 active nodes",
      },
      {
        title: "DATA STREAM",
        value: "LIVE",
        detail: "1.4M events/day",
      },
      {
        title: "AI ENGINE",
        value: "RUNNING",
        detail: "32 intelligent processes",
      },
    ],

    network: [
      {
        name: "CRM",
        status: "ACTIVE",
      },
      {
        name: "DATA",
        status: "ONLINE",
      },
      {
        name: "AI ENGINE",
        status: "LEARNING",
      },
      {
        name: "AUTOMATION",
        status: "RUNNING",
      },
    ],

    aiCore: {
      name: "AI COMMAND CORE",
      status: "INTELLIGENCE ONLINE",
      metric: "99.98%",
    },

  },

  en: {
    eyebrow: "GLASS COMMAND ROOM",
    title: "Enterprise Digital Command Center",
    description:
      "A spatial operating interface connecting systems, platforms, data, and intelligence into one digital command layer.",

    status: {
      label: "SYSTEM STATUS",
      value: "ALL SYSTEMS CONNECTED",
    },

    systems: [
      {
        name: "CRM",
        role: "Customer Relationship Layer",
        status: "ACTIVE",
      },
      {
        name: "DATA",
        role: "Analytics Intelligence Layer",
        status: "ONLINE",
      },
      {
        name: "AUTOMATION",
        role: "Workflow Automation Layer",
        status: "RUNNING",
      },
      {
        name: "AI ENGINE",
        role: "Artificial Intelligence Layer",
        status: "LEARNING",
      },
    ],

    metrics: [
      {
        label: "SYSTEM HEALTH",
        value: "99.98%",
      },
      {
        label: "CONNECTED NODES",
        value: "248",
      },
      {
        label: "DATA STREAMS",
        value: "1.4M",
      },
    ],

    network: [
      {
        name: "CRM",
        status: "ACTIVE",
      },
      {
        name: "DATA",
        status: "ONLINE",
      },
      {
        name: "AI ENGINE",
        status: "LEARNING",
      },
      {
        name: "AUTOMATION",
        status: "RUNNING",
      },
    ],

    aiCore: {
      name: "AI COMMAND CORE",
      status: "INTELLIGENCE ONLINE",
      metric: "99.98%",
    },

    screens: [
      {
        title: "SYSTEM MAP",
        value: "CONNECTED",
        detail: "248 active nodes",
      },
      {
        title: "DATA STREAM",
        value: "LIVE",
        detail: "1.4M events/day",
      },
      {
        title: "AI ENGINE",
        value: "RUNNING",
        detail: "32 intelligent processes",
      },
    ],
  },
} as const;

export type GlassCommandRoomLanguage =
  keyof typeof glassCommandRoomContent;
