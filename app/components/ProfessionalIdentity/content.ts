export const professionalIdentityContent = {
  ar: {
    index: "01 / الهوية المهنية",
    eyebrow: "هندسة تبدأ من داخل المؤسسة",
    title: "أقرأ المؤسسة كنظام.",
    accent: "ثم أبني الطبقة الرقمية التي تجعلها تعمل كوحدة واحدة.",
    intro:
      "أعمل عند نقطة التقاء التشغيل والإدارة والاتصال والتكنولوجيا. أفهم كيف تتحرك المهام والبيانات والقرارات بين الناس والأنظمة، ثم أحوّل هذا الواقع إلى معمارية رقمية مترابطة وواضحة وقابلة للتوسع.",
    status: "PROFESSIONAL SYSTEM / ONLINE",
    core: {
      label: "النواة المهنية",
      title: "مهندس أنظمة ومنصات مؤسسية",
      text:
        "أربط التشغيل والبيانات والقرارات والتواصل داخل بنية واحدة تخدم المؤسسة بدل أن تضيف أدوات منفصلة فوقها.",
    },
    dimensions: [
      {
        code: "01",
        key: "operations",
        title: "التشغيل",
        text:
          "أفهم كيف يبدأ العمل، أين يتعطل، وكيف تنتقل المسؤولية من خطوة إلى أخرى.",
      },
      {
        code: "02",
        key: "communication",
        title: "الاتصال",
        text:
          "أحدد نقاط التواصل والتسليم بين الفرق والعملاء وأصحاب المصلحة حتى لا تضيع الإشارات بين القنوات.",
      },
      {
        code: "03",
        key: "governance",
        title: "الحوكمة",
        text:
          "أحوّل الصلاحيات ومسارات القرار والتوثيق إلى قواعد تشغيل واضحة يمكن تتبعها وقياسها.",
      },
      {
        code: "04",
        key: "technology",
        title: "التكنولوجيا",
        text:
          "أختار المنصة والتكاملات والأتمتة والذكاء الاصطناعي وفق ما يحتاجه التشغيل فعلًا، لا وفق ما هو أحدث فقط.",
      },
    ],
    outcomeLabel: "النتيجة",
    outcome:
      "نظام رقمي يعكس طريقة عمل المؤسسة، ويقلل الاحتكاك بين الفرق، ويحوّل البيانات والقرارات إلى تدفق واحد قابل للقياس والتطوير.",
  },
  en: {
    index: "01 / Professional Identity",
    eyebrow: "Engineering from inside the organization",
    title: "I read the organization as a system.",
    accent: "Then I engineer the digital layer that makes it operate as one.",
    intro:
      "My work sits where operations, administration, communication, and technology meet. I study how tasks, data, and decisions move across people and systems, then translate that reality into one connected, governable, and scalable digital architecture.",
    status: "PROFESSIONAL SYSTEM / ONLINE",
    core: {
      label: "Professional core",
      title: "Enterprise Systems & Platform Architect",
      text:
        "I connect operations, data, decisions, and communication inside one architecture designed around the organization—not around disconnected tools.",
    },
    dimensions: [
      {
        code: "01",
        key: "operations",
        title: "Operations",
        text:
          "I understand where work begins, where friction appears, and how responsibility moves from one step to the next.",
      },
      {
        code: "02",
        key: "communication",
        title: "Communication",
        text:
          "I map handoffs across teams, customers, and stakeholders so critical signals do not disappear between channels.",
      },
      {
        code: "03",
        key: "governance",
        title: "Governance",
        text:
          "I translate permissions, decision paths, and documentation into operating rules that can be traced and measured.",
      },
      {
        code: "04",
        key: "technology",
        title: "Technology",
        text:
          "I choose platforms, integrations, automation, and AI around operational needs—not simply around what is newest.",
      },
    ],
    outcomeLabel: "Outcome",
    outcome:
      "A digital system that mirrors how the organization works, reduces friction between teams, and turns data and decisions into one measurable flow that can evolve over time.",
  },
} as const;

export type ProfessionalIdentityLanguage =
  keyof typeof professionalIdentityContent;
