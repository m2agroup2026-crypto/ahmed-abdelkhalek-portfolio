"use client";

import styles from "./CaseStudyExperience.module.css";
import {
  caseStudyExperienceContent,
  type CaseStudyLanguage,
  type CaseStudyLayer,
} from "./content";
import { useCaseStudyExperienceMotion } from "./useCaseStudyExperienceMotion";

type CaseStudyExperienceProps = {
  language: CaseStudyLanguage;
};

const connectorPaths = [
  "M500 300 C392 282 302 214 218 132",
  "M500 300 C404 304 310 300 160 300",
  "M500 300 C394 334 302 390 220 468",
  "M500 300 C606 282 698 214 782 132",
  "M500 300 C602 304 694 300 840 300",
  "M500 300 C606 334 698 390 780 468",
];

const nodePositions = [
  { x: 218, y: 132 },
  { x: 160, y: 300 },
  { x: 220, y: 468 },
  { x: 782, y: 132 },
  { x: 840, y: 300 },
  { x: 780, y: 468 },
];

function LayerIcon({ layer }: { layer: CaseStudyLayer["key"] }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (layer === "identity") {
    return <svg {...common}><circle cx="16" cy="16" r="9"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M9 9l3 3M20 20l3 3"/><circle cx="16" cy="16" r="3"/></svg>;
  }
  if (layer === "platform") {
    return <svg {...common}><rect x="4" y="6" width="24" height="18" rx="3"/><path d="M4 11h24M9 17h7M9 21h12"/><circle cx="8" cy="8.5" r=".8" fill="currentColor" stroke="none"/></svg>;
  }
  if (layer === "leads") {
    return <svg {...common}><circle cx="12" cy="12" r="5"/><path d="M4 27c.8-5 3.5-8 8-8 3.2 0 5.5 1.5 6.8 4M22 7v10M18 12l4 5 4-5"/></svg>;
  }
  if (layer === "messaging") {
    return <svg {...common}><path d="M5 7h22v15H15l-7 5v-5H5V7Z"/><path d="M10 12h12M10 16h8"/></svg>;
  }
  if (layer === "automation") {
    return <svg {...common}><rect x="4" y="5" width="8" height="8" rx="2"/><rect x="20" y="19" width="8" height="8" rx="2"/><path d="M12 9h6a4 4 0 0 1 4 4v6M20 23h-6a4 4 0 0 1-4-4v-6"/><path d="m19 16 3 3 3-3M13 16l-3-3-3 3"/></svg>;
  }
  return <svg {...common}><ellipse cx="16" cy="8" rx="10" ry="4"/><path d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"/></svg>;
}

