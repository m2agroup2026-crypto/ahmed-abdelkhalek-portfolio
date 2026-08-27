export const journeyExperienceContent = {
  ar: {
    index: "02 / الرحلة المهنية",
    eyebrow: "مسار تطور واحد — أربع طبقات خبرة",
    title: "لم تكن الخبرة مراحل منفصلة.",
    accent: "كانت طبقات لنظام واحد.",
    intro:
      "بدأ المسار من الاتصال المؤسسي وفهم الجمهور، ثم انتقل إلى قيادة التواصل والإدارة والعقود، وصولًا إلى هندسة المنصات والأنظمة. كل مرحلة أضافت زاوية جديدة لفهم كيف تتحرك المؤسسة من الداخل.",
    telemetry: {
      label: "CAREER TRAJECTORY",
      state: "المسار متصل",
      progress: "تقدم الرحلة",
    },
    chapters: [
      {
        code: "01",
        key: "communication",
        discipline: "الاتصال",
        role: "مسؤول العلاقات العامة والإعلام",
        organization: "كلية الطب",
        text:
          "إدارة الاتصال المؤسسي وتنظيم الفعاليات والعلاقات مع أصحاب المصلحة والعمليات الجماهيرية.",
        layerLabel: "الطبقة التي أضافتها المرحلة",
        layer:
          "فهم نقاط التواصل، وتدفق الرسائل، وكيف تتشكل تجربة المؤسسة أمام جمهورها.",
        signals: ["الاتصال المؤسسي", "تنظيم الفعاليات", "العلاقات مع أصحاب المصلحة"],
      },
      {
        code: "02",
        key: "leadership",
        discipline: "القيادة",
        role: "رئيس قسم العلاقات العامة",
        organization: "مؤسسة مصر العربية لحقوق الإنسان",
        text:
          "قيادة منظومة الاتصال وتحويل أهداف المؤسسة إلى تواصل جماهيري منظم وفعّال.",
        layerLabel: "الطبقة التي أضافتها المرحلة",
        layer:
          "الانتقال من تنفيذ الاتصال إلى تنظيمه كمسار عمل له أهداف ومسؤوليات واتجاه واضح.",
        signals: ["قيادة التواصل", "تنظيم المسارات", "ترجمة الأهداف"],
      },
      {
        code: "03",
        key: "operations",
        discipline: "التشغيل والحوكمة",
        role: "المدير الإداري ومسؤول العقود",
        organization: "جمعية زاد — أسيوط",
        text:
          "إدارة الشؤون الإدارية والعقود والتوثيق والأنظمة الداعمة للتشغيل اليومي.",
        layerLabel: "الطبقة التي أضافتها المرحلة",
        layer:
          "رؤية المؤسسة من الداخل: الإجراءات، والتوثيق، والمسؤوليات، والعقود، وما يحتاجه التشغيل كي يستمر بانضباط.",
        signals: ["الإدارة", "العقود", "التوثيق", "التشغيل"],
      },
      {
        code: "04",
        key: "systems",
        discipline: "هندسة الأنظمة",
        role: "مدير تكنولوجيا المعلومات والتحول الرقمي",
        organization: "مجموعة M2A",
        text:
          "تصميم منصات مترابطة تجمع الهوية والبيانات وإدارة العملاء والأتمتة والرسائل والذكاء الاصطناعي.",
        layerLabel: "الطبقة التي أضافتها المرحلة",
        layer:
          "تحويل الفهم التشغيلي المتراكم إلى معمارية رقمية تربط العمل والبيانات والاتصال داخل نظام واحد.",
        signals: ["هندسة المنصات", "CRM", "الأتمتة", "تكامل الأنظمة", "الذكاء الاصطناعي"],
      },
    ],
    convergence: {
      label: "CONVERGENCE / 04 → 01",
      title: "من فهم المؤسسة إلى هندسة نظامها الرقمي.",
      text:
        "القيمة ليست في الانتقال بين مجالات مختلفة، بل في جمعها داخل منظور واحد: اتصال يفهم الناس، تشغيل يفهم الواقع، وحلول تقنية تربط الاثنين.",
    },
    experienceArchitecture: {
      label: "معمارية الخبرة",
      title: "04 طبقات خبرة تم تفعيلها",
      layers: [
        {
          code: "01",
          title: "ذكاء الاتصال المؤسسي",
          text: "الجمهور • الرسائل • أصحاب المصلحة",
        },
        {
          code: "02",
          title: "تشغيل القيادة",
          text: "التوجيه • المواءمة • التنفيذ",
        },
        {
          code: "03",
          title: "الحوكمة التشغيلية",
          text: "الإجراءات • العقود • الضبط",
        },
        {
          code: "04",
          title: "الأنظمة الرقمية",
          text: "المنصات • البيانات • الأتمتة • الذكاء الاصطناعي",
        },
      ],
    },
    controls: {
      previous: "المرحلة السابقة",
      next: "المرحلة التالية",
      jump: "الانتقال إلى المرحلة",
    },
  },
  en: {
    index: "02 / Professional Journey",
    eyebrow: "One trajectory — four layers of experience",
    title: "The experience was never disconnected.",
    accent: "Each chapter became a layer of one system.",
    intro:
      "The path began with institutional communication and audience understanding, moved through communication leadership, administration, and contracts, then converged into platform and systems engineering. Each chapter added another way to understand how an organization actually moves.",
    telemetry: {
      label: "CAREER TRAJECTORY",
      state: "CONNECTED PATH",
      progress: "Journey progress",
    },
    chapters: [
      {
        code: "01",
        key: "communication",
        discipline: "Communication",
        role: "Public Relations & Media Officer",
        organization: "Faculty of Medicine",
        text:
          "Institutional communication, event coordination, stakeholder relations, and public-facing operations.",
        layerLabel: "Layer added",
        layer:
          "An understanding of touchpoints, message flow, and how an institution is experienced by the people around it.",
        signals: ["Institutional communication", "Event coordination", "Stakeholder relations"],
      },
      {
        code: "02",
        key: "leadership",
        discipline: "Leadership",
        role: "Head of Public Relations",
        organization: "Masr Al Arabia Foundation for Human Rights",
        text:
          "Led communication workflows and translated organizational objectives into structured public engagement.",
        layerLabel: "Layer added",
        layer:
          "A shift from executing communication to structuring it as an operating workflow with clear objectives, ownership, and direction.",
        signals: ["Communication leadership", "Workflow structure", "Objective translation"],
      },
      {
        code: "03",
        key: "operations",
        discipline: "Operations & Governance",
        role: "Administrative Director & Contracts Officer",
        organization: "ZAD Association — Assiut",
        text:
          "Managed administration, contracts, documentation, and the systems behind operational delivery.",
        layerLabel: "Layer added",
        layer:
          "An inside view of the organization: procedures, documentation, accountability, contracts, and the controls that keep daily operations moving.",
        signals: ["Administration", "Contracts", "Documentation", "Operations"],
      },
      {
        code: "04",
        key: "systems",
        discipline: "Systems Engineering",
        role: "IT & Digital Transformation Manager",
        organization: "M2A Group",
        text:
          "Designing connected platforms that unite brand, data, CRM, automation, messaging, and AI.",
        layerLabel: "Layer added",
        layer:
          "The ability to translate accumulated operational understanding into connected digital architecture across work, data, and communication.",
        signals: ["Platform engineering", "CRM", "Automation", "Systems integration", "AI"],
      },
    ],
    convergence: {
      label: "CONVERGENCE / 04 → 01",
      title: "From understanding the organization to engineering its digital system.",
      text:
        "The value is not in moving through different disciplines. It is in combining them into one perspective: communication that understands people, operations that understand reality, and technology that connects both.",
    },
    experienceArchitecture: {
      label: "EXPERIENCE ARCHITECTURE",
      title: "04 EXPERIENCE LAYERS ACTIVATED",
      layers: [
        {
          code: "01",
          title: "COMMUNICATION INTELLIGENCE",
          text: "Audience • Messages • Stakeholders",
        },
        {
          code: "02",
          title: "LEADERSHIP OPERATIONS",
          text: "Direction • Alignment • Execution",
        },
        {
          code: "03",
          title: "OPERATIONAL GOVERNANCE",
          text: "Processes • Contracts • Controls",
        },
        {
          code: "04",
          title: "DIGITAL SYSTEMS",
          text: "Platforms • Data • Automation • AI",
        },
      ],
    },
    controls: {
      previous: "Previous chapter",
      next: "Next chapter",
      jump: "Go to chapter",
    },
  },
} as const;

export type JourneyExperienceLanguage = keyof typeof journeyExperienceContent;
