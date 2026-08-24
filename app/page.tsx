"use client";

import { useEffect, useState, useRef } from "react";

type Lang = "en" | "ar";
type Bi = { en: string; ar: string };

const t = (value: Bi, lang: Lang) => value[lang];

const journey: Array<{ role: Bi; org: Bi; text: Bi }> = [
  { role:{en:"Public Relations & Media Officer",ar:"مسؤول العلاقات العامة والإعلام"}, org:{en:"Faculty of Medicine",ar:"كلية الطب"}, text:{en:"Institutional communication, event coordination, stakeholder relations, and public-facing operations.",ar:"إدارة الاتصال المؤسسي وتنظيم الفعاليات والعلاقات مع أصحاب المصلحة والعمليات الجماهيرية."} },
  { role:{en:"Head of Public Relations",ar:"رئيس قسم العلاقات العامة"}, org:{en:"Masr Al Arabia Foundation for Human Rights",ar:"مؤسسة مصر العربية لحقوق الإنسان"}, text:{en:"Led communication workflows and translated organizational objectives into structured public engagement.",ar:"قيادة منظومة الاتصال وتحويل أهداف المؤسسة إلى تواصل جماهيري منظم وفعّال."} },
  { role:{en:"Administrative Director & Contracts Officer",ar:"المدير الإداري ومسؤول العقود"}, org:{en:"ZAD Association — Assiut",ar:"جمعية زاد — أسيوط"}, text:{en:"Managed administration, contracts, documentation, and the systems behind operational delivery.",ar:"إدارة الشؤون الإدارية والعقود والتوثيق والأنظمة الداعمة للتشغيل اليومي."} },
  { role:{en:"IT & Digital Transformation Manager",ar:"مدير تكنولوجيا المعلومات والتحول الرقمي"}, org:{en:"M2A Group",ar:"مجموعة M2A"}, text:{en:"Designing connected platforms that unite brand, data, CRM, automation, messaging, and AI.",ar:"تصميم منصات مترابطة تجمع الهوية والبيانات وإدارة العملاء والأتمتة والرسائل والذكاء الاصطناعي."} },
];

const architecture: Array<{ title: Bi; text: Bi; icon: string }> = [
  { icon:"spark",title:{en:"Digital Identity",ar:"الهوية الرقمية"},text:{en:"A unified, credible presence across every customer touchpoint.",ar:"حضور موحّد وموثوق عبر جميع نقاط التواصل مع العملاء."} },
  { icon:"layers",title:{en:"Corporate Platform",ar:"المنصة المؤسسية"},text:{en:"A responsive website engineered as the public layer of a larger business system.",ar:"موقع متجاوب تم تصميمه كواجهة عامة لمنظومة أعمال متكاملة."} },
  { icon:"brain",title:{en:"Lead Intelligence",ar:"ذكاء العملاء المحتملين"},text:{en:"Website leads flow into an AI-assisted CRM instead of disconnected inboxes.",ar:"تنتقل طلبات العملاء إلى نظام CRM مدعوم بالذكاء الاصطناعي بدلًا من صناديق منفصلة."} },
  { icon:"message",title:{en:"Connected Conversations",ar:"محادثات مترابطة"},text:{en:"WhatsApp and Messenger integrations bring communication into one workflow.",ar:"ربط واتساب وماسنجر داخل مسار عمل موحّد ومنظم."} },
  { icon:"flow",title:{en:"Automation Layer",ar:"طبقة الأتمتة"},text:{en:"Event-driven workflows remove repetitive tasks and accelerate follow-up.",ar:"مسارات عمل قائمة على الأحداث تلغي المهام المتكررة وتسرّع المتابعة."} },
  { icon:"database",title:{en:"Central Data",ar:"البيانات المركزية"},text:{en:"Supabase, APIs, and structured data create a reliable source of truth.",ar:"Supabase وواجهات API والبيانات المنظمة تصنع مصدرًا مركزيًا موثوقًا."} },
];

