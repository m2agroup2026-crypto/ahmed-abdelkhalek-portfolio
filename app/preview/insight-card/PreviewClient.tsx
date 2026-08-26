"use client";

import {
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import styles from "./preview.module.css";

type PreviewLanguage = "ar" | "en";
type PreviewTheme = "dark" | "light";
type PreviewLayout = "featured" | "standard";

type PreviewClientProps = {
  arabicFeatured: ReactNode;
  arabicStandard: ReactNode;
  englishFeatured: ReactNode;
  englishStandard: ReactNode;
};

export default function PreviewClient({
  arabicFeatured,
  arabicStandard,
  englishFeatured,
  englishStandard,
}: PreviewClientProps) {
  const [language, setLanguage] =
    useState<PreviewLanguage>("ar");

  const [theme, setTheme] =
    useState<PreviewTheme>("dark");

  const [layout, setLayout] =
    useState<PreviewLayout>("featured");

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

  const selectedCard =
    language === "ar"
      ? layout === "featured"
        ? arabicFeatured
        : arabicStandard
      : layout === "featured"
        ? englishFeatured
        : englishStandard;

  const preventUnbuiltRoute = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const target =
      event.target instanceof Element
        ? event.target
        : null;

    if (target?.closest("a")) {
      event.preventDefault();
    }
  };

  return (
    <main
      className={styles.preview}
      data-preview-theme={theme}
    >
      <div
        className={styles.ambient}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>

      <div
        className={styles.toolbar}
        aria-label="Insight card preview controls"
        dir="ltr"
      >
        <strong>Insight Card</strong>

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

        <div>
          <button
            type="button"
            aria-pressed={layout === "featured"}
            onClick={() => setLayout("featured")}
          >
            Featured
          </button>

          <button
            type="button"
            aria-pressed={layout === "standard"}
            onClick={() => setLayout("standard")}
          >
            Standard
          </button>
        </div>
      </div>

      <section className={styles.intro}>
        <p>INSIGHTS / VISUAL SYSTEM</p>

        <h1>
          {language === "ar"
            ? "الرؤى والهندسة الرقمية"
            : "Insights & Digital Engineering"}
        </h1>

        <span>
          {language === "ar"
            ? "معاينة بطاقة المقال قبل بناء صفحات مركز المعرفة."
            : "Previewing the article card before building the knowledge center routes."}
        </span>
      </section>

      <section
        className={styles.stage}
        onClick={preventUnbuiltRoute}
        aria-label={
          language === "ar"
            ? "معاينة بطاقة المقال"
            : "Insight card preview"
        }
      >
        {selectedCard}
      </section>

      <p className={styles.notice}>
        {language === "ar"
          ? "رابط المقال معطّل داخل المعاينة فقط حتى إنشاء الصفحة الفعلية."
          : "The article link is disabled in preview only until the real route is built."}
      </p>
    </main>
  );
}
