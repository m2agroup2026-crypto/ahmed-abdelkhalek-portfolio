import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630,
};

async function loadArabicFont() {
  const buffer = await readFile(
    path.join(
      process.cwd(),
      "app",
      "components",
      "Insights",
      "fonts",
      "cairo-arabic-700-normal.woff"
    )
  );

  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

function reverseWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .reverse()
    .join(" ");
}

function createLines(
  value: string,
  wordsPerLine = 3
) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];

  for (
    let index = 0;
    index < words.length;
    index += wordsPerLine
  ) {
    lines.push(
      reverseWords(
        words
          .slice(
            index,
            index + wordsPerLine
          )
          .join(" ")
      )
    );
  }

  return lines;
}

type ArabicImageOptions = {
  title: string;
  category?: string;
};

export const arabicSocialImageSize = size;
export const arabicSocialImageContentType =
  "image/png";

export async function createArabicInsightSocialImage({
  title,
  category,
}: ArabicImageOptions) {
  const font = await loadArabicFont();
  const lines = createLines(title, 3);

  return new ImageResponse(
    (
      <div
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
          fontFamily: "Cairo Arabic",
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
            border:
              "1px solid rgba(40,240,208,.22)",
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
                }}
              >
                السَّبْق
              </span>

              <span
                style={{
                  marginTop: 4,
                  color: "#91a09a",
                  fontSize: 13,
                }}
              >
                {reverseWords(
                  "بوابتك إلى المعرفة"
                )}
              </span>
            </div>
          </div>

          <span
            style={{
              color: "#87958f",
              fontSize: 14,
            }}
          >
            ahmed.m2agroupeg.com
          </span>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {category && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  padding: "9px 15px",
                  border:
                    "1px solid rgba(199,255,50,.34)",
                  borderRadius: 99,
                  color: "#c7ff32",
                  fontSize: 15,
                }}
              >
                {reverseWords(category)}
              </span>
            </div>
          )}

          {lines.map((line, index) => (
            <div
              key={`line-${index}`}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                whiteSpace: "nowrap",
                wordSpacing: -7,
                fontSize:
                  title.length > 75 ? 44 : 54,
                lineHeight: 1.32,
              }}
            >
              {line}
            </div>
          ))}
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
            {reverseWords("أحمد عبد الخالق")}
          </span>

          <span style={{ color: "#28f0d0" }}>
            AI · STRATEGY · TRANSFORMATION
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cairo Arabic",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
