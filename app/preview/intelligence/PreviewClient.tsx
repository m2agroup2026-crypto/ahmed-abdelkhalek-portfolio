"use client";

import { useEffect, useState } from "react";
import IntelligenceModal from
  "../../components/IntelligenceExperience/IntelligenceModal";
import type { IntelligenceExperienceLanguage } from
  "../../components/IntelligenceExperience/content";
import styles from "./preview.module.css";

type PreviewTheme = "light" | "dark";

export default function PreviewClient() {
  const [open, setOpen] = useState(false);

  const [language, setLanguage] =
    useState<IntelligenceExperienceLanguage>("ar");

  const [theme, setTheme] =
    useState<PreviewTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");

    root.setAttribute("data-theme", theme);

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-theme");
        return;
      }

      root.setAttribute("data-theme", previousTheme);
    };
  }, [theme]);

  return (
    <main className={styles.preview}>
      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
      </div>

      <section className={styles.card}>
        <p>AHMED INTELLIGENCE / PREVIEW</p>
        <h1>Enterprise AI Conversation Interface</h1>

        <span>
          Test the dialog, API connection, keyboard controls,
          responsive layout, languages, and themes before
          connecting it to the main hero.
        </span>

        <div className={styles.controls}>
          <div>
            <button
              type="button"
              aria-pressed={language === "ar"}
              onClick={() => setLanguage("ar")}
            >
              عربي
            </button>

            <button
              type="button"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
          </div>

          <div>
            <button
              type="button"
              aria-pressed={theme === "dark"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>

            <button
              type="button"
              aria-pressed={theme === "light"}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
          </div>
        </div>

        <button
          type="button"
          className={styles.openButton}
          onClick={() => setOpen(true)}
        >
          <span>Open Ahmed Intelligence</span>
          <i aria-hidden="true">↗</i>
        </button>

        <small>
          Press Escape to close · Tab stays inside the dialog
        </small>
      </section>

      <IntelligenceModal
        open={open}
        language={language}
        onClose={() => setOpen(false)}
      />
    </main>
  );
}
