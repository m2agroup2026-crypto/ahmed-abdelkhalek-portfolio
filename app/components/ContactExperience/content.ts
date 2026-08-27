export type ContactLanguage = "ar" | "en";
type Localized = Record<ContactLanguage, string>;

export const contactContent = {
  eyebrow: { en: "06 / INITIATE TRANSFORMATION", ar: "06 / ابدأ التحول" },
  status: { en: "SELECT PROJECT INTAKE OPEN", ar: "استقبال المشروعات المختارة متاح" },
  title: { en: "Bring the complexity.", ar: "أحضر التحدي." },
  accent: { en: "We will engineer the system.", ar: "وسنُهندس النظام." },
  intro: { en: "A platform idea, an operational bottleneck, or a transformation mandate—start with the real challenge. The right architecture follows.", ar: "فكرة منصة، أو عائق تشغيلي، أو مهمة تحول كاملة—ابدأ بالتحدي الحقيقي، وستتبعه المعمارية المناسبة." },
  signal: { en: "PROJECT SIGNAL", ar: "إشارة المشروع" },
  response: { en: "Typical response: within 1–2 business days", ar: "الرد المعتاد: خلال يوم إلى يومي عمل" },
  direct: { en: "DIRECT CHANNELS", ar: "قنوات مباشرة" },
  formTitle: { en: "Transmit the project brief", ar: "أرسل موجز المشروع" },
  formIntro: { en: "Define the challenge, not the solution. That is where systems thinking begins.", ar: "عرّف التحدي، لا الحل. من هنا يبدأ التفكير المنظومي." },
  name: { en: "YOUR NAME", ar: "الاسم" },
  email: { en: "WORK EMAIL", ar: "البريد المهني" },
  type: { en: "MISSION TYPE", ar: "نوع المهمة" },
  brief: { en: "THE CHALLENGE", ar: "التحدي" },
  namePlaceholder: { en: "Full name", ar: "الاسم الكامل" },
  briefPlaceholder: { en: "What should the new system make possible?", ar: "ما الذي يجب أن يجعل النظام الجديد ممكنًا؟" },
  select: { en: "Select a transformation track", ar: "اختر مسار التحول" },
  submit: { en: "Transmit project signal", ar: "إرسال إشارة المشروع" },
  privacy: { en: "Your brief stays private and is used only to evaluate the project.", ar: "يظل موجزك خاصًا ويُستخدم فقط لتقييم المشروع." },
  tracks: {
    en: ["Enterprise digital platform", "Automation & AI system", "CRM & customer intelligence", "Transformation architecture"],
    ar: ["منصة رقمية مؤسسية", "نظام أتمتة وذكاء اصطناعي", "CRM وذكاء العملاء", "معمارية تحول رقمي"],
  },
};

export const contactChannels = [
  { code: "01", label: "Professional email", value: "ahmed@m2agroupeg.com", href: "mailto:ahmed@m2agroupeg.com", tone: "lime" },
  { code: "02", label: "LinkedIn", value: "Professional network", href: "https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/", tone: "cyan" },
  { code: "03", label: "WhatsApp", value: "+20 106 695 6222", href: "https://wa.me/201066956222", tone: "violet" },
] as const;

export function contactText(value: Localized, language: ContactLanguage) { return value[language]; }
