import type {
  InsightCategory,
  InsightCategoryDefinition,
  InsightLanguage,
} from "./types";

type LocalizedEditorialValue =
  Record<InsightLanguage, string>;

export type InsightArticlePlan = {
  slug: string;
  category: InsightCategory;
  featured: boolean;
  title: LocalizedEditorialValue;
  objective: LocalizedEditorialValue;
  audience: LocalizedEditorialValue;
  primaryKeyword: LocalizedEditorialValue;
};

export const insightCategories = [
  {
    id: "enterprise-ai",
    order: 1,
    label: {
      ar: "الذكاء الاصطناعي المؤسسي",
      en: "Enterprise AI",
    },
    description: {
      ar:
        "كيف تتحول تقنيات الذكاء الاصطناعي من أدوات منفصلة إلى قدرات تشغيلية قابلة للقياس والحوكمة.",
      en:
        "How artificial intelligence evolves from isolated tools into measurable and governable operating capabilities.",
    },
  },
  {
    id: "digital-transformation",
    order: 2,
    label: {
      ar: "التحول الرقمي",
      en: "Digital Transformation",
    },
    description: {
      ar:
        "إعادة تصميم العمليات والبيانات والقرارات قبل اختيار التقنية أو بناء الواجهة.",
      en:
        "Redesigning operations, data, and decisions before selecting technology or building interfaces.",
    },
  },
  {
    id: "application-engineering",
    order: 3,
    label: {
      ar: "هندسة التطبيقات",
      en: "Application Engineering",
    },
    description: {
      ar:
        "بناء تطبيقات جوال حديثة حول رحلة المستخدم والأداء والتكامل واستمرارية التشغيل.",
      en:
        "Engineering modern mobile applications around user journeys, performance, integration, and operational continuity.",
    },
  },
  {
    id: "enterprise-platforms",
    order: 4,
    label: {
      ar: "المنصات المؤسسية",
      en: "Enterprise Platforms",
    },
    description: {
      ar:
        "تصميم منصات موحدة قابلة للتخصيص والتوسع مع عزل البيانات والحوكمة الدقيقة.",
      en:
        "Designing unified, configurable, and scalable platforms with strong data isolation and governance.",
    },
  },
  {
    id: "crm-automation",
    order: 5,
    label: {
      ar: "CRM والأتمتة",
      en: "CRM & Automation",
    },
    description: {
      ar:
        "ربط قنوات العملاء والبيانات ومسارات المتابعة داخل تشغيل واضح وقابل للقياس.",
      en:
        "Connecting customer channels, data, and follow-up workflows within a measurable operating model.",
    },
  },
] as const satisfies readonly InsightCategoryDefinition[];

