"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./GlassCommandRoom.module.css";
import { glassCommandRoomContent } from "./content";

type Props = { language?: "ar" | "en" };

export default function GlassCommandRoom({ language = "en" }: Props) {
  const content = glassCommandRoomContent[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const ar = language === "ar";

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-visible={visible} data-language={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="command-room-title">
      <div className={styles.ambient} aria-hidden="true"><i /><i /><span /></div>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div><span>{content.eyebrow}</span><small>{ar ? "مركز المهمة / الاتصال المؤسسي" : "MISSION CONTROL / ENTERPRISE CONNECTIVITY"}</small></div>
          <div><h2 id="command-room-title">{content.title}</h2><p>{content.description}</p></div>
          <div className={styles.status}><i /><small>{content.status.label}</small><strong>{content.status.value}</strong></div>
        </header>

        <div className={styles.room}>
          <div className={styles.roomBar}><span><i /><i /><i /> AA / MISSION CONTROL</span><b><i />{ar ? "البث التشغيلي مباشر" : "OPERATIONS STREAM LIVE"}</b><small>UTC +03 / GCC</small></div>

          <div className={styles.screenWall}>
            {content.screens.map((screen,index)=><article key={screen.title} style={{"--delay":`${index*120}ms`} as CSSProperties}>
              <div><span>0{index+1}</span><small>{screen.title}</small><i /></div><strong>{screen.value}</strong><p>{screen.detail}</p>
              <em>{[42,76,58,88,64,93,71,84].map((height,i)=><i key={i} style={{height:`${height}%`}} />)}</em>
            </article>)}
          </div>

          <div className={styles.missionStage}>
            <div className={styles.perspectiveGrid} aria-hidden="true" />
            <div className={styles.dataStreams} aria-hidden="true">{[0,45,90,135,180,225,270,315].map((angle,index)=><i key={angle} style={{"--angle":`${angle}deg`,"--delay":`${index*.28}s`} as CSSProperties}><b /></i>)}</div>
            <div className={styles.radar} aria-hidden="true"><i /><i /><i /><span /></div>
            <div className={styles.commandCore}><div><span>AA</span><i /></div><small>{content.aiCore.name}</small><strong>{content.aiCore.status}</strong><b>{content.aiCore.metric}</b></div>
            {content.network.map((node,index)=><article key={node.name} className={styles.node} data-node={index+1}><i /><div><strong>{node.name}</strong><small>{node.status}</small></div><span>0{index+1}</span></article>)}
            <div className={styles.missionCopy}><span>{ar ? "مركز القرار الموحد" : "UNIFIED DECISION CORE"}</span><p>{ar ? "تتدفق إشارات الأنظمة إلى قلب قيادة واحد يقرأ الحالة، يربط السياق، ويحوّل البيانات إلى قرار." : "Every system signal converges into one command core that reads state, connects context, and turns data into decisions."}</p></div>
          </div>

          <div className={styles.operatorRail}>
            {content.systems.map((system,index)=><article key={system.name}><span>0{index+1}</span><div><small>{system.status}</small><h3>{system.name}</h3><p>{system.role}</p></div><i /></article>)}
          </div>

          <footer className={styles.metrics}>{content.metrics.map((metric,index)=><div key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong><span><i style={{width:`${88-index*9}%`}} /></span></div>)}</footer>
        </div>
      </div>
    </section>
  );
}
