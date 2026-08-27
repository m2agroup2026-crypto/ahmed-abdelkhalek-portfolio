export type SystemsLanguage = "ar" | "en";

type Localized = Record<SystemsLanguage, string>;

export type SystemsDomain = {
  id: "intelligence" | "communication" | "operations" | "governance" | "technology";
  index: string;
  label: Localized;
  title: Localized;
  description: Localized;
  signal: Localized;
  metric: string;
  tone: "lime" | "cyan" | "violet" | "gold" | "blue";
};

export const systemsCopy = {
  eyebrow: { en: "04 / SYSTEMS EXPERIENCE", ar: "04 / تجربة الأنظمة" },
  title: { en: "One operating model.", ar: "نموذج تشغيل واحد." },
  accent: { en: "Every system connected.", ar: "كل نظام متصل." },
  intro: {
    en: "A living enterprise architecture where intelligence, communication, operations, governance, and technology work as one adaptive system.",
    ar: "معمارية مؤسسية حيّة تعمل فيها منظومات الذكاء والاتصال والتشغيل والحوكمة والتكنولوجيا كنظام واحد متكيّف.",
  },
  live: { en: "Architecture live", ar: "المعمارية تعمل الآن" },
  coreLabel: { en: "ENTERPRISE CORE", ar: "النواة المؤسسية" },
  coreTitle: { en: "Digital OS", ar: "نظام التشغيل الرقمي" },
  coreText: {
    en: "Orchestrating people, data, decisions, and delivery.",
    ar: "تنسيق الأفراد والبيانات والقرارات والتنفيذ.",
  },
  sync: { en: "SYSTEM SYNC", ar: "مزامنة النظام" },
  status: { en: "All domains operational", ar: "جميع النطاقات تعمل" },
  telemetry: { en: "LIVE SYSTEM TELEMETRY", ar: "قياسات النظام المباشرة" },
  governance: { en: "Governed by design", ar: "الحوكمة جزء من التصميم" },
  governanceText: {
    en: "Identity, permissions, audit trails, and decision ownership are embedded into every workflow—not added after launch.",
    ar: "الهوية والصلاحيات ومسارات التدقيق وملكية القرار مدمجة داخل كل سير عمل، وليست إضافات لاحقة بعد الإطلاق.",
  },
  principles: {
    en: ["Observable", "Composable", "Automated", "Governable"],
    ar: ["قابل للرصد", "قابل للتركيب", "مؤتمت", "محكوم"],
  },
};

export const systemsDomains: SystemsDomain[] = [
  {
    id: "intelligence", index: "01", tone: "lime", metric: "94%",
    label: { en: "INTELLIGENCE", ar: "الذكاء" },
    title: { en: "Decision intelligence", ar: "ذكاء القرار" },
    description: { en: "AI workflows convert operational signals into prioritized, explainable action.", ar: "تحوّل مسارات الذكاء الاصطناعي الإشارات التشغيلية إلى إجراءات مرتبة وقابلة للتفسير." },
    signal: { en: "Models aligned", ar: "النماذج متوافقة" },
  },
  {
    id: "communication", index: "02", tone: "cyan", metric: "28ms",
    label: { en: "COMMUNICATION", ar: "الاتصال" },
    title: { en: "Connected conversations", ar: "محادثات مترابطة" },
    description: { en: "Every channel becomes part of one contextual customer and team workflow.", ar: "تصبح كل قناة جزءًا من مسار موحد وسياقي للعملاء والفرق." },
    signal: { en: "Channels unified", ar: "القنوات موحّدة" },
  },
  {
    id: "operations", index: "03", tone: "violet", metric: "24/7",
    label: { en: "OPERATIONS", ar: "التشغيل" },
    title: { en: "Adaptive operations", ar: "تشغيل متكيّف" },
    description: { en: "Events trigger coordinated work across teams, platforms, and service layers.", ar: "تطلق الأحداث عملًا منسقًا بين الفرق والمنصات وطبقات الخدمة." },
    signal: { en: "Flows automated", ar: "المسارات مؤتمتة" },
  },
  {
    id: "governance", index: "04", tone: "gold", metric: "100%",
    label: { en: "GOVERNANCE", ar: "الحوكمة" },
    title: { en: "Governance by design", ar: "حوكمة مدمجة" },
    description: { en: "Roles, approvals, accountability, and auditability travel with the work.", ar: "تتحرك الأدوار والموافقات والمساءلة وقابلية التدقيق مع العمل نفسه." },
    signal: { en: "Controls active", ar: "الضوابط فعّالة" },
  },
  {
    id: "technology", index: "05", tone: "blue", metric: "∞",
    label: { en: "TECHNOLOGY", ar: "التكنولوجيا" },
    title: { en: "Composable foundation", ar: "أساس قابل للتركيب" },
    description: { en: "APIs, data services, and resilient platforms make change safe and scalable.", ar: "تجعل واجهات API وخدمات البيانات والمنصات المرنة التغيير آمنًا وقابلًا للتوسع." },
    signal: { en: "Services healthy", ar: "الخدمات مستقرة" },
  },
];

export function systemText(value: Localized, language: SystemsLanguage) {
  return value[language];
}
