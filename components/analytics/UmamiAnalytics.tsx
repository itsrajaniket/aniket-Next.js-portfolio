import Script from "next/script";

export default function UmamiAnalytics() {
  // Only load in production to avoid tracking local development
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="7a3d13b0-935d-4b00-8f9e-5349966737c0"
      strategy="afterInteractive"
    />
  );
}
