"use client";

import { useEffect, useState } from "react";
import InsightArticlePage from
  "../../components/Insights/InsightArticlePage";
import {
  enterpriseAiOperatingModel,
} from "../../content/insights/articles/enterprise-ai-operating-model";
import type {
  InsightLanguage,
} from "../../content/insights/types";
import styles from "./preview.module.css";

type PreviewTheme = "dark" | "light";

export default function PreviewClient() {
  const [language, setLanguage] =
    useState<InsightLanguage>("ar");

  const [theme, setTheme] =
    useState<PreviewTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const previousTheme =
      root.getAttribute("data-theme");

    root.setAttribute("data-theme", theme);

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-theme");
        return;
      }

      root.setAttribute(
        "data-theme",
        previousTheme
      );
    };
  }, [theme]);

  return (
    <>
      <div
        className={styles.toolbar}
        aria-label="Insight article preview controls"
        dir="ltr"
      >
        <strong>ARTICLE PREVIEW</strong>

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

      <InsightArticlePage
        article={enterpriseAiOperatingModel}
        language={language}
      />
    </>
  );
}
