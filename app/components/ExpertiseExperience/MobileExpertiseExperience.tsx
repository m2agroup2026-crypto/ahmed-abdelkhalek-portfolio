"use client";

import { useState } from "react";
import styles from "./MobileExpertiseExperience.module.css";
import { capabilities, expertiseContent, expertiseText, type ExpertiseLanguage } from "./content";

export default function MobileExpertiseExperience({ language }: { language: ExpertiseLanguage }) {
  const [active, setActive] = useState(0);
  const item = capabilities[active];

  return (
    <div className={styles.experience} data-mobile-expertise>
      <header className={styles.header}>
        <p>{expertiseText(expertiseContent.eyebrow, language)}</p><span>{expertiseText(expertiseContent.kicker, language)}</span>
        <h2>{expertiseText(expertiseContent.title, language)}<em>{expertiseText(expertiseContent.accent, language)}</em></h2>
        <div>{expertiseText(expertiseContent.intro, language)}</div>
      </header>
      <nav className={styles.tabs} aria-label={expertiseText(expertiseContent.matrix, language)}>
        {capabilities.map((capability,index)=><button key={capability.key} type="button" data-active={active===index} data-tone={capability.tone} onClick={()=>setActive(index)}><span>{capability.code}</span><b>{expertiseText(capability.label,language)}</b></button>)}
      </nav>
      <article className={styles.card} data-tone={item.tone} key={item.key}>
        <div className={styles.top}><span>{expertiseText(expertiseContent.active,language)}</span><strong>{item.signal}</strong></div>
        <small>{expertiseText(item.label,language)}</small><h3>{expertiseText(item.title,language)}</h3><p>{expertiseText(item.description,language)}</p>
        <div className={styles.outcome}><span>{expertiseText(expertiseContent.outcome,language)}</span><p>{expertiseText(item.outcome,language)}</p></div>
        <div className={styles.stack}>{item.stack.map(value=><span key={value}>{value}</span>)}</div>
      </article>
      <footer>{expertiseText(expertiseContent.footer,language)}</footer>
    </div>
  );
}
