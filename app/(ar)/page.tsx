"use client";

import { useEffect, useState } from "react";
import EnterpriseHero from "@/app/components/EnterpriseHero/EnterpriseHero";

import EnterpriseSystemsMethod from "@/app/components/EnterpriseSystemsMethod/EnterpriseSystemsMethod";
import FloatingIntelligenceAssistant from "@/app/components/FloatingIntelligenceAssistant/FloatingIntelligenceAssistant";
import IntelligenceModal from "@/app/components/IntelligenceExperience/IntelligenceModal";
import DigitalJourney from "@/app/components/DigitalJourney/DigitalJourney";
type Lang = "en" | "ar";
type Bi = { en: string; ar: string };

const t = (value: Bi, lang: Lang) => value[lang];

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

export default function Home() {
  const [lang,setLang] = useState<Lang>("ar");
  const [menuOpen,setMenuOpen] = useState(false);
  const [transition,setTransition] = useState<"to-ar"|"to-en"|null>(null);
  const [dark,setDark] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const [showBackTop,setShowBackTop] = useState(false);
  const [intelligenceOpen,setIntelligenceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateBackTop = () => {
      setShowBackTop(window.scrollY > window.innerHeight * 0.5);
    };

    updateBackTop();
    window.addEventListener("scroll", updateBackTop, { passive:true });

    return () => window.removeEventListener("scroll", updateBackTop);
  }, []);

  const ar = lang === "ar";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("ahmed-portfolio-language");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLang(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);
  useEffect(() => { const saved=localStorage.getItem("ahmed-portfolio-theme"); setDark(saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches); },[]);
  useEffect(() => { document.documentElement.dataset.theme=dark?"dark":"light"; },[dark]);
  const switchLanguage=()=>{if(transition)return;const next:Lang=ar?"en":"ar";setTransition(ar?"to-en":"to-ar");setTimeout(()=>{setLang(next);localStorage.setItem("ahmed-portfolio-language",next);},340);setTimeout(()=>setTransition(null),850);};
  const sendMessage=(event:React.FormEvent<HTMLFormElement>)=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`${data.get("project")} — ${data.get("name")}`);const body=encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);window.location.href=`mailto:ahmed@m2agroupeg.com?subject=${subject}&body=${body}`;};

  const premium = [
    {cls:"card-lime",icon:"layers",code:{en:"PLATFORM / 01",ar:"منصة / 01"},visual:"WEB",title:{en:"Corporate Digital Platform",ar:"المنصة الرقمية المؤسسية"},text:{en:"A responsive public layer built to convert attention into qualified action.",ar:"واجهة عامة متجاوبة تحوّل الاهتمام إلى تفاعل وفرص حقيقية."},tags:["Next.js","Responsive UX","SEO"]},
    {cls:"card-cyan",icon:"brain",code:{en:"INTELLIGENCE / 02",ar:"ذكاء / 02"},visual:"AI",title:{en:"Website Lead AI CRM",ar:"نظام CRM ذكي للعملاء"},text:{en:"A structured system turning enquiries into an intelligent, coordinated pipeline.",ar:"نظام منظم يحوّل الاستفسارات إلى مسار ذكي ومترابط للعملاء."},tags:["CRM","AI Assist","Supabase"]},
    {cls:"card-violet",icon:"flow",code:{en:"AUTOMATION / 03",ar:"أتمتة / 03"},visual:"OS",title:{en:"Automation Command Layer",ar:"طبقة قيادة الأتمتة"},text:{en:"Event-driven workflows connect messages, teams, data, and decisions.",ar:"مسارات قائمة على الأحداث تربط الرسائل والفرق والبيانات والقرارات."},tags:["APIs","Workflows","Events"]},
  ];
  const tickerItems = ar
    ? ["هندسة التحول الرقمي","تطوير منصات Full-Stack","أتمتة العمليات المؤسسية","حلول الذكاء الاصطناعي","هندسة CRM","تكامل الأنظمة وواجهات API","تصميم تجارب رقمية متجاوبة","تحليل وتطوير مسارات العمل","منصات بيانات مترابطة","حلول رقمية قابلة للتوسع"]
    : ["Digital Transformation Engineering","Full-Stack Platform Development","Enterprise Process Automation","AI-Powered Solutions","CRM Architecture","Systems & API Integration","Responsive Digital Experiences","Workflow Design & Optimization","Connected Data Platforms","Scalable Digital Operations"];
  return <main className={ar?"arabic-ui":"english-ui"}>


    <nav className={`nav shell ${scrolled ? "nav-scrolled" : ""} nav-cinematic-visible`} aria-label="Primary navigation">
      <a className="brand" href="#top"><span>AA</span><b>{ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}</b></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)}>{t(copy.nav.menu,lang)}</button>
      <div className={`nav-links ${menuOpen?"open":""}`}><a href="#journey">{t(copy.nav.journey,lang)}</a><a href="#case-study">{t(copy.nav.caseStudy,lang)}</a><a href="#expertise">{t(copy.nav.expertise,lang)}</a><a href="#contact">{t(copy.nav.contact,lang)}</a>
        <a
          className="edge-gateway"
          href={ar ? "/insights" : "/en/insights"}
          aria-label={ar ? "السَّبْق — بوابتك إلى المعرفة" : "THE EDGE — Your gateway to knowledge"}
        >
          <span className="edge-gateway-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 21V4.8A1.8 1.8 0 0 1 6.8 3h10.4A1.8 1.8 0 0 1 19 4.8V21"/>
              <path d="M9 21V7h7v14M3 21h18"/>
              <circle cx="14" cy="14" r=".7" fill="currentColor" stroke="none"/>
            </svg>
          </span>

          <span className="edge-gateway-copy">
            <strong>{ar ? "السَّبْق" : "THE EDGE"}</strong>
            <small>{ar ? "بوابتك إلى المعرفة" : "Gateway to knowledge"}</small>
          </span>

          <i aria-hidden="true">↗</i>
        </a>
      </div>
      <button className="theme-toggle" onClick={()=>{const next=!dark;setDark(next);localStorage.setItem("ahmed-portfolio-theme",next?"dark":"light")}} aria-label={dark?"Light mode":"Dark mode"}><span className="theme-halo"/><span>{dark?"☾":"☼"}</span></button>
      <button className={`language-rail ${ar?"is-ar":"is-en"}`} onClick={switchLanguage}><span className="language-glow"/><span className="language-option">EN</span><span className="language-option">ع</span><span className="language-thumb">{ar?"ع":"EN"}</span></button>
    </nav>
    <div className={`language-ticker mobile-language-ticker ${ar?"ticker-ar":"ticker-en"}`} aria-label={ar?"مجالات الخبرة":"Expertise areas"}><div>{[0,1].map(loop=><div className="ticker-set" aria-hidden={loop===1} key={loop}>{tickerItems.map((item,i)=><span className={`ticker-card ticker-tone-${i%3}`} key={`${loop}-${item}`}><i>0{(i%9)+1}</i>{item}<b>↗</b></span>)}</div>)}</div></div>
    {transition&&<div className={`language-wipe ${transition}`}><div className="wipe-grid"/><div className="wipe-copy"><small>{ar?"لغة الواجهة":"INTERFACE LANGUAGE"}</small><strong>{transition==="to-ar"?"العربية":"ENGLISH"}</strong><span>{transition==="to-ar"?"تجربة رقمية بلا حدود":"DIGITAL EXPERIENCE / RELOADED"}</span></div></div>}

    <EnterpriseHero
      language={ar ? "ar" : "en"}
    />

    <div className={`language-ticker desktop-language-ticker ${ar?"ticker-ar":"ticker-en"}`} aria-label={ar?"مجالات الخبرة":"Expertise areas"}><div>{[0,1].map(loop=><div className="ticker-set" aria-hidden={loop===1} key={loop}>{tickerItems.map((item,i)=><span className={`ticker-card ticker-tone-${i%3}`} key={`${loop}-${item}`}><i>0{(i%9)+1}</i>{item}<b>↗</b></span>)}</div>)}</div></div>





    <EnterpriseSystemsMethod
      language={ar ? "ar" : "en"}
    />

    <section className="identity shell section"><div><p className="section-index">{t(copy.identity.index,lang)}</p><h2>{t(copy.identity.title,lang)}<br/><em>{t(copy.identity.accent,lang)}</em></h2></div><div className="identity-copy"><p>{t(copy.identity.p1,lang)}</p><p>{t(copy.identity.p2,lang)}</p><div className="quote">“{t(copy.identity.quote,lang)}”</div></div></section>

    <DigitalJourney language={ar ? "ar" : "en"} />

    <section id="case-study" className="case-study shell section"><div className="case-intro"><p className="section-index">{t(copy.caseStudy.index,lang)}</p><span className="live-pill">{t(copy.caseStudy.live,lang)}</span><h2>{t(copy.caseStudy.name,lang)}</h2><p>{t(copy.caseStudy.intro,lang)}</p><a className="text-link" href="https://m2agroupeg.com/" target="_blank" rel="noreferrer">{t(copy.caseStudy.visit,lang)} ↗</a></div><div className="case-statement"><span>{t(copy.caseStudy.challenge,lang)}</span><p>{t(copy.caseStudy.challengeText,lang)}</p></div><div className="architecture-grid">{architecture.map((item,i)=><article key={item.title.en}><div className="card-top"><SystemIcon name={item.icon}/><span>0{i+1}</span></div><h3>{t(item.title,lang)}</h3><p>{t(item.text,lang)}</p></article>)}</div><div className="outcome"><p className="section-index">{t(copy.caseStudy.outcome,lang)}</p><h3>{t(copy.caseStudy.outcomeTitle,lang)}</h3><div>{(ar?["الموقع","CRM","المحادثات","الأتمتة","الذكاء"]:["Website","Lead CRM","Messaging","Automation","Intelligence"]).map((x,i)=><span key={x}>{i>0&&<i>←</i>}{x}</span>)}</div></div></section>

    <section className="selected-systems section"><div className="shell"><div className="systems-heading"><div><p className="section-index">{t(copy.systems.index,lang)}</p><h2>{t(copy.systems.title,lang)}<br/><em>{t(copy.systems.accent,lang)}</em></h2></div><p>{t(copy.systems.intro,lang)}</p></div><div className="premium-cards">{premium.map(card=><article className={`premium-card ${card.cls}`} key={card.visual}><div className="card-scan"/><div className="premium-card-top"><SystemIcon name={card.icon}/><span>{t(card.code,lang)}</span></div><div className="premium-visual"><span className="visual-ring"/><strong>{card.visual}</strong></div><div className="premium-card-copy"><h3>{t(card.title,lang)}</h3><p>{t(card.text,lang)}</p><div>{card.tags.map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></div></section>

    <section id="expertise" className="expertise section"><div className="shell"><p className="section-index">{t(copy.expertise.index,lang)}</p><div className="expertise-layout"><h2>{t(copy.expertise.title,lang)}<br/><em>{t(copy.expertise.accent,lang)}</em></h2><div className="expertise-list">{[
      {title:{en:"Platform Engineering",ar:"هندسة المنصات"},text:{en:"Responsive platforms built around business goals, performance, accessibility, and maintainable architecture.",ar:"منصات متجاوبة مبنية حول أهداف الأعمال والأداء وسهولة الوصول وهندسة قابلة للتطوير."}},
      {title:{en:"Automation Systems",ar:"أنظمة الأتمتة"},text:{en:"Event-driven automations that reduce manual work and improve speed, visibility, and consistency.",ar:"أتمتة قائمة على الأحداث تقلل العمل اليدوي وتحسّن السرعة والوضوح والاتساق."}},
      {title:{en:"CRM & AI Integration",ar:"تكامل CRM والذكاء الاصطناعي"},text:{en:"Connected pipelines, intelligent routing, APIs, and AI-assisted processes turning activity into action.",ar:"مسارات مترابطة وتوجيه ذكي وواجهات API وعمليات مدعومة بالذكاء الاصطناعي."}},
    ].map((x,i)=><article key={x.title.en}><span>0{i+1}</span><div><h3>{t(x.title,lang)}</h3><p>{t(x.text,lang)}</p></div></article>)}</div></div><div className="stack">{["Next.js","React","TypeScript","Supabase","REST APIs","AI Workflows","CRM","Automation"].map(x=><span key={x}>{x}</span>)}</div></div></section>

    <section id="contact" className="contact shell section">
      <div className="contact-head"><div><p className="section-index">{t(copy.contact.index,lang)}</p><h2>{t(copy.contact.title,lang)}<br/><em>{t(copy.contact.accent,lang)}</em></h2></div><div className="availability"><i/><span>{ar?"متاح لمشروعات تحول رقمي مختارة":"Available for select transformation projects"}</span></div></div>
      <div className="contact-grid">
        <div className="contact-story"><p>{t(copy.contact.intro,lang)}</p><div className="social-row">{social.map(x=><a href={x.url} target="_blank" rel="noreferrer" key={x.label}><span><SocialIcon name={x.label}/></span><b>{x.label}</b><i>↗</i></a>)}</div><div className="contact-links"><a href="mailto:ahmed@m2agroupeg.com"><span>{ar?"البريد المهني":"Professional email"}</span>ahmed@m2agroupeg.com ↗</a><a href="mailto:a7madsadlio@aun.edu.eg"><span>{ar?"البريد الأكاديمي":"Academic email"}</span>a7madsadlio@aun.edu.eg ↗</a><a href="https://wa.me/201066956222"><span>WhatsApp</span><bdi dir="ltr">+20 106 695 6222</bdi> ↗</a><a href="tel:+201096588887"><span>{ar?"الهاتف":"Phone"}</span><bdi dir="ltr">+20 109 658 8887</bdi> ↗</a></div></div>
        <form className="contact-form" onSubmit={sendMessage}><div className="form-top"><span>PROJECT SIGNAL / 01</span><b>{ar?"أرسل تفاصيل المشروع":"Tell me about the project"}</b></div><label>{ar?"الاسم":"Your name"}<input name="name" required placeholder={ar?"الاسم الكامل":"Full name"}/></label><label>{ar?"البريد الإلكتروني":"Email address"}<input name="email" required type="email" placeholder="name@company.com"/></label><label>{ar?"نوع المشروع":"Project type"}<select name="project" defaultValue=""><option value="" disabled>{ar?"اختر المسار":"Select a track"}</option><option>{ar?"منصة رقمية":"Digital platform"}</option><option>{ar?"أتمتة وذكاء اصطناعي":"Automation & AI"}</option><option>{ar?"نظام CRM":"CRM system"}</option><option>{ar?"استشارة تحول رقمي":"Transformation advisory"}</option></select></label><label>{ar?"نبذة عن التحدي":"Project brief"}<textarea name="message" required rows={4} placeholder={ar?"ما المشكلة التي تريد حلها؟":"What should the new system solve?"}/></label><button type="submit"><span>{ar?"إرسال موجز المشروع":"Send project brief"}</span><i>↗</i></button></form>
      </div>
    </section>

    <FloatingIntelligenceAssistant
      language={ar ? "ar" : "en"}
      open={intelligenceOpen}
      onOpen={() => setIntelligenceOpen(true)}
    />

    <IntelligenceModal
      open={intelligenceOpen}
      language={ar ? "ar" : "en"}
      onClose={() => setIntelligenceOpen(false)}
    />

    <button
      type="button"
      className={`floating-back-top ${showBackTop ? "is-visible" : ""}`}
      aria-label={ar ? "العودة إلى أعلى الصفحة" : "Back to page top"}
      onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20V4"/>
        <path d="M5 11l7-7 7 7"/>
      </svg>
    </button>

    <footer className="footer shell"><div className="footer-signature"><span className="footer-monogram">AA</span><h2>Ahmed Abdelkhalek</h2><strong>Digital Transformation<br/>Engineer</strong><p>Full-Stack Web Developer <i/> Automation &amp; AI Solutions Architect</p><small>{ar?"أسيوط، مصر — أبني أنظمة رقمية تربط الرؤية بالتنفيذ":"Assiut, Egypt — Engineering the connection between vision and execution"}</small></div><a
      className={`back-top ${showBackTop ? "is-visible" : ""}`}
      href="#top"
      aria-label={ar ? "العودة إلى أعلى الصفحة" : "Back to page top"}
      onClick={(event)=>{
        event.preventDefault();
        window.scrollTo({top:0,behavior:"smooth"});
      }}
    ><span>{ar?"العودة للأعلى":"Back to top"}</span><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20V4M5 11l7-7 7 7"/></svg></i></a></footer>
  </main>;
}