const copy = {
  nav:{journey:{en:"Journey",ar:"الرحلة"},caseStudy:{en:"Case Study",ar:"دراسة الحالة"},expertise:{en:"Expertise",ar:"الخبرات"},contact:{en:"Contact",ar:"تواصل"},menu:{en:"Menu",ar:"القائمة"}},
  hero:{label:{en:"Digital Transformation Engineer",ar:"مهندس التحول الرقمي"},title:{en:"Beyond websites.",ar:"أبعد من مجرد مواقع."},accent:{en:"I engineer transformation.",ar:"أنا أهندس التحول."},summary:{en:"I’m Ahmed Abdelkhalek Sayed — a Full-Stack Developer and Automation Systems Architect turning complex institutional operations into connected, scalable digital platforms.",ar:"أنا أحمد عبد الخالق سيد — مطور Full-Stack ومهندس أنظمة أتمتة، أحوّل العمليات المؤسسية المعقدة إلى منصات رقمية مترابطة وقابلة للتوسع."},work:{en:"Explore the work",ar:"استكشف أعمالي"},talk:{en:"Start a conversation",ar:"ابدأ محادثة"}},
  identity:{index:{en:"01 / Professional Identity",ar:"01 / الهوية المهنية"},title:{en:"Technology shaped by",ar:"تكنولوجيا يصنعها"},accent:{en:"institutional insight.",ar:"الفهم المؤسسي."},p1:{en:"My work sits at the intersection of technology, administration, communication, and operations. I don’t begin with screens. I begin with how the institution actually works.",ar:"يقع عملي عند نقطة التقاء التكنولوجيا والإدارة والاتصال والتشغيل. لا أبدأ من الشاشات، بل أبدأ من فهم الطريقة الحقيقية التي تعمل بها المؤسسة."},p2:{en:"I map workflows, data, decisions, and customer touchpoints—then engineer the digital system that connects them into one measurable experience.",ar:"أحلل مسارات العمل والبيانات والقرارات ونقاط التواصل مع العملاء، ثم أبني النظام الرقمي الذي يربطها في تجربة واحدة واضحة وقابلة للقياس."},quote:{en:"The best digital solution doesn’t add software. It removes friction.",ar:"أفضل الحلول الرقمية لا تضيف برمجيات فقط، بل تزيل التعقيد."}},
  journey:{index:{en:"02 / Digital Journey",ar:"02 / الرحلة الرقمية"},title:{en:"Experience became",ar:"تحوّلت الخبرة إلى"},accent:{en:"architecture.",ar:"هندسة رقمية."},intro:{en:"Each chapter added a new layer: communication, governance, operations, and finally the ability to connect them through technology.",ar:"أضافت كل مرحلة طبقة جديدة: الاتصال، والحوكمة، والتشغيل، ثم القدرة على ربطها جميعًا بالتكنولوجيا."}},
  caseStudy:{index:{en:"03 / Flagship Transformation",ar:"03 / مشروع التحول الرئيسي"},live:{en:"Live system",ar:"نظام فعّال"},name:{en:"M2A Digital OS",ar:"نظام M2A الرقمي"},intro:{en:"A connected operating system for the company—not simply a corporate website.",ar:"نظام تشغيل رقمي مترابط للشركة، وليس مجرد موقع مؤسسي."},visit:{en:"Visit M2A Group",ar:"زيارة موقع M2A Group"},challenge:{en:"THE CHALLENGE",ar:"التحدي"},challengeText:{en:"Brand, leads, conversations, follow-up, and operational data lived in separate places. The goal was one digital architecture connecting the full customer journey.",ar:"كانت الهوية والعملاء المحتملون والمحادثات والمتابعة والبيانات التشغيلية موزعة في أماكن منفصلة. كان الهدف بناء معمارية رقمية واحدة تربط رحلة العميل بالكامل."},outcome:{en:"THE OUTCOME",ar:"النتيجة"},outcomeTitle:{en:"One ecosystem. Every interaction connected.",ar:"منظومة واحدة. كل تفاعل مترابط."}},
  systems:{index:{en:"04 / Selected Systems",ar:"04 / أنظمة مختارة"},title:{en:"Premium interfaces.",ar:"واجهات فائقة الجودة."},accent:{en:"Serious infrastructure.",ar:"وبنية تحتية حقيقية."},intro:{en:"Selected layers from the M2A transformation ecosystem—designed to work as one connected operating model.",ar:"طبقات مختارة من منظومة التحول في M2A، صُممت لتعمل كنموذج تشغيلي واحد مترابط."}},
  expertise:{index:{en:"05 / Technical Expertise",ar:"05 / الخبرات التقنية"},title:{en:"From business logic to",ar:"من منطق الأعمال إلى"},accent:{en:"working systems.",ar:"أنظمة تعمل فعليًا."}},
  contact:{index:{en:"06 / Contact",ar:"06 / تواصل معي"},title:{en:"Let’s build the system",ar:"لنبنِ النظام"},accent:{en:"behind your next move.",ar:"خلف خطوتك القادمة."},intro:{en:"Have a transformation challenge, a platform idea, or an operation that needs to work smarter? Let’s talk.",ar:"لديك تحدٍ في التحول الرقمي، أو فكرة منصة، أو عملية تحتاج إلى أن تعمل بذكاء أكبر؟ لنتحدث."}},
};

function SystemIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    spark:<><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    layers:<><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    brain:<><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v1a3 3 0 0 0-1 5.8A3.5 3.5 0 0 0 9.5 20H12V4.5H9.5ZM14.5 4.5A3.5 3.5 0 0 1 18 8v1a3 3 0 0 1 1 5.8 3.5 3.5 0 0 1-4.5 5.2H12V4.5h2.5Z"/><path d="M8 9h4M12 15h4"/></>,
    message:<><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.6-4.8A7.5 7.5 0 0 1 3 12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v3Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    flow:<><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a3 3 0 0 1 3 3v6M12 18H9a3 3 0 0 1-3-3V9"/></>,
    database:<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
  };
  return <span className="system-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg></span>;
}

function SocialIcon({ name }: { name: string }) {
  const icon = name === "Facebook"
    ? <path d="M14 8h3V4h-3c-3.2 0-5 1.9-5 5v3H6v4h3v6h4v-6h3.4l.6-4h-4V9c0-.7.3-1 1-1Z"/>
    : name === "Instagram"
      ? <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>
      : <><rect x="4" y="9" width="4" height="11"/><path d="M6 4.5v.01M11 20v-7c0-2 1.2-4 4-4 2.6 0 4 1.8 4 4v7M11 9v11"/></>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>;
}

const social = [
  {label:"Facebook",url:"https://www.facebook.com/ahmed.abdelkhalek2/"},
  {label:"Instagram",url:"https://www.instagram.com/ahmed.khalek.pr/"},
  {label:"LinkedIn",url:"https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/"},
];

type IntelligenceMessage = { role: "user" | "assistant"; text: string };

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const marks = [450, 1150, 1900, 2800, 3800];
    const timers = marks.map((delay, index) => setTimeout(() => {
      setStage(index + 1);
      if (index === marks.length - 1) setTimeout(onComplete, 720);
    }, delay));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return <div className={`cinematic-intro intro-stage-${stage}`} role="dialog" aria-label="M2A Digital OS initialization">
    <button onClick={onComplete}>SKIP INTRO</button>
    <div className="intro-grid"/><div className="intro-vignette"/>
    <div className="intro-core"><div className="intro-orbit orbit-a"/><div className="intro-orbit orbit-b"/><div className="intro-orbit orbit-c"/><span>M2A</span></div>
    <div className="intro-copy">
      <small>SYSTEM GENESIS / 2026</small>
      <h2>{stage < 2 ? "A SIGNAL BECOMES" : stage < 4 ? "AN INTELLIGENCE" : "A LIVING SYSTEM"}</h2>
      <div className="intro-status"><i/><span>{stage < 1 ? "AWAITING SIGNAL" : stage < 2 ? "ARCHITECTURE MAPPED" : stage < 3 ? "AGENTS SYNCHRONIZED" : stage < 4 ? "OPERATIONS CONNECTED" : "M2A DIGITAL OS / ONLINE"}</span></div>
    </div>
    <div className="intro-readout"><span>AI CORE</span><span>AGENT MESH</span><span>AUTOMATION</span><span>ENTERPRISE OS</span></div>
  </div>;
}

