import styles from "./MobileFooterExperience.module.css";
import { footerContent, footerText, type FooterLanguage } from "./content";

export default function MobileFooterExperience({ language }: { language: FooterLanguage }) {
  const ar = language === "ar";
  return (
    <div className={styles.footer} data-mobile-signature-footer>
      <div className={styles.signature}>
        <span>{ar ? "الهوية المهنية" : "Professional identity"}</span>
        <h2>{ar ? "أحمد عبد الخالق" : "Ahmed Abdelkhalek"}</h2>
        <h3>{footerText(footerContent.role, language)}</h3>
        <p>{footerText(footerContent.statement, language)}</p>
      </div>

      <div className={styles.actions}>
        <a href="mailto:ahmed@m2agroupeg.com"><span>{ar ? "ابدأ محادثة" : "Start a conversation"}</span><i>↗</i></a>
        <a href="https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a>
      </div>

      <nav aria-label={ar ? "روابط سريعة" : "Quick links"}>
        <a href="#top">{ar ? "البداية" : "Top"}</a>
        <a href="#case-study">{ar ? "دراسة الحالة" : "Case study"}</a>
        <a href="#systems">{ar ? "الأنظمة" : "Systems"}</a>
        <a href={ar ? "/insights" : "/en/insights"}>{ar ? "الرؤى" : "Insights"}</a>
      </nav>

      <div className={styles.base}>
        <span><i />{ar ? "متاح للمشروعات المؤسسية" : "Available for enterprise projects"}</span>
        <p>© {new Date().getFullYear()} AHMED ABDELKHALEK</p>
        <small>{footerText(footerContent.copyright, language)}</small>
      </div>

    </div>
  );
}
