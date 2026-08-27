import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/content/site";

const size = {
  width: 1200,
  height: 630,
};

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

export const homepageSocialImageSize = size;
export const homepageSocialImageContentType =
  "image/png";

export async function createHomepageSocialImage() {
  const [
    arabicFont,
    latinFont,
    portraitBuffer,
  ] = await Promise.all([
    loadFont("cairo-arabic-700-normal.woff"),
    loadFont("cairo-latin-700-normal.woff"),
    readFile(
      path.join(
        process.cwd(),
        "public",
        "ahmed-abdelkhalek-v2.jpg"
      )
    ),
  ]);

  const portraitDataUrl =
    `data:image/jpeg;base64,${portraitBuffer.toString("base64")}`;

  const hostname = new URL(siteConfig.url).hostname;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#07100d 0%,#0b1714 52%,#15101d 100%)",
          color: "#f4f7f5",
          fontFamily: "Cairo Latin, Cairo Arabic",
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
            width: 620,
            height: 620,
            right: -230,
            top: -260,
            display: "flex",
            borderRadius: "50%",
            border:
              "1px solid rgba(40,240,208,.22)",
            boxShadow:
              "0 0 120px rgba(40,240,208,.13)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: 720,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding:
              "54px 34px 50px 66px",
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
                  color: "#f4f7f5",
                  fontSize: 22,
                }}
              >
                Ahmed Abdelkhalek
              </span>

              <span
                style={{
                  marginTop: 2,
                  color: "#8f9d98",
                  fontSize: 13,
                  letterSpacing: "0.11em",
                }}
              >
                ENTERPRISE SYSTEMS ARCHITECTURE
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 650,
            }}
          >
            <span
              style={{
                color: "#c7ff32",
                fontSize: 17,
                letterSpacing: "0.08em",
              }}
            >
              ENTERPRISE SYSTEMS & PLATFORM ARCHITECT
            </span>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                fontSize: 50,
                lineHeight: 1.13,
                letterSpacing: "-0.035em",
              }}
            >
              <span>
                Turning enterprise complexity
              </span>
              <span>
                into one intelligent
              </span>
              <span style={{ color: "#28f0d0" }}>
                digital operating system.
              </span>
            </div>

            <div
              style={{
                width: "100%",
                marginTop: 23,
                display: "flex",
                color: "#aeb9b5",
                fontSize: 15,
                letterSpacing: "0.08em",
              }}
            >
              ENGINEERING FOR SCALE · GOVERNANCE · INTELLIGENCE
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 20,
              borderTop:
                "1px solid rgba(255,255,255,.12)",
              color: "#929f9a",
              fontSize: 14,
            }}
          >
            <span>{hostname}</span>

            <span style={{ color: "#28f0d0" }}>
              PLATFORMS · CRM · AI · AUTOMATION
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 62,
            top: 102,
            width: 404,
            height: 404,
            display: "flex",
            padding: 10,
            boxSizing: "border-box",
            borderRadius: 42,
            border:
              "1px solid rgba(212,175,55,.72)",
            background:
              "linear-gradient(145deg,rgba(212,175,55,.48),rgba(92,66,20,.14))",
            boxShadow:
              "0 32px 90px rgba(0,0,0,.38)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              overflow: "hidden",
              padding: 5,
              boxSizing: "border-box",
              borderRadius: 30,
              border:
                "1px solid rgba(212,175,55,.22)",
              background: "#0b1714",
            }}
          >
            <img
              src={portraitDataUrl}
              alt=""
              width="388"
              height="388"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transform: "scale(1.06)",
                borderRadius: 22,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 88,
            bottom: 74,
            display: "flex",
            padding: "10px 15px",
            borderRadius: 99,
            border:
              "1px solid rgba(199,255,50,.32)",
            background:
              "rgba(7,16,13,.82)",
            color: "#c7ff32",
            fontSize: 13,
            letterSpacing: "0.08em",
          }}
        >
          ARCHITECTURE · AUTOMATION · AI
        </div>
      </div>
    ),
    {
      ...size,
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
