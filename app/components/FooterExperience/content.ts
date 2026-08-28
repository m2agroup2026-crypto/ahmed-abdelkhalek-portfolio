export type FooterLanguage = "ar" | "en";
type Localized = Record<FooterLanguage, string>;

export const footerContent = {
  prelude: { en: "THE SYSTEM NEVER ENDS AT THE INTERFACE", ar: "النظام لا ينتهي عند الواجهة" },
  title: { en: "Complexity, connected.", ar: "التعقيد، أصبح مترابطًا." },
  accent: { en: "Vision, made operational.", ar: "والرؤية، أصبحت نظامًا يعمل." },
  statement: { en: "Ahmed does not design pages. He architects digital systems that operate, adapt, and scale.", ar: "أحمد لا يصمم صفحات. بل يُهندس أنظمة رقمية تعمل وتتكيّف وتتوسع." },
  role: { en: "Digital Transformation & Enterprise Systems Architect", ar: "مهندس التحول الرقمي والأنظمة المؤسسية" },
  location: { en: "Assiut, Egypt / Operating globally", ar: "أسيوط، مصر / أعمل برؤية عالمية" },
  navigation: { en: "SYSTEM NAVIGATION", ar: "التنقل داخل النظام" },
  channels: { en: "EXTERNAL CHANNELS", ar: "القنوات الخارجية" },
  status: { en: "PORTFOLIO SYSTEM / OPERATIONAL", ar: "نظام الملف المهني / يعمل" },
  copyright: { en: "Designed and engineered by Ahmed Abdelkhalek", ar: "صُمم وهُندس بواسطة أحمد عبد الخالق" },
  top: { en: "Return to system core", ar: "العودة إلى نواة النظام" },
};

export const footerNav = [
  { href: "#top", en: "Identity", ar: "الهوية", code: "01" },
  { href: "#journey", en: "Journey", ar: "الرحلة", code: "02" },
  { href: "#case-study", en: "Case Study", ar: "دراسة الحالة", code: "03" },
  { href: "#systems", en: "Systems", ar: "الأنظمة", code: "04" },
  { href: "#expertise", en: "Capabilities", ar: "القدرات", code: "05" },
  { href: "#contact", en: "Contact", ar: "التواصل", code: "06" },
] as const;

export function footerText(value: Localized, language: FooterLanguage) { return value[language]; }
