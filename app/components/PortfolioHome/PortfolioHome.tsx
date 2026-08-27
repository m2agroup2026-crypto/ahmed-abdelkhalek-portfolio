"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EnterpriseHero from "@/app/components/EnterpriseHero/EnterpriseHero";
import EnterpriseSystemsMethod from "@/app/components/EnterpriseSystemsMethod/EnterpriseSystemsMethod";
import ProfessionalIdentity from "@/app/components/ProfessionalIdentity/ProfessionalIdentity";
import JourneyExperience from "@/app/components/JourneyExperience/JourneyExperience";
import ExperienceSystemTransition from "@/app/components/ExperienceSystemTransition/ExperienceSystemTransition";
import SystemActivationBridge from "@/app/components/SystemActivationBridge/SystemActivationBridge";
import GlassCommandRoom from "@/app/components/GlassCommandRoom/GlassCommandRoom";
import OperationsCenter from "@/app/components/OperationsCenter/OperationsCenter";
import CaseStudyExperience from "@/app/components/CaseStudyExperience/CaseStudyExperience";
import SystemsExperience from "@/app/components/SystemsExperience/SystemsExperience";
import ExpertiseExperience from "@/app/components/ExpertiseExperience/ExpertiseExperience";
import ContactExperience from "@/app/components/ContactExperience/ContactExperience";
import FooterExperience from "@/app/components/FooterExperience/FooterExperience";
import FloatingIntelligenceAssistant from "@/app/components/FloatingIntelligenceAssistant/FloatingIntelligenceAssistant";
import IntelligenceModal from "@/app/components/IntelligenceExperience/IntelligenceModal";
import {
  getPortfolioHomePath,
  getPortfolioSectionFromPath,
  getPortfolioSectionPath,
} from "@/app/content/portfolio-navigation";

type Lang = "en" | "ar";
type Bi = { en: string; ar: string };

const t = (value: Bi, lang: Lang) => value[lang];

const copy = {
  nav:{journey:{en:"Journey",ar:"الرحلة"},caseStudy:{en:"Case Study",ar:"دراسة الحالة"},systems:{en:"Systems",ar:"الأنظمة"},expertise:{en:"Expertise",ar:"الخبرات"},contact:{en:"Contact",ar:"تواصل"},menu:{en:"Menu",ar:"القائمة"}},
};

export default function PortfolioHome() {
  const pathname = usePathname();
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
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
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);

  useEffect(() => {
    const saved = localStorage.getItem("ahmed-portfolio-theme");
    const nextDark = saved
      ? saved === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.dataset.theme =
      nextDark ? "dark" : "light";

    const frame = window.requestAnimationFrame(() => {
      setDark(nextDark);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const switchLanguage=()=>{
    if(transition)return;
    const next:Lang=ar?"en":"ar";
    const section=getPortfolioSectionFromPath(pathname);
    const destination=section
      ? getPortfolioSectionPath(section,next)
      : getPortfolioHomePath(next);
    setTransition(ar?"to-en":"to-ar");
    setTimeout(()=>window.location.assign(destination),340);
    setTimeout(()=>setTransition(null),850);
  };
  const tickerItems = ar
    ? ["هندسة التحول الرقمي","تطوير منصات Full-Stack","أتمتة العمليات المؤسسية","حلول الذكاء الاصطناعي","هندسة CRM","تكامل الأنظمة وواجهات API","تصميم تجارب رقمية متجاوبة","تحليل وتطوير مسارات العمل","منصات بيانات مترابطة","حلول رقمية قابلة للتوسع"]
    : ["Digital Transformation Engineering","Full-Stack Platform Development","Enterprise Process Automation","AI-Powered Solutions","CRM Architecture","Systems & API Integration","Responsive Digital Experiences","Workflow Design & Optimization","Connected Data Platforms","Scalable Digital Operations"];
  return <main className={ar?"arabic-ui":"english-ui"}>

    <nav className={`nav shell ${scrolled ? "nav-scrolled" : ""} nav-cinematic-visible`} aria-label={ar?"التنقل الرئيسي":"Primary navigation"}>
      <a className="brand" href="#top"><span>AA</span><b>{ar?"أحمد عبد الخالق":"Ahmed Abdelkhalek"}</b></a>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="primary-nav-links" onClick={()=>setMenuOpen(!menuOpen)}>{t(copy.nav.menu,lang)}</button>
      <div id="primary-nav-links" className={`nav-links ${menuOpen?"open":""}`}><a href="#journey">{t(copy.nav.journey,lang)}</a><a href="#case-study">{t(copy.nav.caseStudy,lang)}</a><a href="#systems">{t(copy.nav.systems,lang)}</a><a href="#expertise">{t(copy.nav.expertise,lang)}</a><a href="#contact">{t(copy.nav.contact,lang)}</a>
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
      <button className="theme-toggle" onClick={()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?"dark":"light";localStorage.setItem("ahmed-portfolio-theme",next?"dark":"light")}} aria-label={ar?(dark?"تفعيل الوضع الفاتح":"تفعيل الوضع الداكن"):(dark?"Light mode":"Dark mode")}><span className="theme-halo"/><span>{dark?"☾":"☼"}</span></button>
      <button className={`language-rail ${ar?"is-ar":"is-en"}`} aria-label={ar?"التبديل إلى الإنجليزية":"Switch to Arabic"} onClick={switchLanguage}><span className="language-glow"/><span className="language-option">EN</span><span className="language-option">ع</span><span className="language-thumb">{ar?"ع":"EN"}</span></button>
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

    <ProfessionalIdentity
      language={ar ? "ar" : "en"}
    />

    <JourneyExperience
      language={ar ? "ar" : "en"}
    />

    <ExperienceSystemTransition
      language={ar ? "ar" : "en"}
    />

    <SystemActivationBridge
      language={ar ? "ar" : "en"}
    />

    <GlassCommandRoom
      language={ar ? "ar" : "en"}
    />

    <OperationsCenter
      language={ar ? "ar" : "en"}
    />

    <CaseStudyExperience
      language={ar ? "ar" : "en"}
    />
    <SystemsExperience language={ar ? "ar" : "en"} />

    <ExpertiseExperience language={ar ? "ar" : "en"} />

    <ContactExperience language={ar ? "ar" : "en"} />

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

    <FooterExperience language={ar ? "ar" : "en"} />
  </main>;
}
