export type ExpertiseLanguage = "ar" | "en";
type Localized = Record<ExpertiseLanguage, string>;

export type Capability = {
  code: string;
  key: string;
  label: Localized;
  title: Localized;
  description: Localized;
  outcome: Localized;
  stack: string[];
  signal: string;
  tone: "lime" | "cyan" | "violet" | "gold";
};

export const expertiseContent = {
  eyebrow: { en: "05 / CAPABILITY INTELLIGENCE", ar: "05 / منظومة القدرات" },
  kicker: { en: "FROM STRATEGY TO EXECUTION", ar: "من الاستراتيجية إلى التنفيذ" },
  title: { en: "Capabilities engineered", ar: "قدرات تُهندس" },
  accent: { en: "to operate as one system.", ar: "لتعمل كنظام واحد." },
  intro: {
    en: "The value is not a list of tools. It is the ability to connect business logic, product experience, data, automation, and intelligence into one reliable operating model.",
    ar: "القيمة ليست في قائمة أدوات، بل في القدرة على ربط منطق الأعمال وتجربة المنتج والبيانات والأتمتة والذكاء داخل نموذج تشغيل واحد وموثوق.",
  },
  matrix: { en: "CAPABILITY MATRIX / LIVE", ar: "مصفوفة القدرات / فعّالة" },
  active: { en: "Active capability", ar: "القدرة النشطة" },
  outcome: { en: "Operational outcome", ar: "الأثر التشغيلي" },
  signal: { en: "DELIVERY SIGNAL", ar: "مؤشر التنفيذ" },
  footer: { en: "One architect. Multiple system layers. Zero disconnected thinking.", ar: "مهندس واحد. طبقات أنظمة متعددة. بلا تفكير منفصل." },
};

export const capabilities: Capability[] = [
  {
    code: "01", key: "platform", tone: "lime", signal: "96%",
    label: { en: "PLATFORM ENGINEERING", ar: "هندسة المنصات" },
    title: { en: "Scalable digital platforms", ar: "منصات رقمية قابلة للتوسع" },
    description: { en: "Enterprise-grade products shaped around performance, accessibility, maintainability, and measurable business outcomes.", ar: "منتجات مؤسسية تُبنى حول الأداء وسهولة الوصول وقابلية الصيانة ونتائج الأعمال القابلة للقياس." },
    outcome: { en: "A dependable public and operational layer that can evolve without rebuilding the organization around it.", ar: "طبقة عامة وتشغيلية موثوقة تتطور دون الحاجة إلى إعادة بناء المؤسسة حولها." },
    stack: ["Next.js", "React", "TypeScript", "API Design"],
  },
  {
    code: "02", key: "automation", tone: "cyan", signal: "24/7",
    label: { en: "AUTOMATION SYSTEMS", ar: "أنظمة الأتمتة" },
    title: { en: "Event-driven operations", ar: "تشغيل قائم على الأحداث" },
    description: { en: "Workflows that coordinate teams, platforms, messages, and decisions while removing repetitive operational friction.", ar: "مسارات تنسّق الفرق والمنصات والرسائل والقرارات، وتزيل الاحتكاك التشغيلي المتكرر." },
    outcome: { en: "Faster execution, fewer handoff failures, and visible accountability across the full process.", ar: "تنفيذ أسرع، وأخطاء أقل عند التسليم، ومساءلة واضحة عبر العملية كاملة." },
    stack: ["Workflows", "Webhooks", "Events", "Integrations"],
  },
  {
    code: "03", key: "intelligence", tone: "violet", signal: "AI+",
    label: { en: "AI & CRM INTELLIGENCE", ar: "ذكاء AI وCRM" },
    title: { en: "Intelligence inside the workflow", ar: "ذكاء داخل سير العمل" },
    description: { en: "AI-assisted routing, contextual CRM pipelines, and decision support embedded where teams already operate.", ar: "توجيه مدعوم بالذكاء ومسارات CRM سياقية ودعم قرار مدمج داخل بيئة عمل الفرق." },
    outcome: { en: "Activity becomes prioritized action instead of another dashboard that teams have to monitor.", ar: "يتحول النشاط إلى إجراء ذي أولوية بدل أن يصبح لوحة إضافية تحتاج الفرق لمراقبتها." },
    stack: ["AI Agents", "CRM", "RAG", "Lead Intelligence"],
  },
  {
    code: "04", key: "architecture", tone: "gold", signal: "∞",
    label: { en: "SYSTEMS ARCHITECTURE", ar: "معمارية الأنظمة" },
    title: { en: "Connected enterprise foundations", ar: "أسس مؤسسية مترابطة" },
    description: { en: "Composable services, governed data, resilient integrations, and clear ownership designed as one architecture.", ar: "خدمات قابلة للتركيب وبيانات محكومة وتكاملات مرنة وملكية واضحة مصممة كمعمارية واحدة." },
    outcome: { en: "A technology foundation that can adapt, scale, and remain understandable as complexity grows.", ar: "أساس تقني يتكيف ويتوسع ويظل مفهومًا مع نمو التعقيد." },
    stack: ["Supabase", "REST APIs", "Data Models", "Governance"],
  },
];

export function expertiseText(value: Localized, language: ExpertiseLanguage) {
  return value[language];
}
