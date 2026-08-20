import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import DevBanner from "./components/DevBanner";
import { ThemeProvider } from "./components/ThemeProvider";
import resumeData from "../data/resumeData.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick",
  subsets: ["latin"],
});

// Get current role from resume data
const currentRole = resumeData.experience.find((exp) => exp.current) || resumeData.experience[0];
const skillsList = Object.values(resumeData.skills).flat().slice(0, 8);

export const metadata: Metadata = {
  metadataBase: new URL(resumeData.personalInfo.links.portfolio),
  title: `${resumeData.personalInfo.name} - ${currentRole?.title || "Developer"}`,
  description: resumeData.summary,
  keywords: [
    resumeData.personalInfo.name,
    currentRole?.title || "Developer",
    "Full-Stack Developer",
    ...skillsList,
    resumeData.personalInfo.location.split(",")[1]?.trim() || "UAE",
    resumeData.personalInfo.location.split(",")[0]?.trim() || "Dubai",
  ],
  authors: [{ name: resumeData.personalInfo.name, url: resumeData.personalInfo.links.linkedin }],
  creator: resumeData.personalInfo.name,
  openGraph: {
    title: `${resumeData.personalInfo.name} - ${currentRole?.title || "Developer"}`,
    description: resumeData.summary,
    url: resumeData.personalInfo.links.portfolio,
    siteName: `${resumeData.personalInfo.name} - Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${resumeData.personalInfo.name} - ${currentRole?.title || "Developer"}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.personalInfo.name} - ${currentRole?.title || "Developer"}`,
    description: resumeData.summary.length > 160 ? resumeData.summary.slice(0, 160) + "..." : resumeData.summary,
    images: ["/og-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: marks same-session visitors so the cover animation plays
            once per session, and marks narrow viewports so a phone does not paint the
            spread's opening page before React picks its own. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(sessionStorage.getItem("nb-open"))d.setAttribute("data-nb-visited","");if(location.hash)d.setAttribute("data-nb-await",location.hash.slice(1).replace(/[^a-zA-Z-]/g,""));else if(!matchMedia("(min-width: 1024px)").matches)d.setAttribute("data-nb-narrow","")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${patrickHand.variable} antialiased`}
      >
        <ThemeProvider>
          <DevBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
