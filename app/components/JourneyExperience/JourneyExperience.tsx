"use client";

import styles from "./JourneyExperience.module.css";
import directorStyles from "./JourneyExperienceDirector.module.css";
import controlStyles from "./JourneyExperienceControls.module.css";
import {
  journeyExperienceContent,
  type JourneyExperienceLanguage,
} from "./content";
import { useJourneyExperienceMotion } from "./useJourneyExperienceMotion";

type JourneyExperienceProps = {
  language: JourneyExperienceLanguage;
};

function ChapterIcon({ chapter }: { chapter: string }) {
  if (chapter === "communication") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 7h22v15H15l-7 5v-5H5V7Z" />
        <path d="M10 12h12M10 16h8" />
      </svg>
    );
  }

  if (chapter === "leadership") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="9" r="4" />
        <circle cx="7.5" cy="13" r="3" />
        <circle cx="24.5" cy="13" r="3" />
        <path d="M9 27v-3.5c0-4 2.6-6.5 7-6.5s7 2.5 7 6.5V27" />
        <path d="M3 26v-2.5c0-3 1.8-5 5-5M29 26v-2.5c0-3-1.8-5-5-5" />
      </svg>
    );
  }

  if (chapter === "operations") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="5" width="8" height="8" rx="2" />
        <rect x="19" y="5" width="8" height="8" rx="2" />
        <rect x="12" y="19" width="8" height="8" rx="2" />
        <path d="M13 9h6M9 13v4l7 2M23 13v4l-7 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 24 14 17l5 5 7-11" />
      <path d="M20 11h6v6" />
      <path d="M5 27h22" />
      <circle cx="8" cy="10" r="3" />
      <path d="M11 10h5" />
    </svg>
  );
}

