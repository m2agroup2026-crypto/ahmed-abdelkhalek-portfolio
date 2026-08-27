"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./JourneyExperienceRebuilt.module.css";
import { journeyExperienceContent, type JourneyExperienceLanguage } from "./content";

export default function JourneyExperience({ language }: { language: JourneyExperienceLanguage }) {
  const content = journeyExperienceContent[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const chapter = content.chapters[active];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} id="journey" className={`${styles.section} ${visible ? styles.visible : ""}`} data-language={language} dir={language === "ar" ? "rtl" : "ltr"}>
    <div className={styles.ambient} aria-hidden="true"><i/><i/><span/></div>
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.meta}><p>{content.index}</p><span><i/>{content.eyebrow}</span></div>
        <div><h2><span>{content.title}</span><em>{content.accent}</em></h2><p className={styles.intro}>{content.intro}</p></div>
      </header>

      <div className={styles.deck}>
        <div className={styles.status}><span>{content.telemetry.label}</span><b><i/>{content.telemetry.state}</b><span>SEQ / 0{active + 1} — 04</span></div>
        <div className={styles.body}>
          <nav className={styles.rail} aria-label={content.telemetry.progress}>
            <i className={styles.track}><b style={{height:`${active / 3 * 100}%`}}/></i>
            {content.chapters.map((item, index) => <button key={item.code} type="button" className={index === active ? styles.active : ""} onClick={() => setActive(index)} aria-current={index === active ? "step" : undefined}><b>0{index + 1}</b><i/><span>{item.discipline}</span></button>)}
          </nav>

          <div className={styles.map} aria-hidden="true">
            <svg viewBox="0 0 700 430" preserveAspectRatio="none"><path d="M70 330 C170 330 160 100 280 115 C390 130 360 330 490 300 C595 276 585 88 640 76"/></svg>
            <div className={styles.orbit}><i/><i/></div>
            <div className={styles.core}><span>0{active + 1}</span><b>{chapter.code}</b><small>{chapter.discipline}</small></div>
            {content.chapters.map((item,index)=><span key={item.code} data-node={index+1} className={`${styles.node} ${index===active?styles.activeNode:""}`}><i/><b>0{index+1}</b></span>)}
          </div>

          <article key={`${language}-${chapter.code}`} className={styles.card}>
            <div className={styles.cardTop}><span>0{active+1}</span><div><small>{chapter.discipline}</small><b>{chapter.organization}</b></div></div>
            <h3>{chapter.role}</h3><p>{chapter.text}</p>
            <div className={styles.layer}><span>{chapter.layerLabel}</span><p>{chapter.layer}</p></div>
            <ul>{chapter.signals.map(signal=><li key={signal}>{signal}</li>)}</ul>
            <div className={styles.controls}><button disabled={active===0} onClick={()=>setActive(v=>Math.max(0,v-1))}>← <span>{content.controls.previous}</span></button><b>0{active+1}<i/>04</b><button disabled={active===3} onClick={()=>setActive(v=>Math.min(3,v+1))}><span>{content.controls.next}</span> →</button></div>
          </article>
        </div>
      </div>

      <footer className={styles.convergence}><div className={styles.mark}><span>04</span><i/><b>01</b></div><div><p>{content.convergence.label}</p><h3>{content.convergence.title}</h3><span>{content.convergence.text}</span></div><div className={styles.summary}>{content.experienceArchitecture.layers.map(layer=><span key={layer.code}><b>{layer.code}</b><i/>{layer.title}</span>)}</div></footer>
    </div>
  </section>;
}
