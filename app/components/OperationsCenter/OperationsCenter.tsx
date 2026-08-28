"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./OperationsCenter.module.css";
import { operationsCenterContent } from "./content";

type Props = { language?: "ar" | "en" };

export default function OperationsCenter({ language = "en" }: Props) {
  const content = operationsCenterContent[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-visible={visible} data-language={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="operations-center-title">
      <div className={styles.ambient} aria-hidden="true"><i /><i /><span /></div>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerMeta}><span>{content.eyebrow}</span><small>{content.sequence}</small></div>
          <div className={styles.heading}><h2 id="operations-center-title">{content.title}</h2><p>{content.description}</p></div>
          <div className={styles.status} aria-label={`${content.status.label}: ${content.status.value}`}><i aria-hidden="true" /><span>{content.status.label}</span><strong>{content.status.value}</strong></div>
        </header>

        <div className={styles.commandDeck}>
          <div className={styles.deckBar}><span><i /><i /><i /> {content.console}</span><b><i />{content.live}</b><small>{content.region}</small></div>
          <div className={styles.metrics}>
            {content.metrics.map((metric, index) => (
              <article key={metric.label} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                <div><small>0{index + 1}</small><i aria-hidden="true" /></div><span>{metric.label}</span><strong>{metric.value}</strong><em><i style={{ width: metric.level }} />{metric.trend}</em>
              </article>
            ))}
          </div>

          <div className={styles.workspace}>
            <div className={styles.topology}>
              <div className={styles.panelLabel}><span>{content.topology.label}</span><small>{content.topology.caption}</small></div>
              <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
              <div className={styles.core}><span>AA</span><strong>{content.topology.core}</strong><small>{content.topology.coreState}</small></div>
              {content.topology.nodes.map((node, index) => <div className={styles.node} data-node={index + 1} key={node}><i /><span>{node}</span><small>ONLINE</small></div>)}
            </div>

            <aside className={styles.feed} aria-label={content.feedLabel}>
              <div className={styles.panelLabel}><span>{content.feedLabel}</span><small>{content.feedState}</small></div>
              <div className={styles.feedList}>{content.feed.map((item, index) => <p key={item}><time>0{index + 1}</time><i /><span>{item}</span><b>{content.verified}</b></p>)}</div>
              <div className={styles.signal}><span>{content.signal}</span><div>{[42,68,51,84,62,91,73,88,58,76,94,69].map((height,index)=><i key={index} style={{height:`${height}%`,"--bar-delay":`${index * 70}ms`} as CSSProperties}/>)}</div></div>
            </aside>
          </div>
          <footer className={styles.deckFooter}><span><i />{content.footer.primary}</span><b>{content.footer.center}</b><span>{content.footer.secondary}<i /></span></footer>
        </div>
      </div>
    </section>
  );
}
