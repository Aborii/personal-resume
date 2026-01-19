import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ImageResponse } from "@vercel/og";
import resumeData from "../data/resumeData.json" assert { type: "json" };
import type { JSX } from "react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

interface ImageResponseOptions {
  width?: number;
  height?: number;
  [key: string]: unknown;
}

async function generateOGImage(filename: string, jsx: JSX.Element, options: ImageResponseOptions = {}): Promise<void> {
  try {
    const response = new ImageResponse(jsx, {
      width: 1200,
      height: 630,
      ...options,
    });

    const imageBuffer = await response.arrayBuffer();
    const outputPath = join(publicDir, filename);

    writeFileSync(outputPath, Buffer.from(imageBuffer));
    console.log(`✅ Generated: ${filename}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to generate ${filename}:`, errorMessage);
  }
}

async function generateResumeOGImage(): Promise<void> {
  const jsx: JSX.Element = {
    type: "div",
    key: "og-resume-main",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1f2937",
        backgroundImage: "linear-gradient(180deg, #0F2A2E, #0F4C3A, #0B5E3C)",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      children: [
        // Header
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px 60px 30px",
              textAlign: "center",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: "68px",
                    fontWeight: "bold",
                    color: "#D1FAE5",
                    marginBottom: "20px",
                    lineHeight: 1.1,
                  },
                  children: resumeData.personalInfo.name,
                },
              },
              {
                type: "h2",
                props: {
                  style: {
                    fontSize: "32px",
                    fontWeight: "600",
                    color: "#9CA3AF",
                    marginBottom: "28px",
                  },
                  children: resumeData.personalInfo.title,
                },
              },
              // Identity line (bold, impactful)
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "40px",
                    fontWeight: "800",
                    color: "#6EE7B7",
                    marginBottom: "32px",
                    lineHeight: 1.3,
                  },
                  children: resumeData.og.identityLine,
                },
              },
            ],
          },
        },
        // Skills section (reduced to 5 max)
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 60px 35px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    maxWidth: "1000px",
                  },
                  children: resumeData.og.topSkills.map((skill, index) => ({
                    type: "div",
                    key: index,
                    props: {
                      style: {
                        background: "#0E3B2F",
                        border: "2px solid rgba(67, 206, 162, 0.55)",
                        borderRadius: "999px",
                        padding: "10px 20px",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#A7F3D0",
                      },
                      children: skill,
                    },
                  })),
                },
              },
            ],
          },
        },
        // Condensed experience line (replaces paragraph)
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 60px",
              textAlign: "center",
            },
            children: [
              {
                type: "p",
                props: {
                  style: {
                    fontSize: "26px",
                    fontWeight: "500",
                    color: "#CBD5E1",
                    lineHeight: 1.5,
                    maxWidth: "1000px",
                  },
                  children: resumeData.og.experienceLine,
                },
              },
            ],
          },
        },
        // Bottom gradient
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #43cea2, #185a9d, #43cea2)",
            },
          },
        },
      ],
    },
  };

  await generateOGImage("og-main.png", jsx);
}

async function main(): Promise<void> {
  console.log("🎨 Generating static OG image...");
  console.log("");

  await generateResumeOGImage();

  console.log("");
  console.log("✨ OG image generated successfully!");
  console.log("📁 Files saved to: ./public/");
  console.log("");
  console.log("Generated files:");
  console.log("  - og-main.png (Resume/Main page)");
}

main().catch(console.error);

export { generateResumeOGImage };
