"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GlassCommandRoom.module.css";
import { glassCommandRoomContent } from "./content";

type Props = {
  language?: "ar" | "en";
};

export default function GlassCommandRoom({ language = "en" }: Props) {
  const content = glassCommandRoomContent[language];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-label={content.eyebrow}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <span>{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>

          <div className={styles.status}>
            <small>{content.status.label}</small>
            <strong>{content.status.value}</strong>
          </div>
        </header>

        <div className={styles.commandRoom}>
          <div className={styles.core}>
            <span>DIGITAL CORE</span>
            <strong>ONLINE</strong>
          </div>

          <div className={styles.systemGrid}>
            {content.systems.map((system) => (
              <article key={system.name}>
                <small>{system.status}</small>
                <h3>{system.name}</h3>
                <p>{system.role}</p>
              </article>
            ))}
          </div>

          <div className={styles.screenDeck}>
            {content.screens.map((screen) => (
              <article key={screen.title}>
                <small>{screen.title}</small>
                <strong>{screen.value}</strong>
                <p>{screen.detail}</p>
              </article>
            ))}
          </div>

          <div className={styles.networkOrbit}>
            <div className={styles.orbitRing} />
            <div className={styles.orbitRingInner} />

            <div className={styles.streamLines}>
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className={styles.aiCore}>
              <div className={styles.aiOrb}>
                <span />
                <i />
              </div>

              <small>{content.aiCore.name}</small>
              <strong>{content.aiCore.status}</strong>
              <b>{content.aiCore.metric}</b>
            </div>

            {content.network.map((node, index) => (
              <article
                key={node.name}
                className={styles.node}
                data-node={index + 1}
              >
                <i />
                <strong>{node.name}</strong>
                <small>{node.status}</small>
              </article>
            ))}
          </div>

          <div className={styles.metrics}>
            {content.metrics.map((metric) => (
              <div key={metric.label}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
