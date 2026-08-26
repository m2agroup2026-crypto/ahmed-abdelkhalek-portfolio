export const insightsUiContent = {
  ar: {
    brand: {
      eyebrow:
        "AHMED ABDELKHALEK / KNOWLEDGE SYSTEM",
      name: "الرؤى والهندسة الرقمية",
    },
    index: {
      eyebrow:
        "INSIGHTS & DIGITAL ENGINEERING",
      title: "معرفة تساعدك على",
      accent:
        "رؤية النظام خلف التقنية.",
      introduction:
        "رؤى عملية في الذكاء الاصطناعي والتحول الرقمي وهندسة التطبيقات والمنصات المؤسسية؛ تربط التقنية بالعمليات والقرارات والحوكمة والقيمة.",
      allCategories: "جميع الرؤى",
      featuredLabel: "رؤية مختارة",
      latestLabel: "أحدث المقالات",
      empty:
        "لا توجد مقالات منشورة في هذا المسار حاليًا.",
    },
    article: {
      backToInsights:
        "العودة إلى جميع الرؤى",
      published: "نُشر",
      updated: "آخر تحديث",
      authorLabel: "كتبه",
      introductionLabel:
        "مدخل إلى الرؤية",
      conclusionLabel:
        "الخلاصة التنفيذية",
      relatedEyebrow:
        "CONTINUE EXPLORING",
      relatedTitle:
        "رؤى مرتبطة بالموضوع",
      switchLanguage:
        "Read in English",
      home: "العودة إلى الموقع",
    },
    author: {
      name: "أحمد عبد الخالق",
      initials: "AA",
      role:
        "مهندس أنظمة ومنصات مؤسسية",
      bio:
        "أصمم منصات وأنظمة رقمية تربط العمليات والبيانات وCRM والأتمتة والذكاء الاصطناعي داخل معمارية قابلة للتوسع والحوكمة.",
    },
  },
  en: {
    brand: {
      eyebrow:
        "AHMED ABDELKHALEK / KNOWLEDGE SYSTEM",
      name:
        "Insights & Digital Engineering",
    },
    index: {
      eyebrow:
        "INSIGHTS & DIGITAL ENGINEERING",
      title:
        "Knowledge that reveals",
      accent:
        "the system behind the technology.",
      introduction:
        "Practical thinking on enterprise AI, digital transformation, application engineering, and enterprise platforms—connecting technology with operations, decisions, governance, and value.",
      allCategories: "All insights",
      featuredLabel: "Featured insight",
      latestLabel: "Latest articles",
      empty:
        "No published articles are available in this track yet.",
    },
    article: {
      backToInsights:
        "Back to all insights",
      published: "Published",
      updated: "Last updated",
      authorLabel: "Written by",
      introductionLabel:
        "Opening perspective",
      conclusionLabel:
        "Executive conclusion",
      relatedEyebrow:
        "CONTINUE EXPLORING",
      relatedTitle:
        "Related insights",
      switchLanguage:
        "اقرأ المقال بالعربية",
      home: "Back to website",
    },
    author: {
      name: "Ahmed Abdelkhalek",
      initials: "AA",
      role:
        "Enterprise Systems & Platform Architect",
      bio:
        "I design digital platforms that connect operations, data, CRM, automation, and AI within scalable and governable architectures.",
    },
  },
} as const;

export type InsightsUiLanguage =
  keyof typeof insightsUiContent;
