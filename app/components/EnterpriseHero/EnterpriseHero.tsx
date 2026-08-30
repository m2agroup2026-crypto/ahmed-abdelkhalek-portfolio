"use client";

import Image from "next/image";
import styles from "./EnterpriseHero.module.css";
import mobileStyles from "./EnterpriseHero.mobile.module.css";
import {
  enterpriseHeroContent,
  type EnterpriseHeroLanguage,
} from "./content";
import { useHeroMotion } from "./useHeroMotion";
import { usePointerField } from "./usePointerField";

type EnterpriseHeroProps = {
  language: EnterpriseHeroLanguage;
};

export default function EnterpriseHero({
  language,
}: EnterpriseHeroProps) {
  const content = enterpriseHeroContent[language];
  const isArabic = language === "ar";
  const { heroRef, motionState } =
    useHeroMotion<HTMLElement>();

  usePointerField(
    heroRef,
    motionState === "active"
  );

  return (
    <section
      ref={heroRef}
      id="top"
      className={styles.section}
      aria-labelledby="enterprise-hero-title"
      data-language={language}
      data-motion={motionState}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.horizon} />
        <span className={styles.orbitPrimary} />
        <span className={styles.orbitSecondary} />
        <span className={styles.signalPrimary} />
        <span className={styles.signalSecondary} />
        <span className={styles.pointerField} />
      </div>

      <div
        className={`${styles.inner} ${mobileStyles.mobileInner}`}
        data-enterprise-hero-layout
      >
        <div className={styles.copy} data-enterprise-hero-copy>
          <div className={styles.identity}>
            <span className={styles.identityMark}>AA</span>

            <p>
              <strong>{content.identity}</strong>
              <span>{content.role}</span>
            </p>
          </div>

          <div className={styles.status}>
            <i aria-hidden="true" />
            <span>{content.status}</span>
          </div>

          <h1
            className={styles.title}
            id="enterprise-hero-title"
            data-enterprise-hero-title
          >
            <span>{content.title.lead}</span>
            <em>{content.title.accent}</em>
          </h1>

          <p className={styles.intro}>{content.intro}</p>

          <div className={styles.actions}>
            <a
              className={styles.primaryAction}
              href={content.primaryAction.href}
            >
              <span>{content.primaryAction.label}</span>
              <i aria-hidden="true">↗</i>
            </a>

            <a
              className={styles.secondaryAction}
              href={content.secondaryAction.href}
            >
              <span>{content.secondaryAction.label}</span>
              <i aria-hidden="true">←</i>
            </a>
          </div>
        </div>

        <figure className={styles.visual}>
          <div className={styles.visualFrame}>
            <div className={styles.portrait}>
              <Image
                src="/ahmed-abdelkhalek-v2.jpg"
                alt={content.portraitAlt}
                fill
                priority
                sizes="(max-width: 900px) 86vw, 38vw"
              />
            </div>

            <div className={styles.systemMap} aria-hidden="true">
              <span className={styles.systemGrid} />
              <span className={styles.systemArcPrimary} />
              <span className={styles.systemArcSecondary} />
              <span className={styles.systemScan} />

              <i className={styles.node} data-node="01" />
              <i className={styles.node} data-node="02" />
              <i className={styles.node} data-node="03" />
              <i className={styles.node} data-node="04" />
            </div>

            <figcaption className={styles.visualCaption}>
              <span>{content.systemLabel}</span>
              <strong>
                <i aria-hidden="true" />
                {content.systemStatus}
              </strong>
            </figcaption>
          </div>
        </figure>

        <ul
          className={styles.capabilities}
          aria-label={
            isArabic
              ? "مجالات هندسة الأنظمة"
              : "Enterprise systems capabilities"
          }
        >
          {content.capabilities.map((capability) => (
            <li key={capability.code}>
              <span>{capability.code}</span>

              <p>
                <strong>{capability.label}</strong>
                <small>{capability.technicalLabel}</small>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
