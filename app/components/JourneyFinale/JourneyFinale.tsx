"use client";
import {useEffect,useRef,useState,type CSSProperties} from "react";
import styles from "./JourneyFinale.module.css";
import {journeyFinaleContent} from "./content";

export default function JourneyFinale({language}:{language:"ar"|"en"}){
  const c=journeyFinaleContent[language], ar=language==="ar";
  const [active,setActive]=useState(0), [activeModule,setActiveModule]=useState(0), [visible,setVisible]=useState(false);
  const root=useRef<HTMLElement>(null), detail=useRef<HTMLDivElement>(null), gate=c.gates[active], unit=c.deck.modules[activeModule];
  useEffect(()=>{const node=root.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry?.isIntersecting){setVisible(true);observer.disconnect()}},{threshold:.1});observer.observe(node);return()=>observer.disconnect()},[]);
  const activate=(index:number)=>{setActive(index);if(matchMedia("(max-width: 760px)").matches)requestAnimationFrame(()=>detail.current?.scrollIntoView({behavior:"smooth",block:"center"}))};
  return <section id="journey-finale" ref={root} className={styles.section} data-visible={visible} data-language={language} dir={ar?"rtl":"ltr"} aria-labelledby="journey-finale-title">
    <div className={styles.ambient} aria-hidden="true"><i/><i/><span/></div><div className={styles.shell}>
      <header className={styles.header}><div><span>{c.eyebrow}</span><small><i/>{c.live}</small></div><div><h2 id="journey-finale-title">{c.title}<em>{c.accent}</em></h2><p>{c.intro}</p></div></header>
      <div className={styles.stage}>
        <div className={styles.stageBar}><span><i/><i/><i/>AA / CONVERGENCE ENGINE</span><b><i/>{c.live}</b><small>SEQ / 01 — 05</small></div>
        <div className={styles.map}>
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">{["M500 280 C390 220 280 120 150 95","M500 280 C390 280 270 280 120 280","M500 280 C390 350 290 450 170 480","M500 280 C610 220 720 120 850 95","M500 280 C610 330 730 410 850 470"].map((path,index)=><g key={path}><path d={path}/><circle r="4"><animateMotion dur={`${2.5+index*.25}s`} repeatCount="indefinite" path={path}/></circle></g>)}</svg>
          <div className={styles.core}><i/><span>AA</span><strong>{c.core}</strong><small>{c.coreState}</small></div>
          {c.gates.map((item,index)=><button type="button" key={item.code} data-gate={index+1} data-active={active===index} onClick={()=>activate(index)} aria-pressed={active===index}><i/><span>{item.code}</span><div><small>{item.label}</small><b>{item.title}</b></div><em>↗</em></button>)}
        </div>
        <div ref={detail} key={`${language}-${gate.code}`} className={styles.detail}>
          <div className={styles.detailIntro}><span>{c.detailLabel} / {gate.code}</span><h3>{gate.title}</h3><p>{gate.text}</p></div>
          <div className={styles.capabilities}><span>{c.capabilities}</span>{gate.items.map((item,index)=><p key={item}><i>0{index+1}</i>{item}<b>✓</b></p>)}</div>
          <div className={styles.outcome}><span>{c.outcome}</span><strong>{gate.metric}</strong><small>{gate.metricLabel}</small><div>{[48,72,59,88,67,94,76,84,63,91].map((h,i)=><i key={i} style={{height:`${h}%`,"--delay":`${i*80}ms`} as CSSProperties}/>)}</div></div>
        </div>
        <section className={styles.commandDeck} aria-labelledby="m2a-command-title">
          <header><div><span>{c.deck.eyebrow}</span><h3 id="m2a-command-title">{c.deck.title}</h3><p>{c.deck.intro}</p></div><div className={styles.voiceCore}><i/><small>{c.deck.assistant}</small><strong>{c.deck.assistantState}</strong><div>{[1,2,3,4,5,6,7].map(n=><i key={n}/>)}</div></div></header>
          <div className={styles.commandGrid}>
            <nav aria-label={ar?"وحدات نظام M2A":"M2A system modules"}>{c.deck.modules.map((item,index)=><button type="button" key={item.code} data-active={activeModule===index} onClick={()=>setActiveModule(index)} aria-pressed={activeModule===index}><span>{item.code}</span><div><b>{item.name}</b><small>{item.state}</small></div><i>↗</i></button>)}</nav>
            <article key={`${language}-${unit.code}`} className={styles.moduleView}>
              <div className={styles.moduleTop}><span dir="ltr"><i/>{unit.signal} / LIVE CONTEXT</span><small dir="ltr">MODULE {String(activeModule+1).padStart(2,"0")} / {String(c.deck.modules.length).padStart(2,"0")}</small></div>
              <div className={styles.moduleHero}><div><small>{unit.state}</small><h4>{unit.name}</h4><p>{unit.description}</p></div><div className={styles.moduleOrb}><i/><i/><strong>{unit.code}</strong><span>{unit.signal}</span></div></div>
              <div className={styles.featureRail}>{unit.features.map((feature,index)=><div key={feature}><span>0{index+1}</span><b>{feature}</b><i>ONLINE</i></div>)}</div>
              <div className={styles.dataFlow} dir="ltr"><span>SUPABASE CORE</span><i/><span>M2A API LAYER</span><i/><span>COMMAND BUS</span><i/><span>{unit.code}</span></div>
            </article>
          </div>
          <footer className={styles.trustRail}><span><i/>{c.deck.security}</span><b>{c.deck.audit}</b><span>RLS · HTTPS · AUDIT LOG<i/></span></footer>
        </section>
        <footer className={styles.final}><span>{c.footer}</span><h3>{c.finale}</h3><a href="#systems">{c.next}<i>↗</i></a></footer>
      </div>
    </div>
  </section>
}
