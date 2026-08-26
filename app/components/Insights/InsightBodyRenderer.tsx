import type {
  InsightContentBlock,
  InsightLanguage,
} from "../../content/insights/types";
import styles from "./InsightBodyRenderer.module.css";

type InsightBodyRendererProps = {
  blocks: readonly InsightContentBlock[];
  language: InsightLanguage;
};

export default function InsightBodyRenderer({
  blocks,
  language,
}: InsightBodyRendererProps) {
  const isArabic = language === "ar";

  return (
    <div
      className={styles.body}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {blocks.map((block, index) => {
        const key = [
          block.type,
          index,
        ].join("-");

        if (block.type === "heading") {
          return (
            <h2
              className={styles.heading}
              id={`article-section-${index + 1}`}
              key={key}
            >
              <span aria-hidden="true">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              className={styles.paragraph}
              key={key}
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              className={styles.list}
              key={key}
            >
              {block.items.map(
                (item, itemIndex) => (
                  <li
                    key={`${key}-${itemIndex}`}
                  >
                    <span aria-hidden="true" />
                    <p>{item}</p>
                  </li>
                )
              )}
            </ul>
          );
        }

        if (block.type === "callout") {
          return (
            <aside
              className={styles.callout}
              key={key}
              aria-label={block.title}
            >
              <span aria-hidden="true">
                INSIGHT SIGNAL
              </span>

              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </aside>
          );
        }

        return (
          <blockquote
            className={styles.quote}
            key={key}
          >
            <span aria-hidden="true">“</span>
            <p>{block.text}</p>
          </blockquote>
        );
      })}
    </div>
  );
}
