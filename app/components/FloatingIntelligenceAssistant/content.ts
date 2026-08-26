export const floatingAssistantContent = {
  ar: {
    name: "Ahmed Intelligence",
    status: "متصل",
    action: "ابدأ محادثة",
    ariaLabel: "فتح المساعد الذكي أحمد",
    invitation: {
      eyebrow: "قبل أن تغادر",
      title: "هل تريد تحليل فكرة أو تحدٍ مؤسسي؟",
      action: "تحدث معي",
      dismiss: "إخفاء الدعوة",
    },
  },
  en: {
    name: "Ahmed Intelligence",
    status: "Online",
    action: "Start a conversation",
    ariaLabel: "Open Ahmed Intelligence assistant",
    invitation: {
      eyebrow: "Before you leave",
      title: "Would you like to analyze an idea or enterprise challenge?",
      action: "Talk to me",
      dismiss: "Dismiss invitation",
    },
  },
} as const;

export type FloatingAssistantLanguage =
  keyof typeof floatingAssistantContent;
