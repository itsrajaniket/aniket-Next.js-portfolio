// Server Component — renders GA script tags
// GA only loads in production (not during local development)
import Script from "next/script";

// TODO: Replace GA_MEASUREMENT_ID with your real ID from Google Analytics
// Steps to get your ID:
//   1. Go to https://analytics.google.com
//   2. Create account → Create property → Web stream
//   3. Copy the "G-XXXXXXXXXX" Measurement ID
//   4. Add to .env.local: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  // Don't load in development or if no ID is set
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  );
}