function IntelligenceConsole({ open, onClose, ar }: { open: boolean; onClose: () => void; ar: boolean }) {
  const [messages, setMessages] = useState<IntelligenceMessage[]>([{
    role:"assistant",
    text: ar ? "أنا M2A Intelligence. اسألني عن أي معرفة عامة، أو أعطني مشكلة مؤسسية وسأحوّلها إلى تصور نظام قابل للتنفيذ." : "I am M2A Intelligence. Ask me anything, or give me an institutional problem and I will architect a system around it."
  }]);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || thinking) return;
    const next = [...messages, { role:"user" as const, text }];
    setMessages(next); setValue(""); setThinking(true);
  try {
  const response = await fetch("/api/intelligence", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      messages:next,
      language:ar?"ar":"en"
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Intelligence core unavailable");
  }

  setMessages(current => [
    ...current,
    {
      role:"assistant",
      text:data.text
    }
  ]);

} catch (error) {

  console.error("M2A Intelligence Error:", error);

  setMessages(current => [
    ...current,
    {
      role:"assistant",
      text: error instanceof Error
        ? error.message
        : "Unknown error"
    }
  ]);

} finally {

  setThinking(false);

}
  return <div className={`intelligence-console ${open?"is-open":""}`} aria-hidden={!open}>
    <div className="console-backdrop" onClick={onClose}/>
    <section role="dialog" aria-modal="true" aria-label="M2A Intelligence">
      <header><div className="console-brand"><span><i/></span><div><small>M2A / COGNITIVE SYSTEM</small><strong>M2A INTELLIGENCE</strong></div></div><div className="console-state"><i/>LIVE REASONING</div><button onClick={onClose} aria-label="Close intelligence console">×</button></header>
      <div className="console-layout">
        <aside><small>CAPABILITY MATRIX</small>{["GENERAL KNOWLEDGE","ENTERPRISE STRATEGY","SYSTEM ARCHITECTURE","AI & AUTOMATION","M2A CONTEXT"].map((item,i)=><div key={item}><span>0{i+1}</span>{item}<i/></div>)}</aside>
        <div className="conversation">
          <div className="conversation-stream">{messages.map((message,index)=><article className={message.role} key={`${message.role}-${index}`}><small>{message.role==="assistant"?"M2A INTELLIGENCE":"OPERATOR"}</small><p>{message.text}</p></article>)}{thinking&&<article className="assistant thinking"><small>M2A INTELLIGENCE</small><p><i/><i/><i/> Synthesizing knowledge and context</p></article>}</div>
          <div className="prompt-suggestions">{(ar?["الذرة فيها كام نواة؟","صمم نظامًا لإدارة شركة متعددة الفروع","كيف تعمل أنظمة AI Agents؟"]:["How many nuclei does an atom have?","Architect a multi-branch company OS","How do AI agents work?"]).map(prompt=><button onClick={()=>setValue(prompt)} key={prompt}>{prompt}</button>)}</div>
          <form onSubmit={submit}><span>COMMAND</span><textarea value={value} onChange={e=>setValue(e.target.value)} placeholder={ar?"اسأل عن أي شيء أو صف تحديًا معقدًا...":"Ask anything or describe a complex challenge..."} rows={2}/><button type="submit" disabled={thinking} aria-label="Send command">↗</button></form>
        </div>
      </div>
    </section>
  </div>;
}

