const { writeFileSync, mkdirSync } = require("fs");
const { join } = require("path");
const { ImageResponse } = require("@vercel/og");
const resumeData = require("../data/resumeData.json");

// Ensure public directory exists
const publicDir = join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

async function generateOGImage(filename, jsx, options = {}) {
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
    console.error(`❌ Failed to generate ${filename}:`, error.message);
  }
}

async function generateResumeOGImage() {
  const currentRole = resumeData.experience.find((exp) => exp.current) || resumeData.experience[0];
  const topSkills = Object.values(resumeData.skills).flat().slice(0, 8);

  const jsx = {
    type: "div",
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
              padding: "40px 60px",
              textAlign: "center",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: "62px",
                    fontWeight: "bold",
                    color: "#A7F3D0",
                    marginBottom: "18px",
                    lineHeight: 1.1,
                  },
                  children: resumeData.personalInfo.name,
                },
              },
              {
                type: "h2",
                props: {
                  style: {
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#6EE7B7",
                    marginBottom: "24px",
                  },
                  children: `${currentRole.title} at ${currentRole.company}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#CBD5E1",
                    marginBottom: "8px",
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: { marginRight: "10px", fontSize: "26px" },
                        children: "📍",
                      },
                    },
                    resumeData.personalInfo.location,
                  ],
                },
              },
            ],
          },
        },
        // Skills section
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 60px 40px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "18px",
                    maxWidth: "1000px",
                  },
                  children: topSkills.map((skill, index) => ({
                    type: "div",
                    key: index,
                    props: {
                      style: {
                        background: "#0E3B2F",
                        border: "2px solid rgba(67, 206, 162, 0.50)",
                        borderRadius: "999px",
                        padding: "8px 16px",
                        fontSize: "18px",
                        color: "#99F6E4",
                      },
                      children: skill,
                    },
                  })),
                },
              },
            ],
          },
        },
        // Summary
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
                    fontSize: "24px",
                    color: "#E5E7EB",
                    lineHeight: 1.6,
                    maxWidth: "1000px",
                  },
                  children: resumeData.summary.split(".").slice(0, 2).join(". ") + ".",
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

async function main() {
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

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateResumeOGImage };
