export const intelligenceExperienceContent = {
  ar: {
    eyebrow: "AHMED INTELLIGENCE / COGNITIVE INTERFACE",
    title: "نواة أحمد للذكاء",
    description:
      "واجهة ذكية لاستكشاف الأفكار، وتحليل تحديات المؤسسات، وتحويل التعقيد إلى تصورات أنظمة قابلة للتنفيذ.",
    status: {
      ready: "النواة متصلة",
      thinking: "جاري تحليل الطلب",
      error: "تعذر الاتصال",
    },
    welcome: {
      title: "مرحبًا، أنا Ahmed Intelligence.",
      text:
        "اسألني سؤالًا عامًا، أو صف تحديًا تشغيليًا داخل مؤسستك، وسأساعدك في تحليل المشكلة وبناء تصور واضح للحل.",
    },
    suggestionsLabel: "ابدأ بأحد هذه الأسئلة",
    suggestions: [
      "كيف أوحّد بيانات العملاء بين الموقع وCRM وواتساب؟",
      "صمّم تصورًا لمنصة مؤسسية متعددة الفروع.",
      "كيف يمكن لوكلاء الذكاء الاصطناعي تحسين العمليات؟",
      "ما الفرق بين الأتمتة ونظام التشغيل الرقمي للمؤسسة؟",
    ],
    composer: {
      label: "اكتب رسالتك",
      placeholder:
        "اسأل سؤالًا أو صف تحديًا مؤسسيًا...",
      hint: "Enter للإرسال · Shift + Enter لسطر جديد",
      send: "إرسال",
      stop: "إيقاف",
    },
    actions: {
      close: "إغلاق نواة الذكاء",
      clear: "محادثة جديدة",
      retry: "إعادة المحاولة",
      dismiss: "إخفاء التنبيه",
    },
    roles: {
      assistant: "AHMED INTELLIGENCE",
      user: "أنت",
    },
    notices: {
      disclaimer:
        "قد تخطئ أنظمة الذكاء الاصطناعي. راجع المعلومات المهمة قبل اتخاذ القرار.",
      stopped: "تم إيقاف إنشاء الرد.",
      empty: "اكتب رسالة أولًا.",
      tooLong: "الرسالة أطول من الحد المسموح.",
      network:
        "تعذر الوصول إلى نواة الذكاء. تحقق من الاتصال وحاول مرة أخرى.",
    },
  },
  en: {
    eyebrow: "AHMED INTELLIGENCE / COGNITIVE INTERFACE",
    title: "Ahmed Intelligence",
    description:
      "An intelligent interface for exploring ideas, diagnosing enterprise challenges, and turning complexity into implementable system concepts.",
    status: {
      ready: "Core connected",
      thinking: "Analyzing request",
      error: "Connection unavailable",
    },
    welcome: {
      title: "Hello, I am Ahmed Intelligence.",
      text:
        "Ask a general question or describe an operational challenge, and I will help analyze the problem and shape a clear system approach.",
    },
    suggestionsLabel: "Start with one of these questions",
    suggestions: [
      "How can we unify customer data across our website, CRM, and WhatsApp?",
      "Design a system concept for a multi-branch enterprise.",
      "How can AI agents improve operational workflows?",
      "What is the difference between automation and an enterprise digital operating system?",
    ],
    composer: {
      label: "Write your message",
      placeholder:
        "Ask a question or describe an enterprise challenge...",
      hint: "Enter to send · Shift + Enter for a new line",
      send: "Send",
      stop: "Stop",
    },
    actions: {
      close: "Close intelligence core",
      clear: "New conversation",
      retry: "Try again",
      dismiss: "Dismiss notice",
    },
    roles: {
      assistant: "AHMED INTELLIGENCE",
      user: "YOU",
    },
    notices: {
      disclaimer:
        "AI systems can make mistakes. Verify important information before making decisions.",
      stopped: "Response generation was stopped.",
      empty: "Please enter a message first.",
      tooLong: "The message exceeds the allowed length.",
      network:
        "The intelligence core could not be reached. Check the connection and try again.",
    },
  },
} as const;

export type IntelligenceExperienceLanguage =
  keyof typeof intelligenceExperienceContent;
