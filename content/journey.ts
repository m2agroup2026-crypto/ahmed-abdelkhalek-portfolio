export type Bi = {
  en: string;
  ar: string;
};

export const journey: Array<{
  role: Bi;
  org: Bi;
  text: Bi;
}> = [
  {
    role: {
      en: "Public Relations & Media Officer",
      ar: "مسؤول العلاقات العامة والإعلام",
    },
    org: {
      en: "Faculty of Medicine",
      ar: "كلية الطب",
    },
    text: {
      en: "Institutional communication, event coordination, stakeholder relations, and public-facing operations.",
      ar: "إدارة الاتصال المؤسسي وتنظيم الفعاليات والعلاقات مع أصحاب المصلحة والعمليات الجماهيرية.",
    },
  },
  {
    role: {
      en: "Head of Public Relations",
      ar: "رئيس قسم العلاقات العامة",
    },
    org: {
      en: "Masr Al Arabia Foundation for Human Rights",
      ar: "مؤسسة مصر العربية لحقوق الإنسان",
    },
    text: {
      en: "Led communication workflows and translated organizational objectives into structured public engagement.",
      ar: "قيادة منظومة الاتصال وتحويل أهداف المؤسسة إلى تواصل جماهيري منظم وفعّال.",
    },
  },
  {
    role: {
      en: "Administrative Director & Contracts Officer",
      ar: "المدير الإداري ومسؤول العقود",
    },
    org: {
      en: "ZAD Association — Assiut",
      ar: "جمعية زاد — أسيوط",
    },
    text: {
      en: "Managed administration, contracts, documentation, and the systems behind operational delivery.",
      ar: "إدارة الشؤون الإدارية والعقود والتوثيق والأنظمة الداعمة للتشغيل اليومي.",
    },
  },
  {
    role: {
      en: "IT & Digital Transformation Manager",
      ar: "مدير تكنولوجيا المعلومات والتحول الرقمي",
    },
    org: {
      en: "M2A Group",
      ar: "مجموعة M2A",
    },
    text: {
      en: "Designing connected platforms that unite brand, data, CRM, automation, messaging, and AI.",
      ar: "تصميم منصات مترابطة تجمع الهوية والبيانات وإدارة العملاء والأتمتة والرسائل والذكاء الاصطناعي.",
    },
  },
];