export default function Home() {
  const [lang,setLang] = useState<Lang>("ar");
  const [menuOpen,setMenuOpen] = useState(false);
  const [transition,setTransition] = useState<"to-ar"|"to-en"|null>(null);
  const [dark,setDark] = useState(false);
  const [intro,setIntro] = useState(true);
  const [intelligenceOpen,setIntelligenceOpen] = useState(false);
  const ar = lang === "ar";

  useEffect(() => { document.documentElement.lang=lang; document.documentElement.dir=ar?"rtl":"ltr"; },[lang,ar]);
  useEffect(() => { const saved=localStorage.getItem("ahmed-portfolio-theme"); setDark(saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches); },[]);
  useEffect(() => { document.documentElement.dataset.theme=dark?"dark":"light"; },[dark]);
  const switchLanguage=()=>{if(transition)return;const next:Lang=ar?"en":"ar";setTransition(ar?"to-en":"to-ar");setTimeout(()=>setLang(next),340);setTimeout(()=>setTransition(null),850);};
  const sendMessage=(event:React.FormEvent<HTMLFormElement>)=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`${data.get("project")} — ${data.get("name")}`);const body=encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);window.location.href=`mailto:ahmed@m2agruop.com?subject=${subject}&body=${body}`;};

  const premium = [
    {cls:"card-lime",icon:"layers",code:{en:"PLATFORM / 01",ar:"منصة / 01"},visual:"WEB",title:{en:"Corporate Digital Platform",ar:"المنصة الرقمية المؤسسية"},text:{en:"A responsive public layer built to convert attention into qualified action.",ar:"واجهة عامة متجاوبة تحوّل الاهتمام إلى تفاعل وفرص حقيقية."},tags:["Next.js","Responsive UX","SEO"]},
    {cls:"card-cyan",icon:"brain",code:{en:"INTELLIGENCE / 02",ar:"ذكاء / 02"},visual:"AI",title:{en:"Website Lead AI CRM",ar:"نظام CRM ذكي للعملاء"},text:{en:"A structured system turning enquiries into an intelligent, coordinated pipeline.",ar:"نظام منظم يحوّل الاستفسارات إلى مسار ذكي ومترابط للعملاء."},tags:["CRM","AI Assist","Supabase"]},
    {cls:"card-violet",icon:"flow",code:{en:"AUTOMATION / 03",ar:"أتمتة / 03"},visual:"OS",title:{en:"Automation Command Layer",ar:"طبقة قيادة الأتمتة"},text:{en:"Event-driven workflows connect messages, teams, data, and decisions.",ar:"مسارات قائمة على الأحداث تربط الرسائل والفرق والبيانات والقرارات."},tags:["APIs","Workflows","Events"]},
  ];
  const tickerItems = ar
    ? ["هندسة التحول الرقمي","تطوير منصات Full-Stack","أتمتة العمليات المؤسسية","حلول الذكاء الاصطناعي","هندسة CRM","تكامل الأنظمة وواجهات API","تصميم تجارب رقمية متجاوبة","تحليل وتطوير مسارات العمل","منصات بيانات مترابطة","حلول رقمية قابلة للتوسع"]
    : ["Digital Transformation Engineering","Full-Stack Platform Development","Enterprise Process Automation","AI-Powered Solutions","CRM Architecture","Systems & API Integration","Responsive Digital Experiences","Workflow Design & Optimization","Connected Data Platforms","Scalable Digital Operations"];
  const insightCards = ar ? [
    {n:"01",title:"أفهم العمل قبل كتابة الكود",text:"أبدأ من رحلة المستخدم ومسارات القرار والبيانات، ثم أحوّلها إلى معمارية رقمية واضحة وقابلة للقياس."},
    {n:"02",title:"أبني منظومة لا واجهة فقط",text:"الموقع عندي هو نقطة دخول إلى CRM والأتمتة والتحليلات والمحادثات، وليس مجموعة صفحات منفصلة."},
    {n:"03",title:"أصمم للنمو والاستمرار",text:"كل حل يُبنى بأداء قوي، وتجربة متجاوبة، وهيكل يسهل تطويره ودمجه مع احتياجات المؤسسة القادمة."}
  ] : [
    {n:"01",title:"Understand before coding",text:"I begin with journeys, decisions, and data—then translate them into a measurable digital architecture."},
    {n:"02",title:"Build systems, not screens",text:"The website becomes an entry point to CRM, automation, analytics, and connected conversations."},
    {n:"03",title:"Engineer for lasting growth",text:"Every solution is responsive, performant, maintainable, and ready for the institution’s next stage."}
  ];

  return <main className={ar?"arabic-ui":"english-ui"}>
    {intro&&<CinematicIntro onComplete={()=>setIntro(false)}/>}
    <IntelligenceConsole open={intelligenceOpen} onClose={()=>setIntelligenceOpen(false)} ar={ar}/>
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="#top"><span>AA</span><b>{ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}</b></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)}>{t(copy.nav.menu,lang)}</button>
      <div className={`nav-links ${menuOpen?"open":""}`}><a href="#journey">{t(copy.nav.journey,lang)}</a><a href="#case-study">{t(copy.nav.caseStudy,lang)}</a><a href="#expertise">{t(copy.nav.expertise,lang)}</a><a href="#contact">{t(copy.nav.contact,lang)}</a></div>
      <button className="theme-toggle" onClick={()=>{const next=!dark;setDark(next);localStorage.setItem("ahmed-portfolio-theme",next?"dark":"light")}} aria-label={dark?"Light mode":"Dark mode"}><span className="theme-halo"/><span>{dark?"☾":"☼"}</span></button>
      <button className={`language-rail ${ar?"is-ar":"is-en"}`} onClick={switchLanguage}><span className="language-glow"/><span className="language-option">EN</span><span className="language-option">ع</span><span className="language-thumb">{ar?"ع":"EN"}</span></button>
    </nav>
    <div className={`language-ticker ${ar?"ticker-ar":"ticker-en"}`} aria-label={ar?"مجالات الخبرة":"Expertise areas"}><div>{[0,1].map(loop=><div className="ticker-set" aria-hidden={loop===1} key={loop}>{tickerItems.map((item,i)=><span className={`ticker-card ticker-tone-${i%3}`} key={`${loop}-${item}`}><i>0{(i%9)+1}</i>{item}<b>↗</b></span>)}</div>)}</div></div>
    {transition&&<div className={`language-wipe ${transition}`}><div className="wipe-grid"/><div className="wipe-copy"><small>{ar?"لغة الواجهة":"INTERFACE LANGUAGE"}</small><strong>{transition==="to-ar"?"العربية":"ENGLISH"}</strong><span>{transition==="to-ar"?"تجربة رقمية بلا حدود":"DIGITAL EXPERIENCE / RELOADED"}</span></div></div>}

    <section id="top" className="hero future-hero shell">
      <div className="future-field"><div className="field-grid"/><div className="field-horizon"/><span className="data-ray ray-a"/><span className="data-ray ray-b"/><span className="data-ray ray-c"/></div>
      <div className="hero-copy future-copy"><p className="eyebrow"><span/>M2A DIGITAL OPERATING SYSTEM / ONLINE</p><h1><span>{ar?"لا أبني برمجيات.":"I DON’T BUILD SOFTWARE."}</span><em>{ar?"بل أهندس ذكاءً يشغّل المؤسسات.":"I ENGINEER INTELLIGENCE THAT RUNS ENTERPRISES."}</em></h1><p className="hero-summary">{ar?"من هندسة الأوامر ووكلاء الذكاء الاصطناعي، إلى التطبيقات والمنصات والأتمتة وأنظمة التحكم المؤسسية — أحوّل أعقد العمليات إلى نظام رقمي واحد يفكر ويتطور ويتوسع.":"From prompt engineering and autonomous AI agents to applications, platforms, automation and enterprise command systems—I transform complex operations into one digital organism that thinks, adapts and scales."}</p><div className="hero-actions"><button className="button primary intelligence-trigger" onClick={()=>setIntelligenceOpen(true)}><i/> {ar?"ادخل إلى نواة الذكاء":"ENTER THE INTELLIGENCE"} ↗</button><a className="button secondary" href="#case-study">{ar?"استكشف الأنظمة":"EXPLORE SYSTEMS"}</a></div><div className="future-metrics"><span><b>01</b>INTELLIGENCE</span><span><b>∞</b>AUTOMATION</span><span><b>24/7</b>OPERATIONS</span></div></div>
      <div className="intelligence-visual" onClick={()=>setIntelligenceOpen(true)} role="button" tabIndex={0} aria-label="Open M2A Intelligence"><div className="visual-shell shell-one"/><div className="visual-shell shell-two"/><div className="visual-shell shell-three"/><div className="neural-ring ring-one"/><div className="neural-ring ring-two"/><div className="neural-core"><img src="/m2a-logo.png" alt="M2A Group"/><span/></div>{["AI AGENTS","AUTOMATION","DIGITAL TWINS","ENTERPRISE OS","APPS","DATA"].map((x,i)=><span className={`neural-node neural-node-${i+1}`} key={x}><i/>{x}</span>)}<div className="visual-caption"><small>COGNITIVE CORE</small><strong>TOUCH TO INTERACT</strong></div></div>
      <div className="capability-strip">{(ar?["التحول الرقمي","منصات Full-Stack","الذكاء والأتمتة","هندسة CRM","تكامل API","تصميم العمليات"]:["Digital Transformation","Full-Stack Platforms","AI & Automation","CRM Architecture","API Integrations","Business Process Design"]).map(x=><span key={x}>{x}</span>)}</div>
    </section>

    <section className="opening shell section"><div className="opening-lead"><p className="section-index">{ar?"00 / كلمة افتتاحية":"00 / Opening statement"}</p><h2>{ar?"أحوّل التعقيد المؤسسي إلى":"I turn operational complexity into"} <em>{ar?"نظام رقمي يعمل بذكاء.":"digital systems that think clearly."}</em></h2><p>{ar?"لا أتعامل مع التحول الرقمي كتصميم جميل فوق إجراءات قديمة. أعمل على كشف الاحتكاك داخل المؤسسة، وربط الأشخاص والبيانات والقرارات في تجربة واحدة؛ أسرع في التنفيذ، أوضح في القياس، وأسهل في التطوير.":"Digital transformation is not a polished interface placed over an old process. I uncover operational friction and connect people, data, and decisions into one experience that is faster to run, easier to measure, and ready to evolve."}</p></div><div className="insight-grid">{insightCards.map(card=><article key={card.n}><span>{card.n}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>

    <section className="identity shell section"><div><p className="section-index">{t(copy.identity.index,lang)}</p><h2>{t(copy.identity.title,lang)} <em>{t(copy.identity.accent,lang)}</em></h2></div><div className="identity-copy"><p>{t(copy.identity.p1,lang)}</p><p>{t(copy.identity.p2,lang)}</p><div className="quote">“{t(copy.identity.quote,lang)}”</div></div></section>

    <section id="journey" className="journey section"><div className="shell"><div className="section-heading"><div><p className="section-index">{t(copy.journey.index,lang)}</p><h2>{t(copy.journey.title,lang)} <em>{t(copy.journey.accent,lang)}</em></h2></div><p>{t(copy.journey.intro,lang)}</p></div><div className="timeline">{journey.map((item,i)=><article key={item.role.en}><span className="timeline-number">0{i+1}</span><div><p className="timeline-org">{t(item.org,lang)}</p><h3>{t(item.role,lang)}</h3><p>{t(item.text,lang)}</p></div></article>)}</div></div></section>

    <section id="case-study" className="case-study shell section"><div className="case-intro"><p className="section-index">{t(copy.caseStudy.index,lang)}</p><span className="live-pill">{t(copy.caseStudy.live,lang)}</span><h2>{t(copy.caseStudy.name,lang)}</h2><p>{t(copy.caseStudy.intro,lang)}</p><a className="text-link" href="https://m2agroupeg.com/" target="_blank" rel="noreferrer">{t(copy.caseStudy.visit,lang)} ↗</a></div><div className="case-statement"><span>{t(copy.caseStudy.challenge,lang)}</span><p>{t(copy.caseStudy.challengeText,lang)}</p></div><div className="architecture-grid">{architecture.map((item,i)=><article key={item.title.en}><div className="card-top"><SystemIcon name={item.icon}/><span>0{i+1}</span></div><h3>{t(item.title,lang)}</h3><p>{t(item.text,lang)}</p></article>)}</div><div className="outcome"><p className="section-index">{t(copy.caseStudy.outcome,lang)}</p><h3>{t(copy.caseStudy.outcomeTitle,lang)}</h3><div>{(ar?["الموقع","CRM","المحادثات","الأتمتة","الذكاء"]:["Website","Lead CRM","Messaging","Automation","Intelligence"]).map((x,i)=><span key={x}>{i>0&&<i>←</i>}{x}</span>)}</div></div></section>

    <section className="selected-systems section"><div className="shell"><div className="systems-heading"><div><p className="section-index">{t(copy.systems.index,lang)}</p><h2>{t(copy.systems.title,lang)} <em>{t(copy.systems.accent,lang)}</em></h2></div><p>{t(copy.systems.intro,lang)}</p></div><div className="premium-cards">{premium.map(card=><article className={`premium-card ${card.cls}`} key={card.visual}><div className="card-scan"/><div className="premium-card-top"><SystemIcon name={card.icon}/><span>{t(card.code,lang)}</span></div><div className="premium-visual"><span className="visual-ring"/><strong>{card.visual}</strong></div><div className="premium-card-copy"><h3>{t(card.title,lang)}</h3><p>{t(card.text,lang)}</p><div>{card.tags.map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></div></section>

    <section id="expertise" className="expertise section"><div className="shell"><p className="section-index">{t(copy.expertise.index,lang)}</p><div className="expertise-layout"><h2>{t(copy.expertise.title,lang)} <em>{t(copy.expertise.accent,lang)}</em></h2><div className="expertise-list">{[
      {title:{en:"Platform Engineering",ar:"هندسة المنصات"},text:{en:"Responsive platforms built around business goals, performance, accessibility, and maintainable architecture.",ar:"منصات متجاوبة مبنية حول أهداف الأعمال والأداء وسهولة الوصول وهندسة قابلة للتطوير."}},
      {title:{en:"Automation Systems",ar:"أنظمة الأتمتة"},text:{en:"Event-driven automations that reduce manual work and improve speed, visibility, and consistency.",ar:"أتمتة قائمة على الأحداث تقلل العمل اليدوي وتحسّن السرعة والوضوح والاتساق."}},
      {title:{en:"CRM & AI Integration",ar:"تكامل CRM والذكاء الاصطناعي"},text:{en:"Connected pipelines, intelligent routing, APIs, and AI-assisted processes turning activity into action.",ar:"مسارات مترابطة وتوجيه ذكي وواجهات API وعمليات مدعومة بالذكاء الاصطناعي."}},
    ].map((x,i)=><article key={x.title.en}><span>0{i+1}</span><div><h3>{t(x.title,lang)}</h3><p>{t(x.text,lang)}</p></div></article>)}</div></div><div className="stack">{["Next.js","React","TypeScript","Supabase","REST APIs","AI Workflows","CRM","Automation"].map(x=><span key={x}>{x}</span>)}</div></div></section>

    <section id="contact" className="contact shell section">
      <div className="contact-head"><div><p className="section-index">{t(copy.contact.index,lang)}</p><h2>{t(copy.contact.title,lang)} <em>{t(copy.contact.accent,lang)}</em></h2></div><div className="availability"><i/><span>{ar?"متاح لمشروعات تحول رقمي مختارة":"Available for select transformation projects"}</span></div></div>
      <div className="contact-grid">
        <div className="contact-story"><p>{t(copy.contact.intro,lang)}</p><div className="social-row">{social.map(x=><a href={x.url} target="_blank" rel="noreferrer" key={x.label}><span><SocialIcon name={x.label}/></span><b>{x.label}</b><i>↗</i></a>)}</div><div className="contact-links"><a href="mailto:ahmed@m2agruop.com"><span>{ar?"البريد الأساسي":"Primary email"}</span>ahmed@m2agruop.com ↗</a><a href="https://wa.me/201066956222"><span>WhatsApp</span>+20 106 695 6222 ↗</a><a href="tel:+201096588887"><span>{ar?"الهاتف":"Phone"}</span>+20 109 658 8887 ↗</a></div></div>
        <form className="contact-form" onSubmit={sendMessage}><div className="form-top"><span>PROJECT SIGNAL / 01</span><b>{ar?"أرسل تفاصيل المشروع":"Tell me about the project"}</b></div><label>{ar?"الاسم":"Your name"}<input name="name" required placeholder={ar?"الاسم الكامل":"Full name"}/></label><label>{ar?"البريد الإلكتروني":"Email address"}<input name="email" required type="email" placeholder="name@company.com"/></label><label>{ar?"نوع المشروع":"Project type"}<select name="project" defaultValue=""><option value="" disabled>{ar?"اختر المسار":"Select a track"}</option><option>{ar?"منصة رقمية":"Digital platform"}</option><option>{ar?"أتمتة وذكاء اصطناعي":"Automation & AI"}</option><option>{ar?"نظام CRM":"CRM system"}</option><option>{ar?"استشارة تحول رقمي":"Transformation advisory"}</option></select></label><label>{ar?"نبذة عن التحدي":"Project brief"}<textarea name="message" required rows={4} placeholder={ar?"ما المشكلة التي تريد حلها؟":"What should the new system solve?"}/></label><button type="submit"><span>{ar?"إرسال موجز المشروع":"Send project brief"}</span><i>↗</i></button></form>
      </div>
    </section>
    <footer className="footer shell"><div className="footer-signature"><span className="footer-monogram">AA</span><h2>Ahmed Abdelkhalek</h2><strong>Digital Transformation<br/>Engineer</strong><p>Full-Stack Web Developer <i/> Automation &amp; AI Solutions Architect</p><small>{ar?"أسيوط، مصر — أبني أنظمة رقمية تربط الرؤية بالتنفيذ":"Assiut, Egypt — Engineering the connection between vision and execution"}</small></div><a className="back-top" href="#top"><span>{ar?"العودة للأعلى":"Back to top"}</span><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20V4M5 11l7-7 7 7"/></svg></i></a></footer>
  </main>;
}
