"use client";

import styles from "./ContactExperience.module.css";
import { contactChannels, contactContent, contactText, type ContactLanguage } from "./content";
import { useContactMotion } from "./useContactMotion";

function ChannelIcon({ code }: { code: string }) {
  if (code === "01") return <svg viewBox="0 0 24 24"><path d="M3 6h18v12H3zM3 7l9 7 9-7"/></svg>;
  if (code === "02") return <svg viewBox="0 0 24 24"><rect x="4" y="9" width="4" height="11"/><path d="M6 4.5v.01M11 20v-7c0-2 1.2-4 4-4 2.6 0 4 1.8 4 4v7M11 9v11"/></svg>;
  return <svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.8 3 2.5 4.7 5.5 5.5"/></svg>;
}

export default function ContactExperience({ language }: { language: ContactLanguage }) {
  const sectionRef = useContactMotion();
  const ar = language === "ar";
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`${data.get("project")} — ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);
    window.location.href = `mailto:ahmed@m2agroupeg.com?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section} dir={ar ? "rtl" : "ltr"} aria-labelledby="contact-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <div><p>{contactText(contactContent.eyebrow, language)}</p><span className={styles.status}><i />{contactText(contactContent.status, language)}</span></div>
          <h2 id="contact-title">{contactText(contactContent.title, language)}<em>{contactText(contactContent.accent, language)}</em></h2>
          <p className={styles.intro}>{contactText(contactContent.intro, language)}</p>
        </header>

        <div className={styles.command}>
          <div className={styles.commandBar}><span><i /><i /><i /></span><b>AA / CONTACT PROTOCOL</b><small>SECURE CHANNEL / 06</small></div>
          <aside className={styles.channels}>
            <div className={styles.signal}>
              <span>{contactText(contactContent.signal, language)} / ONLINE</span>
              <div aria-hidden="true"><i /><i /><i /><strong>AA</strong></div>
              <b>{contactText(contactContent.response, language)}</b>
            </div>
            <p>{contactText(contactContent.direct, language)}</p>
            <div className={styles.channelList}>{contactChannels.map(channel => (
              <a key={channel.code} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer" : undefined} data-tone={channel.tone}>
                <span><ChannelIcon code={channel.code} /></span><div><small>{channel.code} / {channel.label}</small><b><bdi dir="ltr">{channel.value}</bdi></b></div><i>↗</i>
              </a>
            ))}</div>
          </aside>

          <form className={styles.form} onSubmit={sendMessage}>
            <div className={styles.formHead}><span>INTAKE / 01</span><h3>{contactText(contactContent.formTitle, language)}</h3><p>{contactText(contactContent.formIntro, language)}</p></div>
            <label>{contactText(contactContent.name, language)}<input name="name" required autoComplete="name" placeholder={contactText(contactContent.namePlaceholder, language)} /></label>
            <label>{contactText(contactContent.email, language)}<input name="email" required type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" /></label>
            <label className={styles.wide}>{contactText(contactContent.type, language)}<select name="project" required defaultValue=""><option value="" disabled>{contactText(contactContent.select, language)}</option>{contactContent.tracks[language].map(track => <option key={track}>{track}</option>)}</select></label>
            <label className={styles.wide}>{contactText(contactContent.brief, language)}<textarea name="message" required rows={5} placeholder={contactText(contactContent.briefPlaceholder, language)} /></label>
            <div className={styles.submitRow}><small><i />{contactText(contactContent.privacy, language)}</small><button type="submit"><span>{contactText(contactContent.submit, language)}</span><i>↗</i></button></div>
          </form>
        </div>
      </div>
    </section>
  );
}