export default function CaseStudyExperience({ language }: CaseStudyExperienceProps) {
  const content = caseStudyExperienceContent[language];
  const isArabic = language === "ar";
  const {
    sectionRef,
    motionState,
    activeLayer,
    activePhase,
    jumpToLayer,
  } = useCaseStudyExperienceMotion<HTMLElement>();
  const currentLayer = content.layers[activeLayer];

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className={styles.section}
      aria-labelledby="case-study-title"
      data-language={language}
      data-motion={motionState}
      data-layer={activeLayer + 1}
      data-phase={activePhase + 1}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.auroraLime} />
        <span className={styles.auroraCyan} />
        <span className={styles.auroraViolet} />
        <span className={styles.scan} />
        <span className={styles.orbitOne} />
        <span className={styles.orbitTwo} />
      </div>

      <div className={styles.stickyViewport}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <p>{content.index}</p>
              <span><i aria-hidden="true" />{content.eyebrow}</span>
            </div>

            <div className={styles.headline}>
              <h2 id="case-study-title">
                <span>{content.title}</span>
                <em>{content.accent}</em>
              </h2>
              <p>{content.intro}</p>
            </div>

            <div className={styles.headerAside}>
              <a className={styles.liveLink} href="https://m2agroupeg.com" target="_blank" rel="noreferrer">
                <span><i aria-hidden="true" />{content.live}</span>
                <b>{content.visit}</b>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
              </a>
              <div className={styles.transformationMini} aria-hidden="true">
                <span><i /><b>{isArabic ? "إشارات" : "SIGNALS"}</b><small>05</small></span>
                <em><i /><i /><i /></em>
                <span><i /><b>{isArabic ? "نظام واحد" : "DIGITAL OS"}</b><small>01</small></span>
              </div>
            </div>
          </header>

          <div className={styles.commandShell}>
            <div className={styles.telemetry} aria-hidden="true">
              <span>M2A / DIGITAL OS</span>
              <span className={styles.phaseState}>
                <i />
                {content.phases[activePhase]}
              </span>
              <span>NODE / 0{activeLayer + 1} — 06</span>
            </div>

            <div className={styles.workspace}>
              <aside className={styles.challengePanel}>
                <div className={styles.panelIndex}>A / 01</div>
                <span className={styles.panelLabel}>{content.challengeLabel}</span>
                <h3>{content.challengeTitle}</h3>
                <p>{content.challengeText}</p>

                <div className={styles.fragments}>
                  <span>{content.fragmentsLabel}</span>
                  <ul>
                    {content.fragments.map((fragment, index) => (
                      <li key={fragment} style={{ "--fragment-index": index } as React.CSSProperties}>
                        <i aria-hidden="true" />
                        {fragment}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className={styles.topology} aria-label={content.topologyLabel}>
                <div className={styles.topologyHud} aria-hidden="true">
                  <span>{content.topologyLabel}</span>
                  <b>SYS / 06 LAYERS</b>
                </div>

                <svg className={styles.network} viewBox="0 0 1000 600" aria-hidden="true">
                  <defs>
                    <filter id="caseGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {connectorPaths.map((path, index) => (
                    <g key={path}>
                      <path className={styles.connectorGhost} d={path} />
                      <path
                        className={styles.connectorEnergy}
                        data-complete={index <= activeLayer ? "true" : "false"}
                        data-current={index === activeLayer ? "true" : "false"}
                        pathLength="1"
                        d={path}
                      />
                      <circle
                        className={styles.packet}
                        data-visible={index <= activeLayer ? "true" : "false"}
                        r="4"
                      >
                        <animateMotion dur={`${2.7 + index * 0.18}s`} repeatCount="indefinite" path={path} />
                      </circle>
                    </g>
                  ))}

                  {nodePositions.map((node, index) => (
                    <g
                      className={styles.mapNode}
                      data-complete={index <= activeLayer ? "true" : "false"}
                      data-current={index === activeLayer ? "true" : "false"}
                      transform={`translate(${node.x} ${node.y})`}
                      key={`${node.x}-${node.y}`}
                    >
                      <circle r="27" />
                      <circle r="7" />
                    </g>
                  ))}
                </svg>

                <div className={styles.core} aria-hidden="true">
                  <span className={styles.coreRingOne} />
                  <span className={styles.coreRingTwo} />
                  <span className={styles.coreSweep} />
                  <div>
                    <small>M2A</small>
                    <strong>DIGITAL<br/>OS</strong>
                    <i />
                    <b>{content.phases[activePhase]}</b>
                  </div>
                </div>

                {content.layers.map((layer, index) => (
                  <button
                    type="button"
                    className={styles.mapLabel}
                    data-position={index + 1}
                    data-active={index === activeLayer ? "true" : "false"}
                    data-complete={index <= activeLayer ? "true" : "false"}
                    onClick={() => jumpToLayer(index)}
                    aria-label={`${layer.code} — ${layer.title}`}
                    key={layer.code}
                  >
                    <span>{layer.code}</span>
                    <b>{layer.short}</b>
                  </button>
                ))}
              </div>

              <aside className={styles.layersPanel}>
                <div className={styles.panelIndex}>B / 02</div>
                <span className={styles.panelLabel}>{content.layersLabel}</span>
                <ol>
                  {content.layers.map((layer, index) => (
                    <li data-active={index === activeLayer ? "true" : "false"} key={layer.code}>
                      <button type="button" onClick={() => jumpToLayer(index)}>
                        <span className={styles.layerCode}>{layer.code}</span>
                        <span className={styles.layerIcon}><LayerIcon layer={layer.key} /></span>
                        <span className={styles.layerCopy}>
                          <b>{layer.title}</b>
                          <small>{layer.description}</small>
                        </span>
                        <i className={styles.layerStatus} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>

            <div className={styles.progressDeck} aria-hidden="true">
              <span>{content.phases[activePhase]}</span>
              <i><b /></i>
              <strong>{currentLayer.code} / 06</strong>
            </div>

            <aside className={styles.outcome} data-visible={activePhase === 3 ? "true" : "false"}>
              <span>{content.outcomeLabel}</span>
              <div>
                <h3>{content.outcomeTitle}</h3>
                <p>{content.outcomeText}</p>
              </div>
              <a href="https://m2agroupeg.com" target="_blank" rel="noreferrer">
                {content.visit}<b aria-hidden="true">↗</b>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
