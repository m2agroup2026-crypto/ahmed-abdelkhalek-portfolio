import Link from "next/link";
import {
  getInsightCategory,
  getInsightContent,
  getInsightPath,
} from "../../content/insights/registry";
import type {
  InsightArticle,
  InsightLanguage,
} from "../../content/insights/types";
import styles from "./InsightCard.module.css";

type InsightCardProps = {
  article: InsightArticle;
  language: InsightLanguage;
  index?: number;
  featured?: boolean;
};

function formatInsightDate(
  value: string,
  language: InsightLanguage
) {
  const date = new Date(
    `${value}T00:00:00.000Z`
  );

  return new Intl.DateTimeFormat(
    language === "ar"
      ? "ar-EG"
      : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(date);
}

export default function InsightCard({
  article,
  language,
  index = 0,
  featured = false,
}: InsightCardProps) {
  const content =
    getInsightContent(article, language);

  const category =
    getInsightCategory(article.category);

  const href = getInsightPath(
    article.slug,
    language
  );

  const titleId = [
    "insight-card",
    language,
    article.slug,
  ].join("-");

  const isArabic = language === "ar";

  return (
    <article
      className={styles.card}
      data-variant={article.coverVariant}
      data-featured={featured}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby={titleId}
    >
      <div
        className={styles.visual}
        aria-hidden="true"
      >
        <span className={styles.visualGrid} />
        <span className={styles.visualOrbit} />
        <span className={styles.visualSignal} />

        <strong>
          {String(index + 1).padStart(2, "0")}
        </strong>

        <i />
        <i />
        <i />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>
            {category?.label[language] ??
              content.categoryLabel}
          </span>

          <time dateTime={article.publishedAt}>
            {formatInsightDate(
              article.publishedAt,
              language
            )}
          </time>
        </div>

        <h2 id={titleId}>
          <Link href={href}>
            {content.title}
          </Link>
        </h2>

        <p>{content.excerpt}</p>

        <div className={styles.footer}>
          <span>{content.readingLabel}</span>

          <ul
            className={styles.tags}
            aria-label={
              isArabic
                ? "موضوعات المقال"
                : "Article topics"
            }
          >
            {article.tags
              .slice(0, 3)
              .map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
          </ul>

          <Link
            className={styles.action}
            href={href}
            aria-label={
              isArabic
                ? `اقرأ مقال: ${content.title}`
                : `Read article: ${content.title}`
            }
          >
            <span>
              {isArabic
                ? "اقرأ الرؤية"
                : "Read insight"}
            </span>

            <i aria-hidden="true">
              {isArabic ? "↖" : "↗"}
            </i>
          </Link>
        </div>
      </div>
    </article>
  );
}
