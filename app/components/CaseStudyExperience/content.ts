export type CaseStudyLanguage = "en" | "ar";

export type CaseStudyLayer = {
  key: "identity" | "platform" | "leads" | "messaging" | "automation" | "data";
  code: string;
  title: string;
  short: string;
  description: string;
};

export type CaseStudyContent = {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  live: string;
  challengeLabel: string;
  challengeTitle: string;
  challengeText: string;
  fragmentsLabel: string;
  fragments: string[];
  topologyLabel: string;
  layersLabel: string;
  layers: CaseStudyLayer[];
  phases: string[];
  outcomeLabel: string;
  outcomeTitle: string;
  outcomeText: string;
  visit: string;
};

export const caseStudyExperienceContent: Record<CaseStudyLanguage, CaseStudyContent> = {
  en: {
    index: "03 / FLAGSHIP TRANSFORMATION",
    eyebrow: "M2A / CONNECTED OPERATING MODEL",
    title: "From fragmented touchpoints",
    accent: "to one digital operating system.",
    intro:
      "The M2A transformation was designed as a connected operating model—not simply a corporate website. Brand, leads, conversations, automation, and data were treated as parts of one architecture.",
    live: "LIVE SYSTEM",
    challengeLabel: "THE CHALLENGE",
    challengeTitle: "The customer journey was split across separate operational surfaces.",
    challengeText:
      "Brand, leads, conversations, follow-up, and operational data lived in different places. The goal was to connect the full journey through one coherent digital architecture.",
    fragmentsLabel: "DISCONNECTED SIGNALS",
    fragments: ["Brand", "Website leads", "Conversations", "Follow-up", "Operational data"],
    topologyLabel: "SYSTEM TOPOLOGY",
    layersLabel: "CONNECTED LAYERS",
    layers: [
      {
        key: "identity",
        code: "01",
        title: "Digital Identity",
        short: "IDENTITY",
        description: "A unified, credible presence across customer touchpoints.",
      },
      {
        key: "platform",
        code: "02",
        title: "Corporate Platform",
        short: "PLATFORM",
        description: "A responsive public layer engineered as part of a larger business system.",
      },
      {
        key: "leads",
        code: "03",
        title: "Lead Intelligence",
        short: "LEADS / CRM",
        description: "Website leads move into an AI-assisted CRM instead of disconnected inboxes.",
      },
      {
        key: "messaging",
        code: "04",
        title: "Connected Conversations",
        short: "MESSAGING",
        description: "WhatsApp and Messenger communication converge into one workflow.",
      },
      {
        key: "automation",
        code: "05",
        title: "Automation Layer",
        short: "AUTOMATION",
        description: "Event-driven workflows reduce repetitive work and accelerate follow-up.",
      },
      {
        key: "data",
        code: "06",
        title: "Central Data",
        short: "DATA / API",
        description: "Supabase, APIs, and structured data create a dependable source of truth.",
      },
    ],
    phases: ["MAP", "CONNECT", "ORCHESTRATE", "OPERATE"],
    outcomeLabel: "THE OUTCOME",
    outcomeTitle: "One ecosystem. Every interaction connected.",
    outcomeText:
      "The architecture brings the public platform, lead handling, conversations, workflows, and operational data into one connected model that can evolve as the business grows.",
    visit: "Visit M2A Group",
  },
  ar: {
    index: "03 / مشروع التحول الرئيسي",
    eyebrow: "M2A / نموذج تشغيل مترابط",
    title: "من نقاط اتصال متفرقة",
    accent: "إلى نظام تشغيل رقمي واحد.",
    intro:
      "تم تصميم تحول M2A كنموذج تشغيل رقمي مترابط، وليس كمجرد موقع مؤسسي. الهوية والعملاء والمحادثات والأتمتة والبيانات عولجت كطبقات داخل معمارية واحدة.",
    live: "نظام فعّال",
    challengeLabel: "التحدي",
    challengeTitle: "كانت رحلة العميل موزعة بين مساحات تشغيلية منفصلة.",
    challengeText:
      "كانت الهوية والعملاء المحتملون والمحادثات والمتابعة والبيانات التشغيلية موجودة في أماكن مختلفة. الهدف كان ربط الرحلة كاملة من خلال معمارية رقمية واحدة متماسكة.",
    fragmentsLabel: "إشارات منفصلة",
    fragments: ["الهوية", "طلبات الموقع", "المحادثات", "المتابعة", "البيانات التشغيلية"],
    topologyLabel: "خريطة النظام",
    layersLabel: "الطبقات المترابطة",
    layers: [
      {
        key: "identity",
        code: "01",
        title: "الهوية الرقمية",
        short: "الهوية",
        description: "حضور موحّد وموثوق عبر نقاط التواصل المختلفة مع العملاء.",
      },
      {
        key: "platform",
        code: "02",
        title: "المنصة المؤسسية",
        short: "المنصة",
        description: "واجهة عامة متجاوبة تم هندستها كجزء من منظومة أعمال أكبر.",
      },
      {
        key: "leads",
        code: "03",
        title: "ذكاء العملاء المحتملين",
        short: "العملاء / CRM",
        description: "تنتقل طلبات الموقع إلى CRM مدعوم بالذكاء الاصطناعي بدلًا من صناديق منفصلة.",
      },
      {
        key: "messaging",
        code: "04",
        title: "محادثات مترابطة",
        short: "المحادثات",
        description: "تجتمع اتصالات واتساب وماسنجر داخل مسار عمل واحد ومنظم.",
      },
      {
        key: "automation",
        code: "05",
        title: "طبقة الأتمتة",
        short: "الأتمتة",
        description: "مسارات قائمة على الأحداث تقلل العمل المتكرر وتسرّع المتابعة.",
      },
      {
        key: "data",
        code: "06",
        title: "البيانات المركزية",
        short: "البيانات / API",
        description: "Supabase وواجهات API والبيانات المنظمة تصنع مصدرًا مركزيًا موثوقًا.",
      },
    ],
    phases: ["رصد", "ربط", "تنسيق", "تشغيل"],
    outcomeLabel: "النتيجة",
    outcomeTitle: "منظومة واحدة. كل تفاعل مترابط.",
    outcomeText:
      "تجمع المعمارية المنصة العامة وإدارة العملاء والمحادثات ومسارات العمل والبيانات التشغيلية داخل نموذج مترابط يمكنه التطور مع نمو الأعمال.",
    visit: "زيارة موقع M2A Group",
  },
};
