import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionWrapper from "@/components/animations/MotionWrapper";
import ClientLayoutProviders from "@/components/layout/ClientLayoutProviders";

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
    default: "Aniket Raj | MERN Stack Developer & Frontend Engineer",
    template: "%s | Aniket Raj",
  },
  description:
    "Aniket Raj – MERN Stack Developer specializing in building scalable web applications using MongoDB, Express.js, React, Node.js, and Next.js. Based in Indore, India.",
  keywords: [
    "Aniket Raj",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "Next.js",
    "JavaScript",
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
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rajaniket.com",
    title: "Aniket Raj | MERN Stack Developer & Frontend Engineer",
    description:
      "Building full-stack MERN applications and high-performance React ecosystems. Open to new opportunities.",
    siteName: "Aniket Raj Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aniket Raj – MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Raj | MERN Stack Developer",
    description:
      "Building full-stack MERN applications and high-performance React ecosystems. Open to new opportunities.",
    images: ["/og-image.png"],
    creator: "@Aniket_repo",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.rajaniket.com" },
};

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
        {/* Preconnect to external asset domains for faster discovery */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-base text-main font-sans antialiased transition-colors duration-500">
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wb6izc7ndb");
          `}
        </Script>
        <ClientLayoutProviders>
          <MotionWrapper>
            <main id="main-content">{children}</main>
          </MotionWrapper>
          <ScrollToTop />
        </ClientLayoutProviders>
      </body>
    </html>
  );
}
