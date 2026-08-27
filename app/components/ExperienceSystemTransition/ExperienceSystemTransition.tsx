import styles from "./ExperienceSystemTransition.module.css";
import { experienceSystemTransitionContent } from "./content";

type Props = {
  language?: "en" | "ar";
};

export default function ExperienceSystemTransition({
  language = "en",
}: Props) {
  const content = experienceSystemTransitionContent[language];

  return (
    <section
      className={styles.section}
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-label={content.eyebrow}
    >
      <div className={styles.shell}>

        <div className={styles.particles} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className={styles.signal}>
          <span>{content.signal.label}</span>
          <strong>{content.signal.value}</strong>
        </div>

        <div className={styles.energyLine}>
          <i />
        </div>

        <div className={styles.core}>
          <small>{content.core.title}</small>
          <strong>{content.core.status}</strong>
        </div>

        <header>
          <span>{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </header>

      </div>
    </section>
  );
}