export default function JourneyExperience({ language }: JourneyExperienceProps) {
  const content = journeyExperienceContent[language];
  const isArabic = language === "ar";
  const {
    sectionRef,
    motionState,
    activeChapter,
    jumpToChapter,
  } = useJourneyExperienceMotion<HTMLElement>();
  const currentChapter = content.chapters[activeChapter];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className={`${styles.section} ${directorStyles.director}`}
      aria-labelledby="journey-experience-title"
      data-language={language}
      data-motion={motionState}
      data-active={activeChapter + 1}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.starField} />
        <span className={styles.auroraOne} />
        <span className={styles.auroraTwo} />
        <span className={styles.scanLine} />
        <span className={styles.depthRingOne} />
        <span className={styles.depthRingTwo} />
      </div>

      <div className={styles.stickyViewport} data-journey-element="sticky-viewport">
        <div className={styles.inner} data-journey-element="inner">
          <header className={styles.header} data-journey-element="header">
            <div className={styles.headerMeta}>
              <p className={styles.index}>{content.index}</p>
              <span className={styles.eyebrow}>
                <i aria-hidden="true" />
                {content.eyebrow}
              </span>
              <div className={styles.layerSequence} aria-hidden="true">
                <span><i />01<b>{isArabic ? "اتصال" : "COMMS"}</b></span>
                <span><i />02<b>{isArabic ? "قيادة" : "LEAD"}</b></span>
                <span><i />03<b>{isArabic ? "تشغيل" : "OPS"}</b></span>
                <span><i />04<b>{isArabic ? "أنظمة" : "SYSTEMS"}</b></span>
              </div>
              <p className={styles.sequenceResult}>
                <span>{isArabic ? "النتيجة" : "CONVERGENCE"}</span>
                <b>{isArabic ? "منظور مؤسسي متكامل" : "ONE ENTERPRISE PERSPECTIVE"}</b>
              </p>
            </div>

            <div className={styles.headingGroup}>
              <h2
                className={styles.title}
                id="journey-experience-title"
                data-journey-element="title"
              >
                <span>{content.title}</span>
                <em>{content.accent}</em>
              </h2>
              <p className={styles.intro} data-journey-element="intro">
                {content.intro}
              </p>
            </div>
          </header>

          <div className={styles.missionShell} data-journey-element="mission-shell">
            <div className={styles.telemetryBar} data-journey-element="telemetry-bar" aria-hidden="true">
              <span>{content.telemetry.label}</span>
              <span className={styles.telemetryState} data-journey-element="telemetry-state">
                <i />
                {content.telemetry.state}
              </span>
              <span>SEQ / 0{activeChapter + 1} — 04</span>
            </div>

            <div className={styles.missionBody} data-journey-element="mission-body">
              <nav className={styles.chapterRail} aria-label={content.telemetry.progress}>
                <span className={styles.railLine} aria-hidden="true">
                  <i />
                </span>

                {content.chapters.map((chapter, index) => (
                  <button
                    key={chapter.code}
                    type="button"
                    className={styles.railNode}
                    data-journey-element="rail-node"
                    data-active={index === activeChapter ? "true" : "false"}
                    aria-current={index === activeChapter ? "step" : undefined}
                    aria-label={`${content.controls.jump} ${chapter.code}: ${chapter.discipline}`}
                    onClick={() => jumpToChapter(index)}
                  >
                    <span>{chapter.code}</span>
                    <i aria-hidden="true" />
                    <small>{chapter.discipline}</small>
                  </button>
                ))}
              </nav>

              <div
                className={styles.visualStage}
                data-journey-element="visual-stage"
                aria-hidden="true"
              >
                <div data-journey-element="camera-layer">
                  <svg
                    className={styles.trajectory}
                    viewBox="0 0 1000 600"
                    preserveAspectRatio="none"
                  >
                    <path
                      className={styles.trajectoryGhost}
                      d="M90 455 C220 455 215 155 365 170 C520 185 470 455 640 425 C790 398 785 125 915 135"
                    />
                    <path
                      className={styles.trajectoryGlow}
                      pathLength="1"
                      d="M90 455 C220 455 215 155 365 170 C520 185 470 455 640 425 C790 398 785 125 915 135"
                    />
                    <path
                      className={styles.trajectoryEnergy}
                      pathLength="1"
                      data-journey-path
                      data-journey-element="trajectory-energy"
                      d="M90 455 C220 455 215 155 365 170 C520 185 470 455 640 425 C790 398 785 125 915 135"
                    />

                    <g className={styles.mapNode} data-node="1" data-journey-map-node="1">
                      <circle cx="90" cy="455" r="22" />
                      <circle cx="90" cy="455" r="6" />
                    </g>
                    <g className={styles.mapNode} data-node="2" data-journey-map-node="2">
                      <circle cx="365" cy="170" r="22" />
                      <circle cx="365" cy="170" r="6" />
                    </g>
                    <g className={styles.mapNode} data-node="3" data-journey-map-node="3">
                      <circle cx="640" cy="425" r="22" />
                      <circle cx="640" cy="425" r="6" />
                    </g>
                    <g className={styles.mapNode} data-node="4" data-journey-map-node="4">
                      <circle cx="915" cy="135" r="22" />
                      <circle cx="915" cy="135" r="6" />
                    </g>
                  </svg>

                  <span data-journey-element="phase-beam" />
                  <span data-journey-element="path-tracer">
                    <i />
                    <b />
                  </span>

                  <span className={styles.radar} data-radar="one" />
                  <span className={styles.radar} data-radar="two" />
                  <span className={styles.vectorLabel} data-label="one">COMMS / 01</span>
                  <span className={styles.vectorLabel} data-label="two">LEAD / 02</span>
                  <span className={styles.vectorLabel} data-label="three">OPS / 03</span>
                  <span className={styles.vectorLabel} data-label="four">SYS / 04</span>
                </div>

                <span
                  key={currentChapter.code}
                  data-journey-element="active-map-label"
                >
                  <b>{currentChapter.code}</b>
                  <i />
                  <span>{currentChapter.discipline}</span>
                </span>
              </div>

              <div
                className={`${styles.chapterViewport} ${controlStyles.viewportDock}`}
                data-journey-element="chapter-viewport"
              >
                <div
                  className={styles.chapterCounter}
                  data-journey-element="chapter-counter"
                  aria-hidden="true"
                >
                  <span>0{activeChapter + 1}</span>
                  <i />
                  <small>04</small>
                </div>

                <div className={styles.chapterStack}>
                  {content.chapters.map((chapter, index) => (
                    <article
                      className={styles.chapterCard}
                      data-journey-element="chapter-card"
                      data-active={index === activeChapter ? "true" : "false"}
                      data-chapter={chapter.key}
                      aria-hidden={index === activeChapter ? undefined : true}
                      key={chapter.code}
                    >
                      <div className={styles.chapterTop}>
                        <span className={styles.chapterIcon}>
                          <ChapterIcon chapter={chapter.key} />
                        </span>
                        <div>
                          <span className={styles.chapterDiscipline}>{chapter.discipline}</span>
                          <small>{chapter.organization}</small>
                        </div>
                      </div>

                      <h3>{chapter.role}</h3>
                      <p className={`${styles.chapterText} ${controlStyles.chapterCopy}`}>
                        {chapter.text}
                      </p>

                      <div className={styles.layerPanel}>
                        <span>{chapter.layerLabel}</span>
                        <p>{chapter.layer}</p>
                      </div>

                      <ul className={styles.signalList} aria-label={chapter.discipline}>
                        {chapter.signals.map((signal) => (
                          <li key={signal}>{signal}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                <div className={`${styles.controls} ${controlStyles.controlsDock}`}>
                  <button
                    type="button"
                    aria-label={content.controls.previous}
                    disabled={activeChapter === 0}
                    onClick={() => jumpToChapter(activeChapter - 1)}
                  >
                    <span aria-hidden="true">←</span>
                    <small>{content.controls.previous}</small>
                  </button>

                  <button
                    type="button"
                    aria-label={content.controls.next}
                    disabled={activeChapter === content.chapters.length - 1}
                    onClick={() => jumpToChapter(activeChapter + 1)}
                  >
                    <small>{content.controls.next}</small>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.progressDeck} data-journey-element="progress-deck" aria-hidden="true">
              <span>{content.telemetry.progress}</span>
              <i><b /></i>
              <strong>{currentChapter.code} / 04</strong>
            </div>

            <aside
              className={styles.convergence}
              data-journey-element="convergence"
              data-visible={activeChapter === content.chapters.length - 1 ? "true" : "false"}
            >
              <span>{content.convergence.label}</span>
              <h3>{content.convergence.title}</h3>
              <p>{content.convergence.text}</p>
              <i aria-hidden="true" />
            </aside>

            <section
              className={styles.experienceArchitecture}
              data-journey-element="experience-architecture"
            >
              <div className={styles.architectureHeader}>
                <span>{content.experienceArchitecture.label}</span>
                <h3>{content.experienceArchitecture.title}</h3>
              </div>

              <div className={styles.architectureGrid}>
                {content.experienceArchitecture.layers.map((layer) => (
                  <article
                    key={layer.code}
                    className={styles.architectureCard}
                  >
                    <small>{layer.code}</small>
                    <h4>{layer.title}</h4>
                    <p>{layer.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
