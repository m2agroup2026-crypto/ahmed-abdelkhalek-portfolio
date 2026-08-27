import styles from "./OperationsCenter.module.css";
import { operationsCenterContent } from "./content";

type Props = {
  language?: "ar" | "en";
};

export default function OperationsCenter({ language = "en" }: Props) {
  const content = operationsCenterContent[language];

  return (
    <section className={styles.section} dir={language === "ar" ? "rtl" : "ltr"}>
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

        <div className={styles.metrics}>
          {content.metrics.map((metric) => (
            <article key={metric.label}>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>

        <div className={styles.feed}>
          <span>LIVE OPERATIONS FEED</span>

          {content.feed.map((item) => (
            <p key={item}>
              <i />
              {item}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}
