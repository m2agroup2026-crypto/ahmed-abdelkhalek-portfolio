"use client";

import { useEffect, useState } from "react";
import EnterpriseSystemsMethod from
  "../../components/EnterpriseSystemsMethod/EnterpriseSystemsMethod";
import type { EnterpriseSystemsLanguage } from
  "../../components/EnterpriseSystemsMethod/content";
import styles from "./preview.module.css";

type PreviewTheme = "light" | "dark";

export default function PreviewClient() {
  const [language, setLanguage] =
    useState<EnterpriseSystemsLanguage>("ar");
  const [theme, setTheme] = useState<PreviewTheme>("dark");

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
      <div
        className={styles.toolbar}
        aria-label="Enterprise Systems Method preview controls"
        dir="ltr"
      >
        <strong>Preview</strong>

        <div className={styles.controlGroup}>
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

        <div className={styles.controlGroup}>
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

      <EnterpriseSystemsMethod language={language} />
    </main>
  );
}
