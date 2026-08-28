import Link from "next/link";
import InsightsThemeToggle from "./InsightsThemeToggle";
import {
  getFeaturedInsights,
  getInsightsIndexPath,
  getPortfolioHomePath,
  getPublishedInsights,
} from "../../content/insights/registry";
import {
  insightCategories,
} from "../../content/insights/catalog";
import {
  insightsUiContent,
} from "../../content/insights/ui";
import type {
  InsightCategory,
  InsightLanguage,
} from "../../content/insights/types";
import InsightCard from "./InsightCard";
import InsightsAssistant from "./InsightsAssistant";
import styles from
  "./InsightsIndexPage.module.css";

type InsightsIndexPageProps = {
  language: InsightLanguage;
};

export default function InsightsIndexPage({
  language,
}: InsightsIndexPageProps) {
  const isArabic = language === "ar";
  const alternateLanguage =
    isArabic ? "en" : "ar";

  const ui = insightsUiContent[language];

  const articles = getPublishedInsights();
  const featured = getFeaturedInsights(1);

  const featuredSlugs = new Set(
    featured.map((article) => article.slug)
  );

  const latest = articles.filter(
    (article) =>
      !featuredSlugs.has(article.slug)
  );

  const publishedCategoryIds =
    new Set<InsightCategory>(
      articles.map(
        (article) => article.category
      )
    );

  const latestCategoryIds =
    new Set<InsightCategory>(
      latest.map(
        (article) => article.category
      )
    );

  const publishedCategories =
    insightCategories.filter(
      (category) =>
        publishedCategoryIds.has(
          category.id
        )
    );

  const alternateHref =
    getInsightsIndexPath(alternateLanguage);

  const homeHref =
    getPortfolioHomePath(language);

  return (
    <main
      className={styles.page}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        className={styles.ambient}
        aria-hidden="true"
      >
        <span className={styles.grid} />
        <span className={styles.orbitPrimary} />
        <span className={styles.orbitSecondary} />
        <span className={styles.signal} />
      </div>

      <header className={styles.siteHeader}>
        <Link
          className={styles.brand}
          href={homeHref}
          aria-label={ui.article.home}
        >
          <span>{ui.author.initials}</span>

          <p>
            <small>{ui.brand.eyebrow}</small>
            <strong>{ui.brand.name}</strong>
          </p>
        </Link>

        <nav
          className={styles.headerNavigation}
          aria-label={
            isArabic
              ? "التنقل في مركز المعرفة"
              : "Knowledge center navigation"
          }
        >
          <Link href={homeHref}>
            {ui.article.home}
          </Link>

          <InsightsThemeToggle
            language={language}
          />

          <Link
            href={alternateHref}
            hrefLang={alternateLanguage}
            lang={alternateLanguage}
          >
            {ui.article.switchLanguage}
          </Link>
        </nav>
      </header>

      <section
        className={styles.hero}
        aria-labelledby="insights-index-title"
      >
        <div className={styles.heroCopy}>
          <p>{ui.index.eyebrow}</p>

          <h1 id="insights-index-title">
            <span>{ui.index.title}</span>
            <em>{ui.index.accent}</em>
          </h1>

          <strong>{ui.index.introduction}</strong>
        </div>

        <div
          className={styles.heroVisual}
          aria-hidden="true"
        >
          <span className={styles.visualGrid} />
          <span className={styles.visualOrbit} />
          <span className={styles.visualCore} />
          <span className={styles.visualSignal} />

          <small>KNOWLEDGE ARCHITECTURE</small>
          <strong>
            {String(articles.length).padStart(
              2,
              "0"
            )}
          </strong>

          <i />
          <i />
          <i />
        </div>
      </section>

      <nav
        className={styles.categories}
        aria-label={
          isArabic
            ? "مسارات المعرفة"
            : "Knowledge tracks"
        }
      >
        <a href="#all-insights">
          <span>00</span>
          {ui.index.allCategories}
        </a>

        {publishedCategories.map(
          (category) => (
            <a
              href={
                latestCategoryIds.has(
                  category.id
                )
                  ? `#category-${category.id}`
                  : "#featured-insight-title"
              }
              key={category.id}
            >
              <span>
                {String(
                  category.order
                ).padStart(2, "0")}
              </span>

              {category.label[language]}
            </a>
          )
        )}
      </nav>

      {featured.length > 0 && (
        <section
          className={styles.featured}
          aria-labelledby="featured-insight-title"
        >
          <header className={styles.sectionHeader}>
            <p>01 / FEATURED</p>

            <h2 id="featured-insight-title">
              {ui.index.featuredLabel}
            </h2>
          </header>

          {featured.map((article, index) => (
            <InsightCard
              article={article}
              language={language}
              index={index}
              featured
              key={article.slug}
            />
          ))}
        </section>
      )}

      <section
        className={styles.library}
        id="all-insights"
        aria-labelledby="latest-insights-title"
      >
        <header className={styles.sectionHeader}>
          <p>02 / LIBRARY</p>

          <h2 id="latest-insights-title">
            {ui.index.latestLabel}
          </h2>
        </header>

        {latest.length > 0 ? (
          <div className={styles.articleGrid}>
            {latest.map((article, index) => (
              <div
                id={
                  latest.findIndex(
                    (candidate) =>
                      candidate.category ===
                      article.category
                  ) === index
                    ? `category-${article.category}`
                    : undefined
                }
                key={article.slug}
              >
                <InsightCard
                  article={article}
                  language={language}
                  index={
                    featured.length + index
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            {ui.index.empty}
          </p>
        )}
      </section>

      <footer className={styles.footer}>
        <div>
          <span>{ui.author.initials}</span>

          <p>
            <strong>{ui.author.name}</strong>
            <small>{ui.author.role}</small>
          </p>
        </div>

        <Link href={homeHref}>
          {ui.article.home}
          <i aria-hidden="true">
            {isArabic ? "↖" : "↗"}
          </i>
        </Link>
      </footer>

      <InsightsAssistant language={language} />
    </main>
  );
}
