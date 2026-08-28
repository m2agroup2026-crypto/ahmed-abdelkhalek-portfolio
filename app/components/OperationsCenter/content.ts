export const operationsCenterContent = {
  ar: {
    eyebrow: "ENTERPRISE IT OPERATIONS CENTER", sequence: "المشهد 05 / طبقة القيادة", title: "غرفة التحكم الرقمية للمؤسسة",
    description: "مركز قيادة تشغيلي يوحّد الأنظمة والبيانات والمنصات والذكاء الاصطناعي داخل رؤية واحدة؛ لمراقبة الأداء، اكتشاف الإشارات، وتسريع القرار المؤسسي.",
    status: { label: "حالة المنظومة", value: "تشغيل مستقر" }, console: "AA / UNIFIED OPERATIONS CONSOLE", live: "اتصال حي", region: "MENA — GCC READY",
    metrics: [
      { label: "سلامة الأنظمة", value: "99.98%", trend: "+0.12%", level: "96%" }, { label: "العُقد النشطة", value: "248", trend: "+18", level: "82%" },
      { label: "تدفقات البيانات", value: "1.4M / يوم", trend: "+24%", level: "88%" }, { label: "عمليات الذكاء الاصطناعي", value: "32", trend: "RUNNING", level: "74%" },
    ],
    topology: { label: "خريطة المنظومة", caption: "اتصال وتشغيل موحّد", core: "نواة القيادة", coreState: "جميع القنوات متصلة", nodes: ["CRM", "DATA", "API", "AI"] },
    feedLabel: "سجل العمليات الحي", feedState: "آخر مزامنة الآن", verified: "تم التحقق",
    feed: ["مزامنة CRM مكتملة", "فحص بوابة API ناجح", "تحسين وكلاء الذكاء الاصطناعي قيد التشغيل", "اتصال العُقد الإقليمية مستقر"],
    signal: "كثافة الإشارات / آخر 12 دورة", footer: { primary: "الحوكمة مفعّلة", center: "قرار واحد مدعوم برؤية تشغيلية كاملة", secondary: "الأنظمة متصلة" },
  },
  en: {
    eyebrow: "ENTERPRISE IT OPERATIONS CENTER", sequence: "SCENE 05 / COMMAND LAYER", title: "Digital Enterprise Command Room",
    description: "A unified operational command layer connecting systems, data, platforms, and AI to monitor performance, detect signals, and accelerate enterprise decisions.",
    status: { label: "SYSTEM STATE", value: "OPERATIONAL" }, console: "AA / UNIFIED OPERATIONS CONSOLE", live: "LIVE CONNECTION", region: "MENA — GCC READY",
    metrics: [
      { label: "SYSTEM HEALTH", value: "99.98%", trend: "+0.12%", level: "96%" }, { label: "ACTIVE NODES", value: "248", trend: "+18", level: "82%" },
      { label: "DATA STREAMS", value: "1.4M / DAY", trend: "+24%", level: "88%" }, { label: "AI PROCESSES", value: "32", trend: "RUNNING", level: "74%" },
    ],
    topology: { label: "SYSTEM TOPOLOGY", caption: "UNIFIED CONNECTIVITY", core: "COMMAND CORE", coreState: "ALL CHANNELS CONNECTED", nodes: ["CRM", "DATA", "API", "AI"] },
    feedLabel: "LIVE OPERATIONS FEED", feedState: "SYNCED JUST NOW", verified: "VERIFIED",
    feed: ["CRM synchronization complete", "API gateway health check passed", "AI agent optimization running", "Regional node connection stable"],
    signal: "SIGNAL DENSITY / LAST 12 CYCLES", footer: { primary: "GOVERNANCE ACTIVE", center: "ONE DECISION LAYER. COMPLETE OPERATIONAL CLARITY.", secondary: "SYSTEMS CONNECTED" },
  },
} as const;

export type OperationsCenterLanguage = keyof typeof operationsCenterContent;
