"use client";

import styles from "./FooterExperience.module.css";
import { footerContent, footerNav, footerText, type FooterLanguage } from "./content";
import { useFooterMotion } from "./useFooterMotion";

export default function FooterExperience({ language }: { language: FooterLanguage }) {
  const footerRef = useFooterMotion();
  const ar = language === "ar";
  const scrollTop = (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer ref={footerRef} className={styles.footer} dir={ar ? "rtl" : "ltr"}>
      <div className={styles.ambient} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.shell}>
        <section className={styles.finalStatement} aria-labelledby="footer-statement">
          <div className={styles.core} aria-hidden="true"><span /><span /><i /><strong>AA</strong></div>
          <div className={styles.statementCopy}>
            <p>{footerText(footerContent.prelude, language)}</p>
            <h2 id="footer-statement">{footerText(footerContent.title, language)}<em>{footerText(footerContent.accent, language)}</em></h2>
            <blockquote>{footerText(footerContent.statement, language)}</blockquote>
          </div>
          <a className={styles.topControl} href="#top" onClick={scrollTop} aria-label={footerText(footerContent.top, language)}><span>{footerText(footerContent.top, language)}</span><i><svg viewBox="0 0 24 24"><path d="M12 20V4M5 11l7-7 7 7"/></svg></i></a>
        </section>

        <div className={styles.identityDeck}>
          <div className={styles.identity}>
            <span className={styles.monogram}>AA</span>
            <div><h3>{ar ? "أحمد عبد الخالق" : "Ahmed Abdelkhalek"}</h3><p>{footerText(footerContent.role, language)}</p><small>{footerText(footerContent.location, language)}</small></div>
          </div>
          <nav className={styles.navigation} aria-label={footerText(footerContent.navigation, language)}><p>{footerText(footerContent.navigation, language)}</p>{footerNav.map(item => <a key={item.code} href={item.href}><span>{item.code}</span><b>{item[language]}</b><i>↗</i></a>)}</nav>
          <div className={styles.channels}><p>{footerText(footerContent.channels, language)}</p><a href="mailto:ahmed@m2agroupeg.com"><span>EMAIL</span><b>ahmed@m2agroupeg.com</b><i>↗</i></a><a href="https://www.linkedin.com/in/ahmed-abdelkhalek-3baab5414/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>Professional network</b><i>↗</i></a><a href={ar ? "/insights" : "/en/insights"}><span>THE EDGE</span><b>{ar ? "بوابة المعرفة" : "Knowledge gateway"}</b><i>↗</i></a></div>
        </div>

        <div className={styles.systemBar}><span><i />{footerText(footerContent.status, language)}</span><b>© {new Date().getFullYear()} AHMED ABDELKHALEK</b><small>{footerText(footerContent.copyright, language)}</small></div>
      </div>
    </footer>
  );
}
