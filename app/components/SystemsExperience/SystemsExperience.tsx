"use client";

import { useState } from "react";
import styles from "./SystemsExperience.module.css";
import {
  systemText,
  systemsCopy,
  systemsDomains,
  type SystemsLanguage,
} from "./content";
import { useSystemsExperienceMotion } from "./useSystemsExperienceMotion";

type Props = { language: SystemsLanguage };

export default function SystemsExperience({ language }: Props) {
  const rootRef = useSystemsExperienceMotion();
  const [active, setActive] = useState(systemsDomains[0].id);
  const ar = language === "ar";

  return (
    <section
      ref={rootRef}
      id="systems"
      className={styles.section}
      dir={ar ? "rtl" : "ltr"}
      aria-labelledby="systems-title"
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{systemText(systemsCopy.eyebrow, language)}</p>
            <h2 id="systems-title">
              {systemText(systemsCopy.title, language)}
              <em>{systemText(systemsCopy.accent, language)}</em>
            </h2>
          </div>
          <div className={styles.intro}>
            <span className={styles.live}><i />{systemText(systemsCopy.live, language)}</span>
            <p>{systemText(systemsCopy.intro, language)}</p>
          </div>
        </header>

        <div className={styles.console}>
          <div className={styles.consoleBar}>
            <span><i /><i /><i /></span>
            <b>AA / ENTERPRISE OPERATING MODEL</b>
            <small>SYS.04 — {systemText(systemsCopy.status, language)}</small>
          </div>

          <div className={styles.architecture}>
            <svg className={styles.connections} viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 325 C500 200 500 160 500 92" />
              <path d="M500 325 C370 300 255 235 160 175" />
              <path d="M500 325 C630 300 745 235 840 175" />
              <path d="M500 325 C370 375 260 470 165 535" />
              <path d="M500 325 C630 375 740 470 835 535" />
              <circle cx="500" cy="92" r="5" /><circle cx="160" cy="175" r="5" />
              <circle cx="840" cy="175" r="5" /><circle cx="165" cy="535" r="5" />
              <circle cx="835" cy="535" r="5" />
            </svg>

            <div className={styles.core}>
              <span>{systemText(systemsCopy.coreLabel, language)}</span>
              <div className={styles.coreOrb}><i /><i /><strong>AA</strong></div>
              <h3>{systemText(systemsCopy.coreTitle, language)}</h3>
              <p>{systemText(systemsCopy.coreText, language)}</p>
              <small><i />{systemText(systemsCopy.sync, language)} / 100%</small>
            </div>

            {systemsDomains.map((domain, index) => (
              <button
                type="button"
                key={domain.id}
                className={`${styles.domain} ${styles[domain.id]} ${styles[domain.tone]} ${active === domain.id ? styles.active : ""}`}
                onPointerEnter={() => setActive(domain.id)}
                onFocus={() => setActive(domain.id)}
                onClick={() => setActive(domain.id)}
                aria-pressed={active === domain.id}
                style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className={styles.domainTop}><i>{domain.index}</i><b>{systemText(domain.label, language)}</b><strong>{domain.metric}</strong></span>
                <span className={styles.domainBody}>
                  <b>{systemText(domain.title, language)}</b>
                  <small>{systemText(domain.description, language)}</small>
                </span>
                <span className={styles.domainStatus}><i />{systemText(domain.signal, language)}</span>
              </button>
            ))}
          </div>

          <div className={styles.telemetry}>
            <div className={styles.telemetryHeading}>
              <span>{systemText(systemsCopy.telemetry, language)}</span>
              <b>00:04:18:27</b>
            </div>
            {[72, 88, 64, 96, 82, 91, 70, 86, 98, 78, 92, 84].map((value, index) => (
              <i key={index} style={{ "--value": `${value}%`, "--bar-delay": `${index * 70}ms` } as React.CSSProperties} />
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <div>
            <span>CONTROL MODEL / 05</span>
            <h3>{systemText(systemsCopy.governance, language)}</h3>
            <p>{systemText(systemsCopy.governanceText, language)}</p>
          </div>
          <ul>
            {systemsCopy.principles[language].map((principle, index) => (
              <li key={principle}><span>0{index + 1}</span>{principle}<i>✓</i></li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
