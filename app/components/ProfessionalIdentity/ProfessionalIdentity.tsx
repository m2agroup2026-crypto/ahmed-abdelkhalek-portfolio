"use client";

import styles from "./ProfessionalIdentity.module.css";
import {
  professionalIdentityContent,
  type ProfessionalIdentityLanguage,
} from "./content";
import { useProfessionalIdentityMotion } from "./useProfessionalIdentityMotion";
import MobileProfessionalIdentity from "./MobileProfessionalIdentity";

type ProfessionalIdentityProps = {
  language: ProfessionalIdentityLanguage;
};

function DimensionIcon({ dimension }: { dimension: string }) {
  if (dimension === "operations") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="5" width="8" height="8" rx="2" />
        <rect x="19" y="19" width="8" height="8" rx="2" />
        <path d="M13 9h5a5 5 0 0 1 5 5v5" />
        <path d="m19 15 4 4 4-4" />
      </svg>
    );
  }

  if (dimension === "communication") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 7h20v14H14l-6 5v-5H6V7Z" />
        <path d="M11 12h10M11 16h7" />
      </svg>
    );
  }

  if (dimension === "governance") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4 26 8v7c0 6-4 10-10 13C10 25 6 21 6 15V8l10-4Z" />
        <path d="m11 16 3 3 7-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="5" />
      <path d="M16 3v5M16 24v5M3 16h5M24 16h5M6.8 6.8l3.6 3.6M21.6 21.6l3.6 3.6M25.2 6.8l-3.6 3.6M10.4 21.6l-3.6 3.6" />
    </svg>
  );
}

export default function ProfessionalIdentity({
  language,
}: ProfessionalIdentityProps) {
  const content = professionalIdentityContent[language];
  const isArabic = language === "ar";
  const { sectionRef, motionState } =
    useProfessionalIdentityMotion<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="professional-identity"
      className={styles.section}
      aria-labelledby="professional-identity-title"
      data-language={language}
      data-motion={motionState}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.auroraPrimary} />
        <span className={styles.auroraSecondary} />
        <span className={styles.scanBeam} />
        <span className={styles.horizon} />
        <span className={styles.particleField} />
      </div>

      <div className={styles.inner}>
        <div className={styles.desktopExperience}>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <p className={styles.index}>{content.index}</p>
            <span className={styles.eyebrow}>
              <i aria-hidden="true" />
              {content.eyebrow}
            </span>
          </div>

          <div className={styles.headingGroup}>
            <h2 className={styles.title} id="professional-identity-title">
              <span>{content.title}</span>
              <em>{content.accent}</em>
            </h2>

            <p className={styles.intro}>{content.intro}</p>
          </div>
        </header>

        <div className={styles.blueprintShell}>
          <div className={styles.telemetryBar} aria-hidden="true">
            <span>SYS.ID / 01</span>
            <span>{content.status}</span>
            <span>ARCHITECTURE / CONNECTED</span>
          </div>

          <div className={styles.blueprintStage}>
            <svg
              className={styles.network}
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.networkPath} data-path="operations" d="M500 310 C385 310 330 175 190 155" />
              <path className={styles.networkPath} data-path="communication" d="M500 310 C615 310 675 175 810 155" />
              <path className={styles.networkPath} data-path="governance" d="M500 310 C385 310 330 445 190 465" />
              <path className={styles.networkPath} data-path="technology" d="M500 310 C615 310 675 445 810 465" />
              <circle className={styles.signalDot} data-signal="one" cx="500" cy="310" r="5" />
              <circle className={styles.signalDot} data-signal="two" cx="500" cy="310" r="4" />
              <circle className={styles.signalDot} data-signal="three" cx="500" cy="310" r="4" />
              <circle className={styles.signalDot} data-signal="four" cx="500" cy="310" r="5" />
            </svg>

            <div className={styles.core}>
              <span className={styles.coreOrbit} aria-hidden="true" />
              <span className={styles.coreOrbitSecondary} aria-hidden="true" />
              <span className={styles.coreScan} aria-hidden="true" />

              <div className={styles.coreMark} aria-hidden="true">
                <span>AA</span>
              </div>

              <p>{content.core.label}</p>
              <h3>{content.core.title}</h3>
              <span className={styles.coreRule} aria-hidden="true" />
              <small>{content.core.text}</small>
            </div>

            <ol className={styles.dimensions}>
              {content.dimensions.map((dimension) => (
                <li
                  className={styles.dimension}
                  data-dimension={dimension.key}
                  key={dimension.key}
                >
                  <article>
                    <div className={styles.dimensionTop}>
                      <span className={styles.dimensionCode}>{dimension.code}</span>
                      <span className={styles.dimensionIcon}>
                        <DimensionIcon dimension={dimension.key} />
                      </span>
                    </div>

                    <h3>{dimension.title}</h3>
                    <p>{dimension.text}</p>

                    <div className={styles.dimensionTelemetry} aria-hidden="true">
                      <span />
                      <i />
                      <i />
                      <i />
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <aside className={styles.outcome} aria-label={content.outcomeLabel}>
            <span>{content.outcomeLabel}</span>
            <p>{content.outcome}</p>
            <i aria-hidden="true">→</i>
          </aside>
        </div>
        </div>

        <MobileProfessionalIdentity language={language} />
      </div>
    </section>
  );
}
