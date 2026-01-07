import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DevBanner from "./components/DevBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Almofleh - Software Developer",
  description:
    "Software Developer & Tech Enthusiast. Get in touch via email or LinkedIn for collaboration opportunities.",
  keywords: [
    "Abdullah Almofleh",
    "Software Developer",
    "Web Developer",
    "Tech Enthusiast",
    "Programming",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Abdullah Almofleh", url: "https://www.linkedin.com/in/abdullah-almofleh/" }],
  creator: "Abdullah Almofleh",
  openGraph: {
    title: "Abdullah Almofleh - Software Developer",
    description:
      "Software Developer & Tech Enthusiast. Get in touch via email or LinkedIn for collaboration opportunities.",
    url: "https://abdullah-almofleh.com",
    siteName: "Abdullah Almofleh",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Abdullah Almofleh - Software Developer",
    description:
      "Software Developer & Tech Enthusiast. Get in touch via email or LinkedIn for collaboration opportunities.",
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
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DevBanner />
        {children}
      </body>
    </html>
  );
}
