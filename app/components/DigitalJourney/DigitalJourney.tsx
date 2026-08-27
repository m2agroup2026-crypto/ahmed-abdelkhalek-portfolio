"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DigitalJourney.module.css";

type Language = "ar" | "en";
type Bilingual = { ar: string; en: string };

const chapters: Array<{
  role: Bilingual;
  organization: Bilingual;
  description: Bilingual;
  layer: Bilingual;
  code: string;
}> = [
  {
    role: { ar: "مسؤول العلاقات العامة والإعلام", en: "Public Relations & Media Officer" },
    organization: { ar: "كلية الطب", en: "Faculty of Medicine" },
    description: {
      ar: "إدارة الاتصال المؤسسي وتنظيم الفعاليات والعلاقات مع أصحاب المصلحة والعمليات الجماهيرية.",
      en: "Institutional communication, event coordination, stakeholder relations, and public-facing operations.",
    },
    layer: { ar: "الاتصال", en: "Communication" },
    code: "COM",
  },
  {
    role: { ar: "رئيس قسم العلاقات العامة", en: "Head of Public Relations" },
    organization: { ar: "مؤسسة مصر العربية لحقوق الإنسان", en: "Masr Al Arabia Foundation for Human Rights" },
    description: {
      ar: "قيادة منظومة الاتصال وتحويل أهداف المؤسسة إلى تواصل جماهيري منظم وفعّال.",
      en: "Led communication workflows and translated organizational objectives into structured public engagement.",
    },
    layer: { ar: "الحوكمة", en: "Governance" },
    code: "GOV",
  },
  {
    role: { ar: "المدير الإداري ومسؤول العقود", en: "Administrative Director & Contracts Officer" },
    organization: { ar: "جمعية زاد — أسيوط", en: "ZAD Association — Assiut" },
    description: {
      ar: "إدارة الشؤون الإدارية والعقود والتوثيق والأنظمة الداعمة للتشغيل اليومي.",
      en: "Managed administration, contracts, documentation, and the systems behind operational delivery.",
    },
    layer: { ar: "التشغيل", en: "Operations" },
    code: "OPS",
  },
  {
    role: { ar: "مدير تكنولوجيا المعلومات والتحول الرقمي", en: "IT & Digital Transformation Manager" },
    organization: { ar: "مجموعة M2A", en: "M2A Group" },
    description: {
      ar: "تصميم منصات مترابطة تجمع الهوية والبيانات وإدارة العملاء والأتمتة والرسائل والذكاء الاصطناعي.",
      en: "Designing connected platforms that unite brand, data, CRM, automation, messaging, and AI.",
    },
    layer: { ar: "هندسة الأنظمة", en: "Systems Architecture" },
    code: "SYS",
  },
];

const copy = {
  index: { ar: "02 / الرحلة الرقمية", en: "02 / Digital Journey" },
  title: { ar: "خبرة تراكمت.", en: "Experience compounded." },
  accent: { ar: "ثم تحوّلت إلى نظام.", en: "Then became a system." },
  intro: {
    ar: "لم تكن الرحلة انتقالًا بين مسميات وظيفية، بل بناءً متدرجًا لفهم المؤسسة: كيف تتواصل، وكيف تُدار، وكيف تعمل، ثم كيف تتحول إلى منظومة رقمية مترابطة.",
    en: "This was never a sequence of job titles. It was a progressive study of the institution: how it communicates, how it is governed, how it operates, and how it becomes one connected digital system.",
  },
  signal: { ar: "مسار الخبرة / متصل", en: "Experience path / connected" },
  chapter: { ar: "مرحلة", en: "Chapter" },
  outcome: { ar: "المحصلة", en: "The outcome" },
  outcomeTitle: { ar: "رؤية مؤسسية تحولت إلى هندسة رقمية.", en: "Institutional insight, translated into digital architecture." },
  outcomeText: {
    ar: "اليوم، كل نظام أبنيه يجمع بين فهم الإنسان، ومنطق التشغيل، ودقة البيانات، وقابلية التكنولوجيا للتوسع.",
    en: "Today, every system I build combines human understanding, operational logic, data discipline, and scalable technology.",
  },
};

export default function DigitalJourney({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const text = <T extends Bilingual>(value: T) => value[language];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`${styles.journey} ${visible ? styles.visible : ""}`}
      aria-labelledby="journey-title"
    >
      <div className={styles.ambient} aria-hidden="true"><i /><i /><i /></div>
      <div className={`shell ${styles.shell}`}>
        <header className={styles.header}>
          <div>
            <p className={styles.index}><span />{text(copy.index)}</p>
            <h2 id="journey-title">{text(copy.title)}<em>{text(copy.accent)}</em></h2>
          </div>
          <div className={styles.intro}>
            <p>{text(copy.intro)}</p>
            <span><i />{text(copy.signal)}</span>
          </div>
        </header>

        <div className={styles.experience}>
          <div className={styles.rail} aria-hidden="true">
            <span style={{ "--progress": `${active / (chapters.length - 1) * 100}%` } as React.CSSProperties} />
          </div>
          <div className={styles.chapters}>
            {chapters.map((chapter, index) => (
              <article
                key={chapter.code}
                className={`${styles.chapter} ${active === index ? styles.active : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                tabIndex={0}
              >
                <div className={styles.marker}><span>0{index + 1}</span><i /></div>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <span>{text(copy.chapter)} / 0{index + 1}</span>
                    <b>{chapter.code}</b>
                  </div>
                  <p className={styles.organization}>{text(chapter.organization)}</p>
                  <h3>{text(chapter.role)}</h3>
                  <p className={styles.description}>{text(chapter.description)}</p>
                  <div className={styles.layer}><i />{text(chapter.layer)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className={styles.outcome}>
          <div className={styles.outcomeOrb} aria-hidden="true"><span>∞</span><i /><i /></div>
          <div>
            <p>{text(copy.outcome)}</p>
            <h3>{text(copy.outcomeTitle)}</h3>
            <span>{text(copy.outcomeText)}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
