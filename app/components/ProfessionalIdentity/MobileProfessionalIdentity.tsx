import styles from "./MobileProfessionalIdentity.module.css";
import type { ProfessionalIdentityLanguage } from "./content";
import { professionalIdentityContent } from "./content";

export default function MobileProfessionalIdentity({ language }: { language: ProfessionalIdentityLanguage }) {
  const content = professionalIdentityContent[language];

  return (
    <div className={styles.experience} data-mobile-professional-identity>
      <header className={styles.header}>
        <div className={styles.meta}><span>{content.index}</span><i /><small>{content.eyebrow}</small></div>
        <h2><span>{content.title}</span><em>{content.accent}</em></h2>
        <p>{content.intro}</p>
      </header>

      <article className={styles.core}>
        <div className={styles.mark}>AA</div>
        <span>{content.core.label}</span>
        <h3>{content.core.title}</h3>
        <i />
        <p>{content.core.text}</p>
      </article>

      <ol className={styles.dimensions}>
        {content.dimensions.map((item) => (
          <li key={item.key} data-tone={item.key}>
            <div><span>{item.code}</span><i /></div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>

      <aside className={styles.outcome}><span>{content.outcomeLabel}</span><p>{content.outcome}</p></aside>
    </div>
  );
}
