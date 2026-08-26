"use client";

import styles from "./EnterpriseSystemsMethod.module.css";
import {
  enterpriseSystemsContent,
  type EnterpriseSystemsLanguage,
} from "./content";
import { useSectionMotion } from "./useSectionMotion";

type EnterpriseSystemsMethodProps = {
  language: EnterpriseSystemsLanguage;
};

function PrincipleIcon({ code }: { code: string }) {
  if (code === "01") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="21" cy="21" r="11" />
        <path d="m29 29 9 9" />
        <path d="M15 21h12M21 15v12" />
      </svg>
    );
  }

  if (code === "02") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="8" width="13" height="13" rx="3" />
        <rect x="28" y="8" width="13" height="13" rx="3" />
        <rect x="17.5" y="29" width="13" height="13" rx="3" />
        <path d="M20 14.5h8M14 21v5l10 3M34 21v5L24 29" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 36 20 24l8 8 12-18" />
      <path d="M30 14h10v10" />
      <path d="M8 41h32" />
    </svg>
  );
}

export default function EnterpriseSystemsMethod({
  language,
}: EnterpriseSystemsMethodProps) {
  const content = enterpriseSystemsContent[language];
  const isArabic = language === "ar";
  const { sectionRef, motionState } =
    useSectionMotion<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="enterprise-systems-method"
      className={styles.section}
      aria-labelledby="enterprise-systems-method-title"
      data-language={language}
      data-motion={motionState}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.orbitPrimary} />
        <span className={styles.orbitSecondary} />
        <span className={styles.scan} />
        <span className={styles.glowPrimary} />
        <span className={styles.glowSecondary} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.index}>{content.index}</p>

          <h2 className={styles.title} id="enterprise-systems-method-title">
            <span>{content.title}</span>
            <em>{content.accent}</em>
          </h2>

          <p className={styles.intro}>{content.intro}</p>
        </header>

        <div className={styles.process} aria-hidden="true">
          <span className={styles.processLine} />
          <span className={styles.processEnergy} />
          <i className={styles.processNode} data-node="01" />
          <i className={styles.processNode} data-node="02" />
          <i className={styles.processNode} data-node="03" />
        </div>

        <ol className={styles.principles}>
          {content.principles.map((principle) => (
            <li className={styles.principleItem} key={principle.code}>
              <article
                className={styles.card}
                data-step={principle.code}
              >
                <div className={styles.cardTop}>
                  <span className={styles.code}>{principle.code}</span>
                  <span className={styles.icon}>
                    <PrincipleIcon code={principle.code} />
                  </span>
                </div>

                <h3>{principle.title}</h3>
                <p>{principle.text}</p>

                <div className={styles.cardEffects} aria-hidden="true">
                  <span className={styles.cardGrid} />
                  <span className={styles.cardScan} />
                  <i className={styles.cornerStart} />
                  <i className={styles.cornerEnd} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
