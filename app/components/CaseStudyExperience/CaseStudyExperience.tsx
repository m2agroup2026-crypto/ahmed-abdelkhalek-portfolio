"use client";
import {useEffect,useRef,useState} from "react";
import styles from "./CaseStudyExperience.module.css";
import {caseStudyExperienceContent,type CaseStudyLanguage,type CaseStudyLayer} from "./content";

const icons:Record<CaseStudyLayer["key"],React.ReactNode>={
 identity:<><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
 platform:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 14h5"/></>,
 leads:<><circle cx="9" cy="8" r="4"/><path d="M3 21c.6-4 2.6-6 6-6 2 0 3.7.8 4.8 2.3M18 5v12M15 14l3 3 3-3"/></>,
 messaging:<><path d="M3 5h18v13H10l-5 4v-4H3V5Z"/><path d="M7 10h10M7 14h7"/></>,
 automation:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a4 4 0 0 1 4 4V14M14 17.5h-4a4 4 0 0 1-4-4V10"/></>,
 data:<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>
};

export default function CaseStudyExperience({language}:{language:CaseStudyLanguage}){
 const content=caseStudyExperienceContent[language],ar=language==="ar";
 const [active,setActive]=useState(0),[visible,setVisible]=useState(false);
 const sectionRef=useRef<HTMLElement>(null),detailRef=useRef<HTMLElement>(null),layer=content.layers[active];
 useEffect(()=>{const node=sectionRef.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry?.isIntersecting){setVisible(true);observer.disconnect()}},{threshold:.08});observer.observe(node);return()=>observer.disconnect()},[]);
 const selectLayer=(index:number)=>{setActive(index);if(matchMedia("(max-width:720px)").matches)requestAnimationFrame(()=>detailRef.current?.scrollIntoView({behavior:"smooth",block:"nearest"}))};
 return <section ref={sectionRef} id="case-study" className={styles.section} data-visible={visible} data-language={language} dir={ar?"rtl":"ltr"} aria-labelledby="case-study-title">
  <div className={styles.ambient} aria-hidden="true"><i/><i/><span/></div><div className={styles.shell}>
   <header className={styles.header}>
    <div className={styles.meta}><span>{content.index}</span><small><i/>{content.eyebrow}</small></div>
    <div className={styles.heading}><h2 id="case-study-title">{content.title}<em>{content.accent}</em></h2><p>{content.intro}</p></div>
    <a href="https://m2agroupeg.com" target="_blank" rel="noreferrer"><span><i/>{content.live}</span><b>{content.visit}</b><em>↗</em></a>
   </header>
   <div className={styles.story}>
    <article><span>01 / {content.challengeLabel}</span><h3>{content.challengeTitle}</h3><p>{content.challengeText}</p><div>{content.fragments.map((item,index)=><small key={item}><i>0{index+1}</i>{item}</small>)}</div></article>
    <div className={styles.storyFlow} aria-hidden="true"><span>01</span><i/><b>M2A</b><i/><span>06</span></div>
    <article><span>02 / {content.outcomeLabel}</span><h3>{content.outcomeTitle}</h3><p>{content.outcomeText}</p><div className={styles.phases}>{content.phases.map((phase,index)=><small key={phase}><i>0{index+1}</i>{phase}</small>)}</div></article>
   </div>
   <section className={styles.architecture} aria-labelledby="case-architecture-title">
    <div className={styles.architectureBar}><span><i/><i/><i/>M2A / SYSTEM BLUEPRINT</span><b id="case-architecture-title">{content.topologyLabel}</b><small>06 / CONNECTED LAYERS</small></div>
    <div className={styles.architectureGrid}>
     <nav aria-label={content.layersLabel}>{content.layers.map((item,index)=><button type="button" key={item.code} data-active={active===index} onClick={()=>selectLayer(index)} aria-pressed={active===index}><span>{item.code}</span><i><svg viewBox="0 0 24 24">{icons[item.key]}</svg></i><div><small>{item.short}</small><b>{item.title}</b></div><em>↗</em></button>)}</nav>
     <article ref={detailRef} key={`${language}-${layer.code}`} className={styles.detail}>
      <div className={styles.detailHead}><span>{content.layersLabel} / {layer.code}</span><small><i/>ACTIVE</small></div>
      <div className={styles.detailBody}><div><small>{layer.short}</small><h3>{layer.title}</h3><p>{layer.description}</p></div><div className={styles.core} aria-hidden="true"><i/><i/><span>M2A</span><b>{layer.code}</b></div></div>
      <div className={styles.flow} dir="ltr"><span>TOUCHPOINTS</span><i/><span>M2A API</span><i/><span>SUPABASE</span><i/><span>{layer.short}</span></div>
     </article>
    </div>
   </section>
   <footer className={styles.footer}><div><span>{content.outcomeLabel}</span><h3>{content.outcomeTitle}</h3></div><p>{content.outcomeText}</p><a href="https://m2agroupeg.com" target="_blank" rel="noreferrer">{content.visit}<i>↗</i></a></footer>
  </div>
 </section>
}
