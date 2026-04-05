import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import MouseTrailCanvas from "@/components/visuals/MouseTrailCanvas";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionWrapper from "@/components/animations/MotionWrapper";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import { Analytics } from "@vercel/analytics/react";
import ThemeCustomizer from "@/components/theme/ThemeCustomizer";

// ── Fonts ──────────────────────────────────────────────────────────────────
// Syne: geometric, distinctive, not overused. Perfect for headings.
// DM Sans: clean, modern, highly readable body text.
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aniket Raj | React Developer & Frontend Engineer",
    template: "%s | Aniket Raj",
  },
  description:
    "Aniket Raj – React Developer specializing in high-performance React ecosystems, Redux, and modern frontend engineering. Based in Indore, India.",
  keywords: [
    "Aniket Raj",
    "React Developer",
    "Frontend Developer",
    "JavaScript",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Portfolio",
    "Indore",
    "India",
  ],
  authors: [{ name: "Aniket Raj", url: "https://www.rajaniket.com" }],
  creator: "Aniket Raj",
  metadataBase: new URL("https://www.rajaniket.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rajaniket.com",
    title: "Aniket Raj | React Developer & Frontend Engineer",
    description:
      "Building high-performance React ecosystems. Open to new opportunities.",
    siteName: "Aniket Raj Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aniket Raj – React Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Raj | React Developer",
    description:
      "Building high-performance React ecosystems. Open to new opportunities.",
    images: ["/og-image.png"],
    creator: "@Aniket_repo",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.rajaniket.com" },
};

import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-base text-main font-sans antialiased transition-colors duration-500">
        <ThemeProvider attribute="data-theme" defaultTheme="cyberpunk" enableSystem={false}>
          <GoogleAnalytics />
          <UmamiAnalytics />
          <Analytics />
          <MouseTrailCanvas />
          {process.env.NODE_ENV === "development" && <ThemeCustomizer />}
          <MotionWrapper>
            <main id="main-content">{children}</main>
          </MotionWrapper>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
