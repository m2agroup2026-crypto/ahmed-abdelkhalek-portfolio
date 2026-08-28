import Link from "next/link";
import InsightsThemeToggle from "./InsightsThemeToggle";
import {
  getInsightCategory,
  getInsightContent,
  getInsightPath,
  getInsightsIndexPath,
  getPortfolioHomePath,
  getRelatedInsights,
} from "../../content/insights/registry";
import type {
  InsightArticle,
  InsightLanguage,
} from "../../content/insights/types";
import {
  insightsUiContent,
} from "../../content/insights/ui";
import InsightBodyRenderer from
  "./InsightBodyRenderer";
import InsightCard from "./InsightCard";
import InsightsAssistant from "./InsightsAssistant";
import styles from
  "./InsightArticlePage.module.css";

type InsightArticlePageProps = {
  article: InsightArticle;
  language: InsightLanguage;
};

function formatArticleDate(
  value: string,
  language: InsightLanguage
) {
  return new Intl.DateTimeFormat(
    language === "ar"
      ? "ar-EG"
      : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(
    new Date(`${value}T00:00:00.000Z`)
  );
}

export default function InsightArticlePage({
  article,
  language,
}: InsightArticlePageProps) {
  const isArabic = language === "ar";
  const alternateLanguage =
    isArabic ? "en" : "ar";

  const content =
    getInsightContent(article, language);

  const ui = insightsUiContent[language];

  const category =
    getInsightCategory(article.category);

  const related = getRelatedInsights(
    article,
    3
  );

  const articleHref = getInsightPath(
    article.slug,
    language
  );

  const alternateHref = getInsightPath(
    article.slug,
    alternateLanguage
  );

  const insightsHref =
    getInsightsIndexPath(language);

  const homeHref =
    getPortfolioHomePath(language);

  const dateChanged =
    article.updatedAt !== article.publishedAt;

  return (
    <main
      className={styles.page}
      dir={isArabic ? "rtl" : "ltr"}
      data-variant={article.coverVariant}
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
          className={styles.navigation}
          aria-label={
            isArabic
              ? "التنقل داخل مركز المعرفة"
              : "Knowledge center navigation"
          }
        >
          <Link href={insightsHref}>
            {ui.article.backToInsights}
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

      <article
        className={styles.article}
        itemScope
        itemType="https://schema.org/Article"
      >
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              {content.heroEyebrow}
            </p>

            <div className={styles.meta}>
              <span>
                {category?.label[language] ??
                  content.categoryLabel}
              </span>

              <time
                dateTime={article.publishedAt}
                itemProp="datePublished"
              >
                {ui.article.published}
                {" · "}
                {formatArticleDate(
                  article.publishedAt,
                  language
                )}
              </time>

              {dateChanged && (
                <time
                  dateTime={article.updatedAt}
                  itemProp="dateModified"
                >
                  {ui.article.updated}
                  {" · "}
                  {formatArticleDate(
                    article.updatedAt,
                    language
                  )}
                </time>
              )}

              <span>{content.readingLabel}</span>
            </div>

            <h1 itemProp="headline">
              {content.title}
            </h1>

            <p
              className={styles.excerpt}
              itemProp="description"
            >
              {content.excerpt}
            </p>

            <ul
              className={styles.tags}
              aria-label={
                isArabic
                  ? "موضوعات المقال"
                  : "Article topics"
              }
            >
              {article.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          <div
            className={styles.heroVisual}
            aria-hidden="true"
          >
            <span className={styles.visualGrid} />
            <span className={styles.visualOrbit} />
            <span className={styles.visualCore} />
            <span className={styles.visualLine} />

            <strong>01</strong>
            <small>KNOWLEDGE NODE</small>

            <i />
            <i />
            <i />
          </div>
        </header>

        <section className={styles.introduction}>
          <p>{ui.article.introductionLabel}</p>
          <strong>{content.introduction}</strong>
        </section>

        <div
          className={styles.readingLayout}
          itemProp="articleBody"
        >
          <aside className={styles.authorRail}>
            <div className={styles.authorCard}>
              <span>{ui.author.initials}</span>

              <p>
                <small>
                  {ui.article.authorLabel}
                </small>

                <strong>
                  {ui.author.name}
                </strong>

                <em>{ui.author.role}</em>
              </p>
            </div>

            <p>{ui.author.bio}</p>

            <a href="#article-conclusion">
              {ui.article.conclusionLabel}
              <i aria-hidden="true">↓</i>
            </a>
          </aside>

          <InsightBodyRenderer
            blocks={content.blocks}
            language={language}
          />
        </div>

        <section
          className={styles.conclusion}
          id="article-conclusion"
        >
          <p>{ui.article.conclusionLabel}</p>
          <h2>{content.conclusion}</h2>
        </section>

        <section className={styles.authorSection}>
          <span>{ui.author.initials}</span>

          <div>
            <p>{ui.article.authorLabel}</p>
            <h2>{ui.author.name}</h2>
            <strong>{ui.author.role}</strong>
            <small>{ui.author.bio}</small>
          </div>
        </section>

        {related.length > 0 && (
          <section className={styles.related}>
            <header>
              <p>{ui.article.relatedEyebrow}</p>
              <h2>{ui.article.relatedTitle}</h2>
            </header>

            <div>
              {related.map(
                (relatedArticle, index) => (
                  <InsightCard
                    article={relatedArticle}
                    language={language}
                    index={index}
                    key={relatedArticle.slug}
                  />
                )
              )}
            </div>
          </section>
        )}
      </article>

      <footer className={styles.footer}>
        <Link href={homeHref}>
          <span>{ui.author.initials}</span>
          <strong>{ui.author.name}</strong>
        </Link>

        <p>
          {ui.brand.name}
          <small>{articleHref}</small>
        </p>
      </footer>

      <InsightsAssistant language={language} />
    </main>
  );
}
