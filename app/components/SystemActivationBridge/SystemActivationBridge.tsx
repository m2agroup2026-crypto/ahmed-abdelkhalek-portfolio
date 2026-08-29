import styles from "./SystemActivationBridge.module.css";
import { systemActivationBridgeContent } from "./content";

type Props = {
  language?: "ar" | "en";
};

export default function SystemActivationBridge({ language = "en" }: Props) {
  const content = systemActivationBridgeContent[language];

  return (
    <section
      id="system-activation-bridge"
      className={styles.section}
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-label={content.eyebrow}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <span>{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </header>

        <div className={styles.layers}>
          {content.layers.map((layer) => (
            <article key={layer.code} className={styles.layer}>
              <small>{layer.code}</small>

              <h3>{layer.source}</h3>

              <strong>{layer.system}</strong>

              <p>{layer.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
