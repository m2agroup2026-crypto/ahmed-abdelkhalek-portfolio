export const experienceSystemTransitionContent = {
  ar: {
    eyebrow: "SYSTEM ACTIVATION SEQUENCE",
    title: "تحويل الخبرة إلى نظام تشغيل ذكي",
    description:
      "تنتقل طبقات الخبرة من المعرفة التشغيلية إلى منظومة رقمية مترابطة جاهزة للقيادة والتحليل والتنفيذ.",

    signal: {
      label: "EXPERIENCE LAYERS",
      value: "04 SYNCHRONIZED",
    },

    core: {
      title: "ACTIVATION CORE",
      status: "SYSTEM READY",
    },
  },

  en: {
    eyebrow: "SYSTEM ACTIVATION SEQUENCE",
    title: "Transforming Experience Into Intelligent Operations",
    description:
      "Experience layers evolve into a connected digital operating system built for intelligence, governance, and execution.",

    signal: {
      label: "EXPERIENCE LAYERS",
      value: "04 SYNCHRONIZED",
    },

    core: {
      title: "ACTIVATION CORE",
      status: "SYSTEM READY",
    },
  },
} as const;

export type ExperienceSystemTransitionLanguage =
  keyof typeof experienceSystemTransitionContent;
