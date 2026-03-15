import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import MouseTrailCanvas from "@/components/MouseTrailCanvas";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionWrapper from "@/components/MotionWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const rajdhani = Rajdhani({
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
    "Aniket Raj", "React Developer", "Frontend Developer",
    "JavaScript", "Next.js", "Redux", "Tailwind CSS",
    "Portfolio", "Indore", "India",
  ],
  authors: [{ name: "Aniket Raj", url: "https://itsrajaniket.github.io" }],
  creator: "Aniket Raj",
  metadataBase: new URL("https://itsrajaniket.github.io"),
  // ── Favicon ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/favicon.png",  type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itsrajaniket.github.io",
    title: "Aniket Raj | React Developer & Frontend Engineer",
    description:
      "Building high-performance React ecosystems and optimizing complex algorithms. Open to new opportunities.",
    siteName: "Aniket Raj Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aniket Raj – React Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Raj | React Developer",
    description: "Building high-performance React ecosystems. Open to new opportunities.",
    images: ["/og-image.png"],
    creator: "@Aniket_repo",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://itsrajaniket.github.io" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-dark text-slate-100 font-sans antialiased">
        {/* Google Analytics — only loads in production */}
        <GoogleAnalytics />

        {/* Global mouse-trail canvas */}
        <MouseTrailCanvas />

        {/* Page fade-in wrapper */}
        <MotionWrapper>
          <main id="main-content">
            {children}
          </main>
        </MotionWrapper>

        <ScrollToTop />
      </body>
    </html>
  );
}
