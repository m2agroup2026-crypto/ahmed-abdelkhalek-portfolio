"use client";

import { useEffect, useState } from "react";

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

const social = [
  {label:"Facebook",url:"https://www.facebook.com/ahmed.abdelkhalek2/"},
  {label:"Instagram",url:"https://www.instagram.com/ahmed.khalek.pr/"},
  {label:"LinkedIn",url:"https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/"},
];

export default function Home() {
  const [lang,setLang] = useState<Lang>("en");
  const [menuOpen,setMenuOpen] = useState(false);
  const [transition,setTransition] = useState<"to-ar"|"to-en"|null>(null);
  const [dark,setDark] = useState(false);
  const ar = lang === "ar";

  useEffect(() => { document.documentElement.lang=lang; document.documentElement.dir=ar?"rtl":"ltr"; },[lang,ar]);
  useEffect(() => { const saved=localStorage.getItem("ahmed-portfolio-theme"); setDark(saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches); },[]);
  useEffect(() => { document.documentElement.dataset.theme=dark?"dark":"light"; },[dark]);
  const switchLanguage=()=>{if(transition)return;setTransition(ar?"to-en":"to-ar");setTimeout(()=>setLang(ar?"en":"ar"),340);setTimeout(()=>setTransition(null),850);};

  const premium = [
    {cls:"card-lime",icon:"layers",code:{en:"PLATFORM / 01",ar:"منصة / 01"},visual:"WEB",title:{en:"Corporate Digital Platform",ar:"المنصة الرقمية المؤسسية"},text:{en:"A responsive public layer built to convert attention into qualified action.",ar:"واجهة عامة متجاوبة تحوّل الاهتمام إلى تفاعل وفرص حقيقية."},tags:["Next.js","Responsive UX","SEO"]},
    {cls:"card-cyan",icon:"brain",code:{en:"INTELLIGENCE / 02",ar:"ذكاء / 02"},visual:"AI",title:{en:"Website Lead AI CRM",ar:"نظام CRM ذكي للعملاء"},text:{en:"A structured system turning enquiries into an intelligent, coordinated pipeline.",ar:"نظام منظم يحوّل الاستفسارات إلى مسار ذكي ومترابط للعملاء."},tags:["CRM","AI Assist","Supabase"]},
    {cls:"card-violet",icon:"flow",code:{en:"AUTOMATION / 03",ar:"أتمتة / 03"},visual:"OS",title:{en:"Automation Command Layer",ar:"طبقة قيادة الأتمتة"},text:{en:"Event-driven workflows connect messages, teams, data, and decisions.",ar:"مسارات قائمة على الأحداث تربط الرسائل والفرق والبيانات والقرارات."},tags:["APIs","Workflows","Events"]},
  ];

  return <main className={ar?"arabic-ui":"english-ui"}>
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="#top"><span>AA</span><b>{ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}</b></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)}>{t(copy.nav.menu,lang)}</button>
      <div className={`nav-links ${menuOpen?"open":""}`}><a href="#journey">{t(copy.nav.journey,lang)}</a><a href="#case-study">{t(copy.nav.caseStudy,lang)}</a><a href="#expertise">{t(copy.nav.expertise,lang)}</a><a href="#contact">{t(copy.nav.contact,lang)}</a></div>
      <button className="theme-toggle" onClick={()=>{const next=!dark;setDark(next);localStorage.setItem("ahmed-portfolio-theme",next?"dark":"light")}} aria-label={dark?"Light mode":"Dark mode"}><span className="theme-halo"/><span>{dark?"☾":"☼"}</span></button>
      <button className={`language-rail ${ar?"is-ar":"is-en"}`} onClick={switchLanguage}><span className="language-glow"/><span className="language-option">EN</span><span className="language-option">ع</span><span className="language-thumb">{ar?"ع":"EN"}</span></button>
    </nav>
    <div className={`language-ticker ${ar?"ticker-ar":"ticker-en"}`}><div>{[0,1].map(i=><span key={i}>✦ {ar?"هندسة التحول الرقمي • أنظمة مترابطة • ذكاء وأتمتة • منصات مؤسسية":"DIGITAL TRANSFORMATION • CONNECTED SYSTEMS • AI & AUTOMATION • ENTERPRISE PLATFORMS"}</span>)}</div></div>
    {transition&&<div className={`language-wipe ${transition}`}><div className="wipe-grid"/><div className="wipe-copy"><small>{ar?"لغة الواجهة":"INTERFACE LANGUAGE"}</small><strong>{transition==="to-ar"?"العربية":"ENGLISH"}</strong><span>{transition==="to-ar"?"تجربة رقمية بلا حدود":"DIGITAL EXPERIENCE / RELOADED"}</span></div></div>}

    <section id="top" className="hero shell">
      <div className="hero-copy"><p className="eyebrow"><span/>{t(copy.hero.label,lang)}</p><h1>{t(copy.hero.title,lang)}<br/><em>{t(copy.hero.accent,lang)}</em></h1><p className="hero-summary">{t(copy.hero.summary,lang)}</p><div className="hero-actions"><a className="button primary" href="#case-study">{t(copy.hero.work,lang)} ↗</a><a className="button secondary" href="#contact">{t(copy.hero.talk,lang)}</a></div></div>
      <div className="portrait-wrap"><div className="portrait-orbit"/><div className="portrait-frame"><img src="/ahmed-abdelkhalek.jpg" alt={ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}/><div className="portrait-shade"/><div className="portrait-tag"><span>01</span><strong>{ar?"مهندس التحول الرقمي":"DIGITAL TRANSFORMATION ENGINEER"}</strong></div></div><span className="portrait-node node-one">AI</span><span className="portrait-node node-two">CRM</span></div>
      <div className="capability-strip">{(ar?["التحول الرقمي","منصات Full-Stack","الذكاء والأتمتة","هندسة CRM","تكامل API","تصميم العمليات"]:["Digital Transformation","Full-Stack Platforms","AI & Automation","CRM Architecture","API Integrations","Business Process Design"]).map(x=><span key={x}>{x}</span>)}</div>
    </section>

    <section className="identity shell section"><div><p className="section-index">{t(copy.identity.index,lang)}</p><h2>{t(copy.identity.title,lang)}<br/><em>{t(copy.identity.accent,lang)}</em></h2></div><div className="identity-copy"><p>{t(copy.identity.p1,lang)}</p><p>{t(copy.identity.p2,lang)}</p><div className="quote">“{t(copy.identity.quote,lang)}”</div></div></section>

    <section id="journey" className="journey section"><div className="shell"><div className="section-heading"><div><p className="section-index">{t(copy.journey.index,lang)}</p><h2>{t(copy.journey.title,lang)}<br/><em>{t(copy.journey.accent,lang)}</em></h2></div><p>{t(copy.journey.intro,lang)}</p></div><div className="timeline">{journey.map((item,i)=><article key={item.role.en}><span className="timeline-number">0{i+1}</span><div><p className="timeline-org">{t(item.org,lang)}</p><h3>{t(item.role,lang)}</h3><p>{t(item.text,lang)}</p></div></article>)}</div></div></section>

    <section id="case-study" className="case-study shell section"><div className="case-intro"><p className="section-index">{t(copy.caseStudy.index,lang)}</p><span className="live-pill">{t(copy.caseStudy.live,lang)}</span><h2>{t(copy.caseStudy.name,lang)}</h2><p>{t(copy.caseStudy.intro,lang)}</p><a className="text-link" href="https://m2agroupeg.com/" target="_blank" rel="noreferrer">{t(copy.caseStudy.visit,lang)} ↗</a></div><div className="case-statement"><span>{t(copy.caseStudy.challenge,lang)}</span><p>{t(copy.caseStudy.challengeText,lang)}</p></div><div className="architecture-grid">{architecture.map((item,i)=><article key={item.title.en}><div className="card-top"><SystemIcon name={item.icon}/><span>0{i+1}</span></div><h3>{t(item.title,lang)}</h3><p>{t(item.text,lang)}</p></article>)}</div><div className="outcome"><p className="section-index">{t(copy.caseStudy.outcome,lang)}</p><h3>{t(copy.caseStudy.outcomeTitle,lang)}</h3><div>{(ar?["الموقع","CRM","المحادثات","الأتمتة","الذكاء"]:["Website","Lead CRM","Messaging","Automation","Intelligence"]).map((x,i)=><span key={x}>{i>0&&<i>←</i>}{x}</span>)}</div></div></section>

    <section className="selected-systems section"><div className="shell"><div className="systems-heading"><div><p className="section-index">{t(copy.systems.index,lang)}</p><h2>{t(copy.systems.title,lang)}<br/><em>{t(copy.systems.accent,lang)}</em></h2></div><p>{t(copy.systems.intro,lang)}</p></div><div className="premium-cards">{premium.map(card=><article className={`premium-card ${card.cls}`} key={card.visual}><div className="card-scan"/><div className="premium-card-top"><SystemIcon name={card.icon}/><span>{t(card.code,lang)}</span></div><div className="premium-visual"><span className="visual-ring"/><strong>{card.visual}</strong></div><div className="premium-card-copy"><h3>{t(card.title,lang)}</h3><p>{t(card.text,lang)}</p><div>{card.tags.map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></div></section>

    <section id="expertise" className="expertise section"><div className="shell"><p className="section-index">{t(copy.expertise.index,lang)}</p><div className="expertise-layout"><h2>{t(copy.expertise.title,lang)}<br/><em>{t(copy.expertise.accent,lang)}</em></h2><div className="expertise-list">{[
      {title:{en:"Platform Engineering",ar:"هندسة المنصات"},text:{en:"Responsive platforms built around business goals, performance, accessibility, and maintainable architecture.",ar:"منصات متجاوبة مبنية حول أهداف الأعمال والأداء وسهولة الوصول وهندسة قابلة للتطوير."}},
      {title:{en:"Automation Systems",ar:"أنظمة الأتمتة"},text:{en:"Event-driven automations that reduce manual work and improve speed, visibility, and consistency.",ar:"أتمتة قائمة على الأحداث تقلل العمل اليدوي وتحسّن السرعة والوضوح والاتساق."}},
      {title:{en:"CRM & AI Integration",ar:"تكامل CRM والذكاء الاصطناعي"},text:{en:"Connected pipelines, intelligent routing, APIs, and AI-assisted processes turning activity into action.",ar:"مسارات مترابطة وتوجيه ذكي وواجهات API وعمليات مدعومة بالذكاء الاصطناعي."}},
    ].map((x,i)=><article key={x.title.en}><span>0{i+1}</span><div><h3>{t(x.title,lang)}</h3><p>{t(x.text,lang)}</p></div></article>)}</div></div><div className="stack">{["Next.js","React","TypeScript","Supabase","REST APIs","AI Workflows","CRM","Automation"].map(x=><span key={x}>{x}</span>)}</div></div></section>

    <section id="contact" className="contact shell section"><p className="section-index">{t(copy.contact.index,lang)}</p><div className="contact-grid"><div><h2>{t(copy.contact.title,lang)}<br/><em>{t(copy.contact.accent,lang)}</em></h2><p>{t(copy.contact.intro,lang)}</p><div className="social-row">{social.map(x=><a href={x.url} target="_blank" rel="noreferrer" key={x.label}>{x.label} ↗</a>)}</div></div><div className="contact-links"><a href="mailto:ahmed@m2agruop.com"><span>{ar?"البريد الأساسي":"Primary email"}</span>ahmed@m2agruop.com ↗</a><a href="mailto:a7madsadlion@gmail.com"><span>{ar?"البريد الشخصي":"Personal email"}</span>a7madsadlion@gmail.com ↗</a><a href="https://wa.me/201066956222"><span>WhatsApp</span>+20 106 695 6222 ↗</a><a href="tel:+201096588887"><span>{ar?"الهاتف":"Phone"}</span>+20 109 658 8887 ↗</a></div></div></section>
    <footer className="footer shell"><div className="brand"><span>AA</span><b>{ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}</b></div><p>{t(copy.hero.label,lang)}<br/>{ar?"القاهرة، مصر":"Cairo, Egypt"}</p><a href="#top">{ar?"العودة للأعلى ↑":"Back to top ↑"}</a></footer>
  </main>;
}
