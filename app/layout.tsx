import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionWrapper from "@/components/animations/MotionWrapper";
import ClientLayoutProviders from "@/components/layout/ClientLayoutProviders";
import CustomCursorTrail from "@/components/animations/CustomCursorTrail";

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
    default: "Aniket Raj | Full-Stack Developer (MERN + Next.js) & AI/GenAI Engineer",
    template: "%s | Aniket Raj",
  },
  description:
    "Aniket Raj – Full-Stack Developer (MERN + Next.js) building AI-powered SaaS apps with OpenAI, Claude, and Gemini. 3 live projects. Immediate joiner. Based in India.",
  keywords: [
    "Aniket Raj",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Developer",
    "GenAI",
    "OpenAI",
    "Claude API",
    "Gemini API",
    "LangChain",
    "SaaS Developer",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Supabase",
    "Firebase",
    "Razorpay",
    "Stripe",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "India",
    "Fresher",
    "Immediate Joiner",
  ],
  authors: [{ name: "Aniket Raj", url: "https://www.rajaniket.com" }],
  creator: "Aniket Raj",
  category: "Technology",
  classification: "Portfolio",
  metadataBase: new URL("https://www.rajaniket.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rajaniket.com",
    title: "Aniket Raj 👨‍💻 | Full-Stack Dev (MERN + Next.js) & AI/GenAI Engineer 🚀",
    description:
      "⚡ Building modern live SaaS apps with AI integration (OpenAI, Claude, Gemini) and full-stack MERN + Next.js. Immediate joiner.",
    siteName: "Aniket Raj",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aniket Raj – Full-Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Raj 👨‍💻 | Full-Stack Dev & AI/GenAI Engineer 🚀 ",
    description:
      "⚡ Building modern live SaaS apps with AI (OpenAI, Claude, Gemini) + Razorpay/Stripe. MERN + Next.js. Immediate joiner.",
    images: ["/og-image.png"],
    creator: "@Aniket_repo"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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


      </head>
      <body className="bg-base text-main font-sans antialiased transition-colors duration-500">
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wb6izc7ndb");
          `}
        </Script>
        <ClientLayoutProviders>
          <CustomCursorTrail />
          <MotionWrapper>
            <main id="main-content">{children}</main>
          </MotionWrapper>
          <ScrollToTop />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            crossOrigin="anonymous"
          />
        </ClientLayoutProviders>
      </body>
    </html>
  );
}
