import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteHostname } from "@/app/content/site";
import type {
  InsightLanguage,
} from "../../content/insights/types";

const fontDirectory = path.join(
  process.cwd(),
  "app",
  "components",
  "Insights",
  "fonts"
);

async function loadFont(fileName: string) {
  const buffer = await readFile(
    path.join(fontDirectory, fileName)
  );

  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

type InsightSocialImageOptions = {
  language: InsightLanguage;
  title: string;
  category?: string;
};

function reverseArabicWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .reverse()
    .join(" ");
}

export const insightSocialImageSize = {
  width: 1200,
  height: 630,
};

export const insightSocialImageContentType =
  "image/png";

export async function createInsightSocialImage({
  language,
  title,
  category,
}: InsightSocialImageOptions) {
  const isArabic = language === "ar";

  const displayCategory =
    isArabic && category
      ? reverseArabicWords(category)
      : category;

  const [arabicFont, latinFont] =
    await Promise.all([
      loadFont(
        "cairo-arabic-700-normal.woff"
      ),
      loadFont(
        "cairo-latin-700-normal.woff"
      ),
    ]);

  return new ImageResponse(
    (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "58px 66px",
          background:
            "linear-gradient(135deg,#07100d 0%,#0b1714 48%,#15101d 100%)",
          color: "#f4f7f5",
          fontFamily: isArabic
            ? "Cairo Arabic, Cairo Latin"
            : "Cairo Latin, Cairo Arabic",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.13,
            backgroundImage:
              "linear-gradient(rgba(199,255,50,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(40,240,208,.14) 1px,transparent 1px)",
            backgroundSize: "62px 62px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            right: -180,
            top: -210,
            display: "flex",
            borderRadius: "50%",
            border: "1px solid rgba(40,240,208,.22)",
            boxShadow:
              "0 0 110px rgba(40,240,208,.12)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background:
                  "linear-gradient(145deg,#c7ff32,#28f0d0)",
                color: "#07100d",
                fontSize: 20,
              }}
            >
              AA
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "#c7ff32",
                  fontSize: 18,
                  letterSpacing:
                    isArabic ? 0 : "0.12em",
                }}
              >
                {isArabic ? "السَّبْق" : "THE EDGE"}
              </span>

              <span
                style={{
                  marginTop: 4,
                  color: "#91a09a",
                  fontSize: 13,
                }}
              >
                {isArabic
                  ? reverseArabicWords(
                      "بوابتك إلى المعرفة"
                    )
                  : "YOUR GATEWAY TO KNOWLEDGE"}
              </span>
            </div>
          </div>

          <span
            style={{
              color: "#87958f",
              fontSize: 14,
            }}
          >
            {siteHostname}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: 1010,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {category && (
            <span
              style={{
                width: "fit-content",
                marginBottom: 24,
                padding: "9px 15px",
                border:
                  "1px solid rgba(199,255,50,.34)",
                borderRadius: 99,
                color: "#c7ff32",
                fontSize: 15,
              }}
            >
              {displayCategory}
            </span>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems:
                isArabic ? "flex-end" : "flex-start",
              fontSize:
                title.length > 75 ? 46 : 56,
              lineHeight: 1.3,
              letterSpacing:
                isArabic ? 0 : "-0.035em",
            }}
          >
            <span
              dir={isArabic ? "rtl" : "ltr"}
              style={{
                width: "100%",
                display: "block",
                fontSize:
                  title.length > 75 ? 46 : 56,
                lineHeight: 1.3,
                letterSpacing:
                  isArabic ? 0 : "-0.035em",
                direction:
                  isArabic ? "rtl" : "ltr",
                textAlign:
                  isArabic ? "right" : "left",
                whiteSpace: "normal",
              }}
            >
              {title}
            </span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 22,
            borderTop:
              "1px solid rgba(255,255,255,.12)",
            color: "#9aa7a2",
            fontSize: 15,
          }}
        >
          <span>
            {isArabic
              ? reverseArabicWords(
                  "أحمد عبد الخالق"
                )
              : "Ahmed Abdelkhalek"}
          </span>

          <span style={{ color: "#28f0d0" }}>
            AI · STRATEGY · TRANSFORMATION
          </span>
        </div>
      </div>
    ),
    {
      ...insightSocialImageSize,
      fonts: [
        {
          name: "Cairo Arabic",
          data: arabicFont,
          weight: 700,
          style: "normal",
        },
        {
          name: "Cairo Latin",
          data: latinFont,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
