"use client";

import { useState } from "react";
import styles from "./ExpertiseExperience.module.css";
import { capabilities, expertiseContent, expertiseText, type ExpertiseLanguage } from "./content";
import { useExpertiseMotion } from "./useExpertiseMotion";
import MobileExpertiseExperience from "./MobileExpertiseExperience";

export default function ExpertiseExperience({ language }: { language: ExpertiseLanguage }) {
  const sectionRef = useExpertiseMotion();
  const [active, setActive] = useState(0);
  const capability = capabilities[active];

  return (
    <section ref={sectionRef} id="expertise" className={styles.section} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="expertise-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.desktopExperience}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <p>{expertiseText(expertiseContent.eyebrow, language)}</p>
            <span>{expertiseText(expertiseContent.kicker, language)}</span>
            <h2 id="expertise-title">{expertiseText(expertiseContent.title, language)}<em>{expertiseText(expertiseContent.accent, language)}</em></h2>
          </div>
          <p className={styles.intro}>{expertiseText(expertiseContent.intro, language)}</p>
        </header>

        <div className={styles.matrix}>
          <div className={styles.matrixBar}><span><i />{expertiseText(expertiseContent.matrix, language)}</span><b>AA / CAP.05</b><small>04 MODULES ONLINE</small></div>
          <div className={styles.workspace}>
            <nav className={styles.rail} aria-label={expertiseText(expertiseContent.matrix, language)}>
              {capabilities.map((item, index) => (
                <button key={item.key} type="button" data-active={active === index} data-tone={item.tone} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                  <span>{item.code}</span><div><small>{expertiseText(item.label, language)}</small><b>{expertiseText(item.title, language)}</b></div><i aria-hidden="true" />
                </button>
              ))}
            </nav>

            <article className={styles.detail} key={capability.key} data-tone={capability.tone}>
              <div className={styles.detailTop}><span>{expertiseText(expertiseContent.active, language)} / {capability.code}</span><strong>{capability.signal}</strong></div>
              <div className={styles.orbit} aria-hidden="true"><i /><i /><i /><strong>{capability.code}</strong></div>
              <div className={styles.copy}>
                <small>{expertiseText(capability.label, language)}</small>
                <h3>{expertiseText(capability.title, language)}</h3>
                <p>{expertiseText(capability.description, language)}</p>
              </div>
              <div className={styles.outcome}><span>{expertiseText(expertiseContent.outcome, language)}</span><p>{expertiseText(capability.outcome, language)}</p></div>
              <div className={styles.stack}>{capability.stack.map(item => <span key={item}>{item}<i /></span>)}</div>
            </article>

            <aside className={styles.telemetry}>
              <span>{expertiseText(expertiseContent.signal, language)}</span>
              {[88,72,96,64,84,76,92,68].map((value, index) => <i key={index} style={{"--height":`${value}%`,"--delay":`${index * 90}ms`} as React.CSSProperties} />)}
              <b>SYS / READY</b>
            </aside>
          </div>
        </div>

        <footer className={styles.footer}><span>01</span><i /><strong>{expertiseText(expertiseContent.footer, language)}</strong><i /><span>04</span></footer>
        </div>

        <MobileExpertiseExperience language={language} />
      </div>
    </section>
  );
}