export const insightArticleRoadmap = [
  {
    slug: "enterprise-ai-operating-model",
    category: "enterprise-ai",
    featured: true,
    title: {
      ar: "من أدوات الذكاء الاصطناعي إلى نموذج تشغيل مؤسسي متكامل",
      en: "From AI Tools to an Enterprise AI Operating Model",
    },
    objective: {
      ar:
        "شرح الطبقات المطلوبة لتحويل استخدام الذكاء الاصطناعي إلى قدرة مؤسسية مترابطة وآمنة.",
      en:
        "Explain the layers required to turn AI usage into a connected, secure enterprise capability.",
    },
    audience: {
      ar: "القيادات التنفيذية ومديرو التحول والتقنية",
      en: "Executives, transformation leaders, and technology leaders",
    },
    primaryKeyword: {
      ar: "الذكاء الاصطناعي المؤسسي",
      en: "enterprise AI operating model",
    },
  },
  {
    slug: "ai-agents-real-business-value",
    category: "enterprise-ai",
    featured: true,
    title: {
      ar: "وكلاء الذكاء الاصطناعي: متى يصنعون قيمة تشغيلية حقيقية؟",
      en: "AI Agents: When Do They Create Real Operational Value?",
    },
    objective: {
      ar:
        "تمييز الاستخدام الحقيقي للوكلاء عن العروض التسويقية وربطهم بعمليات قابلة للقياس.",
      en:
        "Separate practical agent use cases from hype and connect agents to measurable workflows.",
    },
    audience: {
      ar: "قادة العمليات والمنتجات والتحول الرقمي",
      en: "Operations, product, and digital transformation leaders",
    },
    primaryKeyword: {
      ar: "وكلاء الذكاء الاصطناعي للشركات",
      en: "AI agents for business",
    },
  },
  {
    slug: "why-enterprise-ai-projects-fail",
    category: "enterprise-ai",
    featured: false,
    title: {
      ar: "لماذا تفشل مشروعات الذكاء الاصطناعي رغم قوة النماذج؟",
      en: "Why Enterprise AI Projects Fail Despite Powerful Models",
    },
    objective: {
      ar:
        "تحليل مشكلات البيانات والعمليات والملكية والحوكمة التي تسبق اختيار النموذج.",
      en:
        "Analyze the data, process, ownership, and governance failures that precede model selection.",
    },
    audience: {
      ar: "صنّاع القرار وفرق البيانات والذكاء الاصطناعي",
      en: "Decision-makers, data teams, and AI teams",
    },
    primaryKeyword: {
      ar: "فشل مشروعات الذكاء الاصطناعي",
      en: "why enterprise AI projects fail",
    },
  },
  {
    slug: "digital-transformation-beyond-new-website",
    category: "digital-transformation",
    featured: true,
    title: {
      ar: "التحول الرقمي ليس موقعًا جديدًا: ما الذي يتغير فعلًا؟",
      en: "Digital Transformation Is Not a New Website",
    },
    objective: {
      ar:
        "توضيح الفرق بين تحديث الواجهة وإعادة هندسة طريقة عمل المؤسسة.",
      en:
        "Clarify the difference between refreshing an interface and redesigning how an organization operates.",
    },
    audience: {
      ar: "أصحاب الشركات والقيادات التنفيذية",
      en: "Business owners and executive leaders",
    },
    primaryKeyword: {
      ar: "التحول الرقمي للمؤسسات",
      en: "enterprise digital transformation",
    },
  },
  {
    slug: "map-operational-friction-before-software",
    category: "digital-transformation",
    featured: false,
    title: {
      ar: "اكتشف الاحتكاك التشغيلي قبل شراء نظام جديد",
      en: "Map Operational Friction Before Buying New Software",
    },
    objective: {
      ar:
        "تقديم منهج عملي لتحليل الرحلات والتعطّل ومسارات القرار قبل الاستثمار التقني.",
      en:
        "Provide a practical method for mapping journeys, bottlenecks, and decisions before technology investment.",
    },
    audience: {
      ar: "مديرو العمليات والتحول والمشروعات",
      en: "Operations, transformation, and project leaders",
    },
    primaryKeyword: {
      ar: "تحليل العمليات قبل التحول الرقمي",
      en: "operational friction mapping",
    },
  },
  {
    slug: "enterprise-single-source-of-truth",
    category: "digital-transformation",
    featured: false,
    title: {
      ar: "من البيانات المشتتة إلى مصدر موحّد للحقيقة",
      en: "From Fragmented Data to a Single Source of Truth",
    },
    objective: {
      ar:
        "شرح كيف تُوحّد المؤسسة تعريفات البيانات وتدفقها وملكيتها دون بناء مستودع فوضوي جديد.",
      en:
        "Explain how organizations unify data definitions, flows, and ownership without creating another data silo.",
    },
    audience: {
      ar: "قادة البيانات والتقنية والعمليات",
      en: "Data, technology, and operations leaders",
    },
    primaryKeyword: {
      ar: "مصدر موحد للبيانات",
      en: "enterprise single source of truth",
    },
  },
  {
    slug: "mobile-apps-around-user-journeys",
    category: "application-engineering",
    featured: true,
    title: {
      ar: "كيف تُبنى تطبيقات الجوال الحديثة حول رحلة المستخدم؟",
      en: "How Modern Mobile Apps Are Engineered Around User Journeys",
    },
    objective: {
      ar:
        "ربط قرارات تجربة المستخدم بالمعمارية والأداء والإشعارات والتكاملات.",
      en:
        "Connect user-experience decisions with architecture, performance, notifications, and integrations.",
    },
    audience: {
      ar: "أصحاب المنتجات وفرق التطبيقات",
      en: "Product owners and application teams",
    },
    primaryKeyword: {
      ar: "هندسة تطبيقات الجوال",
      en: "mobile application engineering",
    },
  },
  {
    slug: "offline-first-enterprise-mobile-apps",
    category: "application-engineering",
    featured: false,
    title: {
      ar: "تطبيقات Offline-First: استمرارية العمل عندما يضعف الاتصال",
      en: "Offline-First Enterprise Apps: Operating Beyond Connectivity",
    },
    objective: {
      ar:
        "شرح التخزين المحلي والمزامنة وحل التعارضات كتجربة تشغيل لا كميزة تقنية منفصلة.",
      en:
        "Explain local storage, synchronization, and conflict resolution as an operating experience.",
    },
    audience: {
      ar: "فرق المنتجات الميدانية والهندسة التقنية",
      en: "Field-product teams and engineering leaders",
    },
    primaryKeyword: {
      ar: "تطبيقات تعمل بدون إنترنت",
      en: "offline-first enterprise apps",
    },
  },
  {
    slug: "white-label-multi-tenant-platforms",
    category: "enterprise-platforms",
    featured: true,
    title: {
      ar: "كيف تعمل منصات White-Label وMulti-Tenant دون نسخ الكود؟",
      en: "How White-Label Multi-Tenant Platforms Scale Without Code Duplication",
    },
    objective: {
      ar:
        "شرح النواة المشتركة والتخصيص والوحدات والعزل ومسار التحديث الآمن.",
      en:
        "Explain shared-core architecture, configuration, modules, isolation, and safe upgrades.",
    },
    audience: {
      ar: "مؤسسو المنتجات وقادة المنصات والتقنية",
      en: "Product founders, platform leaders, and technology executives",
    },
    primaryKeyword: {
      ar: "منصة وايت ليبل متعددة المستأجرين",
      en: "white-label multi-tenant platform",
    },
  },
  {
    slug: "permissions-audit-data-isolation",
    category: "enterprise-platforms",
    featured: false,
    title: {
      ar: "الصلاحيات وسجل التدقيق وعزل البيانات: أساس المنصة المؤسسية",
      en: "Permissions, Audit Trails, and Data Isolation by Design",
    },
    objective: {
      ar:
        "توضيح لماذا تبدأ الحوكمة من الواجهة وAPI وقاعدة البيانات معًا.",
      en:
        "Show why governance must span the interface, API, and database together.",
    },
    audience: {
      ar: "قادة التقنية والأمن والحوكمة",
      en: "Technology, security, and governance leaders",
    },
    primaryKeyword: {
      ar: "عزل بيانات المؤسسات والصلاحيات",
      en: "multi-tenant data isolation and permissions",
    },
  },
  {
    slug: "unify-customer-data-crm-whatsapp",
    category: "crm-automation",
    featured: true,
    title: {
      ar: "كيف توحّد بيانات العملاء بين الموقع وCRM وWhatsApp؟",
      en: "How to Unify Customer Data Across Website, CRM, and WhatsApp",
    },
    objective: {
      ar:
        "تصميم هوية عميل موحدة وتدفق أحداث يمنع التكرار وضياع المحادثات.",
      en:
        "Design a unified customer identity and event flow that prevents duplication and lost conversations.",
    },
    audience: {
      ar: "فرق المبيعات والتسويق وخدمة العملاء",
      en: "Sales, marketing, and customer-service teams",
    },
    primaryKeyword: {
      ar: "ربط الموقع وCRM وواتساب",
      en: "website CRM WhatsApp integration",
    },
  },
  {
    slug: "automation-with-governance",
    category: "crm-automation",
    featured: false,
    title: {
      ar: "متى تتحول الأتمتة من اختصار للوقت إلى مخاطرة تشغيلية؟",
      en: "When Automation Becomes an Operational Risk",
    },
    objective: {
      ar:
        "شرح الضوابط والمراقبة ومسارات الاستثناء التي تجعل الأتمتة قابلة للثقة.",
      en:
        "Explain the controls, observability, and exception paths that make automation dependable.",
    },
    audience: {
      ar: "قادة العمليات والأتمتة وإدارة المخاطر",
      en: "Operations, automation, and risk leaders",
    },
    primaryKeyword: {
      ar: "حوكمة الأتمتة المؤسسية",
      en: "enterprise automation governance",
    },
  },
] as const satisfies readonly InsightArticlePlan[];

const categoryIds = new Set(
  insightCategories.map((category) => category.id)
);

const slugs = insightArticleRoadmap.map(
  (article) => article.slug
);

if (new Set(slugs).size !== slugs.length) {
  throw new Error(
    "Insight roadmap contains duplicate slugs"
  );
}

for (const article of insightArticleRoadmap) {
  if (!categoryIds.has(article.category)) {
    throw new Error(
      `Unknown insight category: ${article.category}`
    );
  }
}
